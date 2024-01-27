import { sequence } from '@sveltejs/kit/hooks';
import { handleRemult } from './hooks/handleRemult.js';
import { handleAuth } from '$lib/sveltekit/handleAuth.js';

export const handle = sequence(handleAuth, handleRemult);