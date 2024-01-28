<script lang="ts">
	import { remult } from 'remult';
	import type { LayoutData } from './$types.js';
	import { invalidateAll } from '$app/navigation';
	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Sign Up', href: '/signup' },
		{ name: 'Sign In', href: '/signin' },
		{ name: 'Profile', href: '/profile' }
	];

	export let data: LayoutData;
	$: remult.user = data.user;

	const signout = async () => {
		try {
			const result = await fetch('/api/auth/signout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			await invalidateAll();
			console.log(`result.status`, result.status);
		} catch (error) {
			alert(error.message);
		}
	};
</script>

<svelte:head>
	<title>Remult Lucia</title>

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />
</svelte:head>

{#each links as link}
	<a style="margin-right: 1rem;" href={link.href}>{link.name}</a>
{/each}
<button on:click={signout}>Sign Out</button>

<hr />
{remult?.user?.name}
<hr />
<slot />
