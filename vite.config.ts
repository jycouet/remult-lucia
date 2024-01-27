import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { stripper } from 'vite-plugin-stripper';

export default defineConfig({
	plugins: [stripper({ decorators: ['BackendMethod'], debug: false }), sveltekit()],
	// optimizeDeps: { exclude: ['@node-rs/argon2-wasm32-wasi'] },
	// ssr: {
	// 	external: ['@node-rs/argon2-wasm32-wasi']
	// 	// noExternal: ['svelte-select']
	// },
	ssr: {
		noExternal: ['@node-rs/argon2-wasm32-wasi', '@node-rs/bcrypt-wasm32-wasi']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
