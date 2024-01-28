import type { RequestEvent } from '@sveltejs/kit';
import type { UserInfo } from 'remult';

export const getUser = (
	request: RequestEvent<Partial<Record<string, string>>, string | null>
): Promise<UserInfo | undefined> => {
	if (request.locals?.user) {
		return Promise.resolve({
			id: request.locals?.user.id,
			name: request.locals?.user.username,
			roles: []
		});
	}
	return Promise.resolve(undefined);
};
