import { getAccessToken, silentRefresh } from "./loginApi";
import { navigateTo } from "../router.js";

const API_URL = process.env.API_URL;

export async function getPost(id) {
	try {
		let doFetch;
		if (id == null) {
			doFetch = () =>
				fetch(`${API_URL}`, {
					method: "GET",
				});
		} else {
			doFetch = () =>
				fetch(`${API_URL}/${id}`, {
					method: "GET",
				});
		}
		const res = await doFetch();

		if (!res.ok) {
			console.error(res);
			throw new Error(`${res.status} ${res.statusText} Error`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function postPost(body) {
	try {
		const doFetch = () =>
			fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${getAccessToken()}`,
				},
				body: JSON.stringify(body),
			});

		let res = await doFetch();

		if (!res.ok) {
			if (res.status === 401) {
				return navigateTo("/login");
			} else if (res.status === 403) {
				const ret = await silentRefresh();
				console.log(ret);
				if (ret) res = await doFetch();
				else return navigateTo("/login");
			} else throw new Error(`${res.status} ${res.statusText} Error`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		// TODO: Error UI 처리
		return null;
	}
}

export async function putPost(id, body) {
	try {
		const doFetch = () =>
			fetch(`${API_URL}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${getAccessToken()}`,
				},
				body: JSON.stringify(body),
			});

		let res = await doFetch();

		if (!res.ok) {
			if (res.status === 401) {
				return navigateTo("/login");
			} else if (res.status === 403) {
				const ret = await silentRefresh();
				console.log(ret);
				if (ret) res = await doFetch();
				else return navigateTo("/login");
			} else throw new Error(`${res.status} ${res.statusText} Error`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		// TODO: Error UI 처리
		return null;
	}
}

export async function deletePost(id) {
	try {
		const doFetch = () =>
			fetch(`${API_URL}/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${getAccessToken()}`,
				},
			});
		let res = await doFetch();

		if (!res.ok) {
			if (res.status === 401) {
				return navigateTo("/login");
			} else if (res.status === 403) {
				const ret = await silentRefresh();
				console.log(ret);
				if (ret) res = await doFetch();
				else return navigateTo("/login");
			} else throw new Error(`${res.status} ${res.statusText} Error`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
