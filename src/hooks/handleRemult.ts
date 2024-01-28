import { entities } from '$lib/shared/Entities.js';
import { getUser } from '$lib/sveltekit/getUser.js';
import { remult } from 'remult';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	logApiEndPoints: false,
	getUser,
	entities: entities,
	controllers: []
});
