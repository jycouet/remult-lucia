<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	let username = '';
	let password = '';

	const signup = async () => {
		try {
			const result = await fetch('/api/auth/signup', {
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

<h1>Sign Up</h1>
<form on:submit|preventDefault={signup}>
	<label for="username">Username</label>
	<input name="username" id="username" autocomplete="username" bind:value={username} required /><br
	/>
	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		required
		autocomplete="current-password"
		bind:value={password}
		minlength="6"
	/><br />
	<button>Continue</button>
</form>
