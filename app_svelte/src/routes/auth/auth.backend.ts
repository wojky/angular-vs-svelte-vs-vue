import type { UserInfo } from './useUserState';

const apiUrl = 'http://localhost:3000/auth';

export async function login(
	email: string,
	password: string
): Promise<{ user: UserInfo; token: string }> {
	const response = await fetch(`${apiUrl}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!response.ok) {
		throw new Error('Login failed');
	}

	const data = await response.json();
	return data;
}

export async function logout() {
	const response = await fetch(`${apiUrl}/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error('Logout failed');
	}
}

export async function register(email: string, password: string, subscription: boolean) {
	const response = await fetch(`${apiUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password, subscription })
	});

	if (!response.ok) {
		throw new Error('Registration failed');
	}
}

export async function resetCredentials(email: string) {
	const response = await fetch(`${apiUrl}/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email })
	});

	if (!response.ok) {
		throw new Error('Reset credentials failed');
	}
}

export async function verifyToken(token: string): Promise<{ user: UserInfo; token: string }> {
	const response = await fetch(`http://localhost:3000/verify`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ token })
	});

	if (!response.ok) {
		throw new Error('Token verification failed');
	}

	const data = await response.json();
	return data;
}
