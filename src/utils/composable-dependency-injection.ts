import { inject, InjectionKey, provide } from "@vue/composition-api";

interface ProviderOf<T extends () => {}> {
	getComposable: () => ReturnType<T>;
	getComposableOptional: () => ReturnType<T> | undefined;
}

export function provideComposable<T extends () => {}>(
	key: InjectionKey<T>,
	composable: () => ReturnType<T>
): void {
	const provider: ProviderOf<T> = {
		getComposable: () => composable(),
		getComposableOptional: () =>
			composable !== undefined ? composable() : undefined,
	};

	provide(key, provider as unknown as T);
}

export function injectComposable<T extends () => {}>(
	key: InjectionKey<T>
): ReturnType<T> {
	const provider = inject<ProviderOf<T>>(key);
	if (provider === undefined) {
		throw new Error(key.toString());
	}
	return provider.getComposable();
}

export function injectComposableOptional<T extends () => {}>(
	key: InjectionKey<T>
): ReturnType<T> | undefined {
	const provider = inject<ProviderOf<T>>(key);
	if (provider === undefined) {
		throw new Error(key.toString());
	}
	return provider.getComposableOptional();
}
