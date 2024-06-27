import { writable } from 'svelte/store';

export type UserInfo = {
	role: string;
	email: string;
	watchList: number[];
	subscribed: boolean;
};

const initialState = null;

const userStore = writable<UserInfo | null>(initialState);

export const useUserState = () => {
	return {
		subscribe: userStore.subscribe,
		setUser: (userInfo: UserInfo) => {
			userStore.set(userInfo);
		},
		updateUser: (userInfo: Partial<UserInfo>) => {
			userStore.update((user) => {
				return user ? { ...user, ...userInfo } : null;
			});
		},
		clearUser: () => {
			userStore.set(null);
		}
	};
};
