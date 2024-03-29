import { Entity, Fields, Validators } from 'remult';

@Entity('auth_user', {
	// allowApiCrud: true,
	dbName: 'auth.auth_user'
})
export class AuthUser {
	@Fields.cuid()
	id!: string;

	@Fields.string<AuthUser>({
		validate: [
			Validators.unique(),
			(e) => {
				if (e.username.length < 2) throw 'Must be at least 2 characters long';
			}
		]
	})
	username!: string;

	@Fields.string({ includeInApi: false })
	hashedPassword!: string;
}

@Entity('user_session', {
	// allowApiCrud: true
	dbName: 'auth.user_session'
})
export class AuthUserSession {
	@Fields.cuid()
	id!: string;

	@Fields.date()
	expiresAt!: Date;

	@Fields.string()
	userId!: string;
}

export const entities = [AuthUser, AuthUserSession];
