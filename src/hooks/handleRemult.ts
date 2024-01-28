import { AuthController } from '$lib/shared/Controllers.js';
import { entities } from '$lib/shared/Entities.js';
import { getUser } from '$lib/sveltekit/getUser.js';
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
