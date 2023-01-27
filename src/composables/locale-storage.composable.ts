export function useStorage() {
	const set = (key: string, value: string): void => {
		localStorage.setItem(key, value);
	};

	const get = (key: string) => {
		return localStorage.getItem(key);
	};

	const getMultiple = (key: string[]) => {
		return key.map((item: string) => localStorage.getItem(item));
	};

	const remove = (key: string): void => {
		localStorage.removeItem(key);
	};

	return {
		set,
		get,
		getMultiple,
		remove,
	};
}
