import type { LayoutServerLoad } from './$types.js';
import { _getUserOnServer } from './api/[...remult]/+server.js';

export const load = (async (event) => {
	const { user } = await _getUserOnServer(event);
	return { user };
}) satisfies LayoutServerLoad;
