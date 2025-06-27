/*
If we are using createTestingPinia() actions are automatically mocked, but type-wise they are still the regular actions.
In order to get the correct type, we must implement a custom type-wrapper that applies the Mock type to each action.
See Pinia's documentation: https://pinia.vuejs.org/cookbook/testing.html#Mocking-the-returned-value-of-an-action;
*/
import type { Store, StoreDefinition } from "pinia";
import { Mock } from "vitest";
import { UnwrapRef } from "vue";

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
				Record<string, never>,
				{
					[K in keyof Actions]: Actions[K] extends (
						...args: unknown[]
					) => unknown
						? Mock<Actions[K]>
						: Actions[K];
				}
			> & {
				[K in keyof Getters]: UnwrapRef<Getters[K]>;
			}
		: ReturnType<TStoreDef>;

export function mockedPiniaStoreTyping<TStoreDef extends () => unknown>(
	useStore: TStoreDef
): MockedStore<TStoreDef> {
	return useStore() as MockedStore<TStoreDef>;
}
