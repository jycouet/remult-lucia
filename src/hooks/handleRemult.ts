import { AuthController } from '$lib/shared/Controllers.js';
import { entities } from '$lib/shared/Entities.js';
import { remultSveltekit } from 'remult/remult-sveltekit';

export const handleRemult = remultSveltekit({
	entities: entities,
	controllers: [AuthController]
});
