<script lang="ts">
	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Signup', href: '/signup' },
		{ name: 'Signin', href: '/signin' },
		{ name: 'Profile', href: '/profile' },
		{ name: 'Logout', href: '/logout' }
	];
</script>

<svelte:head>
	<title>Remult Lucia</title>

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />
</svelte:head>

{#each links as link}
	<a style="margin-right: 1rem;" href={link.href}>{link.name}</a>
{/each}

<hr />

<slot />
