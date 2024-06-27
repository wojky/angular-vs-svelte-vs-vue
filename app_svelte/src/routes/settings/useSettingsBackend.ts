export type UpdateSettingsPayload = {
	currentPassword: string;
	newPassword: string;
	subscription: boolean;
};

export function updateSettings(payload: Partial<UpdateSettingsPayload>) {
	return fetch('http://localhost:3000/settings', {
		method: 'PATCH',
		body: JSON.stringify(payload)
	});
}
