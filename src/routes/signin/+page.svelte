<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	let username = '';
	let password = '';

	const signin = async () => {
		try {
			const result = await fetch('/api/auth/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});
			await invalidateAll();
			console.log(`result.status`, result.status);
		} catch (error) {
			alert(error.message);
		}
	};
</script>

<h1>Sign In</h1>
<form on:submit|preventDefault={signin}>
	<label for="username">Username</label>
	<input name="username" id="username" bind:value={username} required /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" required bind:value={password} /><br />
	<button>Continue</button>
</form>
