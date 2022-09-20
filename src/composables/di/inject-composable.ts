import { inject, InjectionKey, provide } from "@vue/composition-api";
import { USE_LOADING_STATE } from "@/composables/loadingState";

// injectComposable("loadingState").getComposable(); // T
// injectComposable("loadingState").getComposableOptional(); // T | undefined

// OR

// injectComposable('loadingState'); // T
// injectComposableOptional('loadingState'); // T | undefined

interface ProviderOf<T extends () => {}> {
	getComposable: () => ReturnType<T>;
	getComposableOptional: () => ReturnType<T> | undefined;
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

class Test {
	constructor() {
		const mockComposable = () => {
			return {
				openLoadingDialog: () => {},
				closeLoadingDialog: () => {},
			};
		};

		provideComposable(USE_LOADING_STATE, mockComposable);

		provideComposable(USE_LOADING_STATE, () => {});

		const composable = injectComposable(USE_LOADING_STATE);
		composable.closeLoadingDialog();

		const composableOpt = injectComposableOptional(USE_LOADING_STATE);
		composableOpt?.closeLoadingDialog();
	}
}

export function myComposable() {
	const myStore: string | undefined = inject("myStore");
	const myChildComposable = injectComposable("myChildComposable");

	const doSth = () => {};

	return {
		doSth,
	};
}
