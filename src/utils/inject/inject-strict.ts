import { inject, InjectionKey } from "vue";

export const injectStrict = <T>(key: InjectionKey<T>, fallback?: T): T => {
	const resolved = inject(key, fallback);

	if (resolved === undefined) {
		throw new Error(`InjectStrict: Could not resolve ${key.description}`);
	}

	return resolved;
};
