import { sequence } from '@sveltejs/kit/hooks';
import { handleRemult } from './hooks/handleRemult.js';
import { handleAuth } from '$lib/sveltekit/handleAuth.js';

export const handle = sequence(
	handleAuth({
		// autoAllowAfterSignup: false,
		providers: {
			password: true
			// password: {
			// 	onlyVerifiedEMail: true
			// }
			// otp: true
			// github: { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET }
		},
		guards: ['/app']
	}),
	handleRemult
);
