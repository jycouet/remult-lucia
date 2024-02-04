import type { Handle } from '@sveltejs/kit';
import { _api } from './routes/api/[...remult]/+server.js';
import { sequence } from '@sveltejs/kit/hooks';

const handleOne: Handle = async ({ event, resolve }) => {
	console.log('');
	console.log(`handle One   `, event.url.pathname, new Date());
	event.setHeaders({ helloOne: 'one' });
	return resolve(event);
};

const handleTwo: Handle = async ({ event, resolve }) => {
	console.log(`handle Two   `, event.url.pathname, new Date());
	event.setHeaders({ helloTwo: 'two' });
	return resolve(event);
};

const handleRemult: Handle = async ({ event, resolve }) => {
	console.log(`handle Remult`, event.url.pathname, new Date());
	return await _api.withRemult(event, async () => await resolve(event));
};

export const handle = sequence(handleOne, handleRemult, handleTwo);
