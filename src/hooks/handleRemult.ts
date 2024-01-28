import { getUser } from '$lib/auth/getUser.js';
import { AuthController } from '$lib/auth/shared/Controllers.js';
import { entities } from '$lib/auth/shared/Entities.js';
import { remult } from 'remult';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	logApiEndPoints: false,
	getUser,
	initRequest: async (event, options) => {
		// remult.context.cookies = event.cookies;
		// console.log(`options`, options);
	},
	entities: entities,
	controllers: [AuthController]
});
