import { sequence } from '@sveltejs/kit/hooks';
import { handleRemult } from './hooks/handleRemult.js';
import { handleAuth } from '$lib/auth/handleAuth.js';

export const handle = sequence(
	handleAuth({
		// autoAllowAfterSignup: false,
		providers: {
			password: true
			// ()=>{
			// 	sdsdjjs
			// }
			// password: {
			// 	onlyVerifiedEMail: true
			// }
			// otp: true
			// github: { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET }
		},
		// extendEntitiy : (entity)=>{
		// 	user
		// }
		guards: ['/app']
	}),
	handleRemult
);
