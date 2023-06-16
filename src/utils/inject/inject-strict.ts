import { InjectionKey, inject } from "vue";

export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T): T => {
	const resolved = inject(key, fallback);
	if (!resolved) {
		throw new Error(`Could not resolve ${key.description}`);
	}
	return resolved;
};
