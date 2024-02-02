// See https://kit.svelte.dev/docs/types#app

import type { UserInfo } from 'remult';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// user: import('lucia').User | null;
			// user: UserInfo | undefined;
			// session: import('lucia').Session | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
