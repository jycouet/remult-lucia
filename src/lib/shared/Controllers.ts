import { BackendMethod, remult } from 'remult';
import { Argon2id } from 'oslo/password';
import { AuthUser } from './Entities.js';

export class AuthController {
	@BackendMethod({ allowed: true })
	static async signup(username: string, password: string) {
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		// TODO entities
		// if (
		// 	typeof username !== "string" ||
		// 	username.length < 3 ||
		// 	username.length > 31 ||
		// 	!/^[a-z0-9_-]+$/.test(username)
		// ) {
		// 	return fail(400, {
		// 		message: "Invalid username"
		// 	});
		// }
		// TODO entities
		// if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
		// 	return fail(400, {
		// 		message: 'Invalid password'
		// 	});
		// }

		// const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);

		// TODO: check if username is already used
		// await db.table('user').insert({
		// 	id: userId,
		// 	username: username,
		// 	hashed_password: hashedPassword
		// });
		const u = await remult.repo(AuthUser).insert({
			username,
			hashedPassword
		});

		// const session = await lucia.createSession(userId, {});
		// const sessionCookie = lucia.createSessionCookie(session.id);
		// event.cookies.set(sessionCookie.name, sessionCookie.value, {
		// 	path: '.',
		// 	...sessionCookie.attributes
		// });

		// redirect(302, '/');
	}
}
