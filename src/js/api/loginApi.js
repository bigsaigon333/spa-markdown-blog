const API_URL = process.env.API_URL;

let accessToken;
let refreshToken;

export async function login({ username, password }) {
	try {
		const res = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		if (!res.ok) throw new Error(`${res.status} ${res.statusText} Error`);

		const data = await res.json();
		// console.log(data);

		accessToken = data.accessToken;
		refreshToken = data.refreshToken;

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function logout() {
	try {
		const res = await fetch(`${API_URL}/logout`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: refreshToken,
			}),
		});

		if (!res.ok) throw new Error(`${res.status} ${res.statusText} Error`);
		console.log(res);

		const data = await res.json();
		console.log(data);

		accessToken = null;
		refreshToken = null;

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function silentRefresh() {
	try {
		const res = await fetch(`${API_URL}/silent_refresh`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: refreshToken,
			}),
		});

		if (!res.ok) throw new Error(`${res.status} ${res.statusText} Error`);

		const data = await res.json();
		console.log(data);

		accessToken = data.accessToken;

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export function setAccessToken(newToken) {
	accessToken = newToken;
}

export function getAccessToken() {
	return accessToken;
}

export function isLoggedIn() {
	return accessToken != null;
}
