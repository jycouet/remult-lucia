// import { AuthController } from '$lib/auth/shared/Controllers.js';
// import { AuthController } from '$lib/auth/shared/Controllers.js';
import { remult } from 'remult';
import type { LayoutServerLoad } from './$types.js';
import { _api, _getUserOnServer } from './api/[...remult]/+server.js';

export const load = (async (event) => {
	console.log(`kit server load`);

	// const { user } = await _getUserOnServer(event);
	// console.log(`user`, user);

	// const u = await AuthController.getCurrentUser();
	// console.log(`u`, u);

	return { user: await _api.withRemult(event, async () => remult.user) };

	// return { user };
}) satisfies LayoutServerLoad;
