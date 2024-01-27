import { Entity, Fields } from 'remult';

@Entity('auth_user', {
	allowApiCrud: true
})
export class AuthUser {
	@Fields.cuid()
	id!: string;

	// if you wan github
	@Fields.string()
	username!: string;
	@Fields.string({ includeInApi: false })
	hashedPassword!: string;
}

@Entity('user_session', {
	allowApiCrud: true
})
export class UserSession {
	@Fields.cuid()
	id!: string;

	@Fields.date()
	expiresAt!: Date;

	@Fields.string()
	userId!: string;
}

export const entities = [AuthUser, UserSession];
