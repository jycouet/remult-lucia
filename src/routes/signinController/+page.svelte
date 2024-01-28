<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { AuthController } from '$lib/shared/Controllers.js';

	let username = '';
	let password = '';

	const signin = async () => {
		try {
			await AuthController.signin();

			await invalidateAll();
			// console.log(`result.status`, result.status);
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
		required
		autocomplete="current-password"
		bind:value={password}
		minlength="6"
	/><br />
	<button>Continue</button>
</form>
