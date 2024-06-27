import { writable } from 'svelte/store';
import { useUserState } from './useUserState';
import { login, logout, verifyToken } from './auth.backend';
import { goto } from '$app/navigation';

export const AuthStateStatus = {
	INIT: 'INIT',
	NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
	AUTHENTICATED: 'AUTHENTICATED'
} as const;

export type AuthStateStatus = keyof typeof AuthStateStatus;

export type AuthState =
	| { status: (typeof AuthStateStatus)['INIT'] }
	| { status: (typeof AuthStateStatus)['NOT_AUTHENTICATED'] }
	| { status: (typeof AuthStateStatus)['AUTHENTICATED'] };

const userStore = useUserState();

const authStateStore = writable<AuthState>({ status: 'INIT' });

export const useAuthStore = () => {
	return {
		value: authStateStore.subscribe,
		async init() {
			authStateStore.subscribe((s) => {
				if (['AUTHENTICATED', 'NOT_AUTHENTICATED'].includes(s.status)) {
					goto('/');
				}
			});

			const token = localStorage.getItem('token');

			if (!token) {
				authStateStore.set({ status: AuthStateStatus.NOT_AUTHENTICATED });
				return;
			}

			const verified = await verifyToken(token);

			if (verified) {
				localStorage.setItem('token', verified.token);
			}

			userStore.setUser(verified?.user || null);
			authStateStore.set({
				status: token ? AuthStateStatus.AUTHENTICATED : AuthStateStatus.NOT_AUTHENTICATED
			});
		},
		async login(email: string, password: string) {
			const { user, token } = await login(email, password);

			userStore.setUser(user);
			localStorage.setItem('token', token);
			authStateStore.set({ status: 'AUTHENTICATED' });
		},

		async logout() {
			await logout();

			userStore.clearUser();
			localStorage.removeItem('token');
			authStateStore.set({ status: 'NOT_AUTHENTICATED' });
		}
	};
};
