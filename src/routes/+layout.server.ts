// import { AuthController } from '$lib/auth/shared/Controllers.js';
// import { AuthController } from '$lib/auth/shared/Controllers.js';
import { remult } from 'remult';
import type { LayoutServerLoad } from './$types.js';
import { _api, _getUserOnServer } from './api/[...remult]/+server.js';

export const load = (async (event) => {
	const { user } = await _getUserOnServer(event);
	console.log(`server load  `, { user });

	return { user };
}) satisfies LayoutServerLoad;
