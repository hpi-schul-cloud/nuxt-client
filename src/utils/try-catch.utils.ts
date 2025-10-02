import { AsyncFunction } from "@/types/async.types";

export const useTryCatch = async <T>(
	fn: AsyncFunction<T>
): Promise<[Error, null] | [null, T]> => {
	try {
		const result = await fn();
		return [null, result];
	} catch (error) {
		return [error instanceof Error ? error : new Error(String(error)), null];
	}
};
