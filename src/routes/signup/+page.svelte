<script lang="ts">
	import { AuthController } from '$lib/shared/Controllers.js';

	let username = '';
	let password = '';

	const signup = async () => {
		await AuthController.signup(username, password);
	};
</script>

<h1>Sign up</h1>
<form on:submit={signup}>
	<label for="username">Username</label>
	<input name="username" id="username" bind:value={username} /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" bind:value={password} /><br />
	<button>Continue</button>
</form>
