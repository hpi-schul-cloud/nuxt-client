import { Mocked } from "vitest";
import { mock } from "vitest-mock-extended";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockComposable = <T extends (...args: any[]) => any>(
	factoryFn: T,
	ext: Partial<ReturnType<T>> = {}
): Mocked<ReturnType<T>> => {
	const baseMock = mock<ReturnType<T>>();
	Object.assign(baseMock, ext);
	return baseMock;
};
