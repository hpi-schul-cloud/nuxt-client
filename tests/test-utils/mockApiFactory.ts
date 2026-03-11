import { mockApiResponse } from "./mockApiResponse";
import { Mocked } from "vitest";
import { mock } from "vitest-mock-extended";

/**
 * Creates an API mock where all methods automatically return a successful mockApiResponse
 * You can still override individual methods with custom responses using .mockResolvedValue()
 */
export const mockApi = <T>(): Mocked<T> => {
	const apiMock = mock<T>();

	// Create a proxy that auto-mocks any method call with mockApiResponse
	return new Proxy(apiMock, {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		get(target: any, prop: string | symbol) {
			const originalProperty = target[prop];

			// If it's a function (API method), ensure it has a default implementation
			if (typeof originalProperty === "function" && typeof prop === "string") {
				// If it hasn't been explicitly mocked, set a default mockApiResponse
				if (originalProperty.getMockImplementation && !originalProperty.getMockImplementation()) {
					originalProperty.mockResolvedValue(mockApiResponse({ data: {} }));
				}
			}

			return originalProperty;
		},
	}) as Mocked<T>;
};
