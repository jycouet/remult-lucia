<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { remult } from 'remult';
	import type { LayoutData } from './$types.js';
	import { AuthController } from '$lib/auth/shared/Controllers.js';
	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Sign Up', href: '/signup' },
		{ name: 'Sign In', href: '/signin' },
		{ name: 'Profile', href: '/app', onlyAuthenticated: true }
	];

	export let data: LayoutData;
	console.log(`+layout.svelt`, data);

	$: remult.user = data.user;

	const signout = async () => {
		try {
			AuthController.signout();
			await invalidateAll();
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
	{#if !link.onlyAuthenticated || (link.onlyAuthenticated && remult.authenticated())}
		<a style="margin-right: 1rem;" href={link.href}>{link.name}</a>
	{/if}
{/each}
{#if remult.authenticated()}
	<button on:click={signout}>Sign Out</button>
{/if}

<hr />
{remult?.user?.name ?? 'No user signed in'}
<hr />
<slot />
