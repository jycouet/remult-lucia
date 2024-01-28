import { BackendMethod, remult } from 'remult';

export class AuthController {
	@BackendMethod({ allowed: true })
	static async signin() {
		console.log(`remult.context`, remult.context);

		console.log(`signin`);
	}
}
