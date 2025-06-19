/*
If we are using createTestingPinia() actions are automatically mocked, but type-wise they are still the regular actions.
In order to get the correct type, we must implement a custom type-wrapper that applies the Mock type to each action.
See Pinia's documentation: https://pinia.vuejs.org/cookbook/testing.html#Mocking-the-returned-value-of-an-action;
*/
import type { Store, StoreDefinition } from "pinia";

export type MockedStore<TStoreDef extends () => unknown> =
	TStoreDef extends StoreDefinition<
		infer Id,
		infer State,
		infer Getters,
		infer Actions
	>
		? Store<
				Id,
				State,
				Getters,
				{
					[K in keyof Actions]: Actions[K] extends (
						...args: infer Args
					) => infer ReturnT
						? vi.Mock<ReturnT, Args>
						: Actions[K];
				}
			>
		: ReturnType<TStoreDef>;

export function mockedPiniaStoreTyping<TStoreDef extends () => unknown>(
	useStore: TStoreDef
): MockedStore<TStoreDef> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return useStore() as any;
}
