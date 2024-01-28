import { redirect } from '@sveltejs/kit';
import { remult } from 'remult';
import type { LayoutServerLoad } from './$types.js';

export const load = (async () => {
	if (!remult.user) {
		// throw redirect(303, AUTH_ROUTES.login())
	}

	return { user: remult.user };
}) satisfies LayoutServerLoad;
