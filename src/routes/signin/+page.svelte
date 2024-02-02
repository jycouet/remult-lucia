<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { AuthController } from '$lib/auth/shared/Controllers.js';

	let username = 'aaa';
	let password = 'aaaaaa';

	const signin = async () => {
		try {
			await AuthController.signin(username, password);
			await invalidateAll();
		} catch (error) {
			alert(error.message);
		}
	};
</script>

<h1>Sign In</h1>
<form on:submit|preventDefault={signin}>
	<label for="username">Username</label>
	<input name="username" id="username" autocomplete="username" bind:value={username} required /><br
	/>
	<label for="password">Password</label>
	<input
		type="password"
		name="password"
		id="password"
		autocomplete="current-password"
		required
		bind:value={password}
		minlength="6"
	/><br />
	<button>Continue</button>
</form>
