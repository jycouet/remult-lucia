import { lucia } from '$lib/initLucia.js';
import { AuthUser } from '$lib/shared/Entities.js';
import { redirect, type Handle, fail } from '@sveltejs/kit';

import { sequence } from '@sveltejs/kit/hooks';
import { Argon2id } from 'oslo/password';
import { remult } from 'remult';
import { handleRemult } from '../../hooks/handleRemult.js';

const handleAuthSignup: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/api/auth/signup') {
		// REMULT question: How to set headers (or cookies), from a backend method? AuthController.signup?
		const { username, password } = await event.request.json();

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			fail(400, { message: 'Invalid password' });
			// throw new Error('Invalid password');
		} else {
			const hashedPassword = await new Argon2id().hash(password);

			const sessionCookie = await handleRemult.withRemult(
				{ request: event.request } as any,
				async () => {
					const user = await remult.repo(AuthUser).insert({
						username,
						hashedPassword
					});
					const session = await lucia.createSession(user.id, {});
					const sessionCookie = lucia.createSessionCookie(session.id);
					return sessionCookie;
				}
			);

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			redirect(302, '/');
		}
	}

	return resolve(event);
};

const handleAuthSignin: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/api/auth/signin') {
		// REMULT question: How to set headers (or cookies), from a backend method? AuthController.signup?
		const { username, password } = await event.request.json();

		const sessionCookie = await handleRemult.withRemult(
			{ request: event.request } as any,
			async () => {
				const existingUser = await remult.repo(AuthUser).findOne({ where: { username } });
				if (existingUser) {
					const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password);
					if (!validPassword) {
						return undefined;
						// return fail(400, {
						// 	message: "Incorrect username or password"
						// });
					}

					const session = await lucia.createSession(existingUser.id, {});
					const sessionCookie = lucia.createSessionCookie(session.id);
					return sessionCookie;
				}
				return undefined;
			}
		);

		if (sessionCookie) {
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}

		redirect(302, '/');
	}

	return resolve(event);
};

const handleAuthSignout: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/api/auth/signout') {
		await handleRemult.withRemult({ request: event.request } as any, async () => {
			if (event.locals.session) {
				await lucia.invalidateSession(event.locals.session.id);
			}
			event.cookies.delete(lucia.sessionCookieName, { path: '.' });
			redirect(302, '/');
		});
	}
	return resolve(event);
};

const handleAuthCore: (guards: string[]) => Handle =
	(guards) =>
	async ({ event, resolve }) => {
		const sessionId = event.cookies.get(lucia.sessionCookieName);

		if (!sessionId) {
			event.locals.user = null;
			event.locals.session = null;

			if (guards.filter((c) => event.url.pathname.startsWith(c)).length > 0) {
				redirect(302, '/');
			}

			return resolve(event);
		}

		const { session, user } = await handleRemult.withRemult(
			{ request: event.request } as any,
			async () => {
				const { session, user } = await lucia.validateSession(sessionId);
				if (session && session.fresh) {
					const sessionCookie = lucia.createSessionCookie(session.id);
					// sveltekit types deviates from the de-facto standard
					// you can use 'as any' too
					event.cookies.set(sessionCookie.name, sessionCookie.value, {
						path: '.',
						...sessionCookie.attributes
					});
				}
				return { session, user };
			}
		);
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		event.locals.user = user;
		event.locals.session = session;

		return resolve(event);
	};

export type HandleAuthOptions = {
	providers?: {
		password?: boolean;
	};
	guards?: string[];
};
// the order is key
export const handleAuth = (options: HandleAuthOptions) => {
	return sequence(
		handleAuthSignin,
		handleAuthSignup,
		handleAuthCore(options.guards ?? []),
		handleAuthSignout
	);
};
