import { lucia } from '$lib/auth/initLucia.js';
import { AuthController } from '$lib/auth/shared/Controllers.js';
import { entities } from '$lib/auth/shared/Entities.js';
import type { RequestEvent } from '@sveltejs/kit';
import { remult } from 'remult';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const _api = remultSveltekit({
	logApiEndPoints: false,
	admin: true,
	initRequest: async (event) => {
		const sessionId = event.cookies.get(lucia.sessionCookieName);
		console.log(`remult initRe`, { sessionId });

		remult.context.setHeaders = (headers) => {
			event.setHeaders(headers);
		};
		remult.context.setCookie = (name, value, opts) => {
			event.cookies.set(name, value, opts);
		};
		remult.context.deleteCookie = (name, opts) => {
			event.cookies.delete(name, opts);
		};

		if (sessionId) {
			const { session, user } = await lucia.validateSession(sessionId);
			if (session && session.fresh) {
				const sessionCookie = lucia.createSessionCookie(session.id);
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '/',
					...sessionCookie.attributes
				});
			}

			remult.context.session = session;
			remult.user = user ? { id: user.id, name: user.username, roles: [] } : undefined;
		}
	},
	entities: entities,
	controllers: [AuthController]
});

export const { GET, PUT, DELETE } = _api;
export const POST = async (event: RequestEvent) => {
	console.log(`+server POST `, event.url.pathname, new Date());

	return _api.POST(event);
};

export const _getUserOnServer = async (event: RequestEvent) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		return { session: undefined, user: undefined };
	}
	return await _api.withRemult(event, async () => {
		const { session, user } = await lucia.validateSession(sessionId);

		remult.context.session = session;
		remult.user = user ? { id: user.id, name: user.username, roles: [] } : undefined;

		return {
			session,
			user: remult.user
		};
	});
};

declare module 'remult' {
	export interface RemultContext {
		session: import('lucia').Session | null;
		setHeaders(headers: Record<string, string>): void;
		setCookie(...args: Parameters<RequestEvent['cookies']['set']>): void;
		deleteCookie(...args: Parameters<RequestEvent['cookies']['delete']>): void;
	}
}
