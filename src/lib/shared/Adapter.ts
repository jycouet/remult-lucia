import type { Adapter, DatabaseSession, DatabaseUser } from 'lucia';
import { remult } from 'remult';
import { AuthUser, UserSession } from './Entities.js';

export class RemultLuciaAdapter implements Adapter {
	async getSessionAndUser(
		sessionId: string
	): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
		console.log(`getSessionAndUser`);

		const session = await remult.repo(UserSession).findId(sessionId);
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
		throw new Error('getUserSessions Method not implemented.');
	}
	async setSession(session: DatabaseSession): Promise<void> {
		await remult.repo(UserSession).insert(session);
	}
	async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
		throw new Error('updateSessionExpiration Method not implemented.');
	}
	async deleteSession(sessionId: string): Promise<void> {
		await remult.repo(UserSession).delete(sessionId);
	}
	async deleteUserSessions(userId: string): Promise<void> {
		throw new Error('deleteUserSessions Method not implemented.');
	}
	async deleteExpiredSessions(): Promise<void> {
		const all = await remult.repo(UserSession).find({ where: { expiresAt: { $lt: new Date() } } });
		for (const s of all) {
			await remult.repo(UserSession).delete(s);
		}
	}
}
