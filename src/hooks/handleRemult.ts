import { entities } from '$lib/shared/Entities.js';
import { remult } from 'remult';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	logApiEndPoints: false,
	getUser: async (request) => {
		if (request.locals?.user) {
			return {
				id: request.locals?.user.id,
				name: request.locals?.user.username,
				roles: []
			};
		}
		return undefined;
	},
	entities: entities,
	controllers: []
});
