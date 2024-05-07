/*
If we are using createTestingPinia() actions are automatically mocked but type-wise, they are still the regular actions.
In order to get the correct type, we must implement a custom type-wrapper that is applies the Mock type to each action.
See Pinia's documentation: https://pinia.vuejs.org/cookbook/testing.html#Mocking-the-returned-value-of-an-action;
*/
import type { Store, StoreDefinition } from "pinia";
import { jest } from "@jest/globals";

export function mockedStore<TStoreDef extends () => unknown>(
	useStore: TStoreDef
): TStoreDef extends StoreDefinition<
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
					? jest.Mock<ReturnT, Args>
					: Actions[K];
			}
		>
	: ReturnType<TStoreDef> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return useStore() as any;
}
