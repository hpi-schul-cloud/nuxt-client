import { inject } from "vue";

export const injectStrict = <T>(key: string, fallback?: T): T => {
	const resolved = inject(key, fallback);
	if (!resolved) {
		throw new Error(`Could not resolve ${key}`);
	}
	return resolved;
};
