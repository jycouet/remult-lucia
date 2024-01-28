import type { Adapter, DatabaseSession, DatabaseUser } from 'lucia';
import { remult } from 'remult';
import { AuthUser, AuthUserSession } from './Entities.js';

export class RemultLuciaAdapter implements Adapter {
	async getSessionAndUser(
		sessionId: string
	): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
		const session = await remult.repo(AuthUserSession).findId(sessionId);
		if (session) {
			const user = await remult.repo(AuthUser).findId(session.userId);
			return [
				{ ...session, attributes: {} },
				{ ...user, attributes: { username: user.username } }
			];
		}
		return [null, null];
	}
	async getUserSessions(userId: string): Promise<DatabaseSession[]> {
		return (await remult.repo(AuthUserSession).find({ where: { userId } })).map((s) => {
			return { ...s, attributes: {} };
		});
	}
	async setSession(session: DatabaseSession): Promise<void> {
		await remult.repo(AuthUserSession).insert(session);
	}
	async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
		await remult.repo(AuthUserSession).update(sessionId, { expiresAt });
	}
	async deleteSession(sessionId: string): Promise<void> {
		await remult.repo(AuthUserSession).delete(sessionId);
	}
	async deleteUserSessions(userId: string): Promise<void> {
		const all = await remult.repo(AuthUserSession).find({ where: { userId } });
		for (const s of all) {
			await remult.repo(AuthUserSession).delete(s);
		}
	}
	async deleteExpiredSessions(): Promise<void> {
		const all = await remult
			.repo(AuthUserSession)
			.find({ where: { expiresAt: { $lt: new Date() } } });
		for (const s of all) {
			await remult.repo(AuthUserSession).delete(s);
		}
	}
}
