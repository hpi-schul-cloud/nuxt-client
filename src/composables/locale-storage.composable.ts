export function useStorage() {
	const set = (key: string, value: string): void => {
		localStorage.setItem(key, value);
	};

	const get = (key: string) => localStorage.getItem(key);

	const getMultiple = (key: string[]) => key.map((item: string) => localStorage.getItem(item));

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
