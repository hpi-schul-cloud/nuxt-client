import { Status } from "@/store/types/commons";
import { AsyncFunction } from "@/types/async.types";
import { useTryCatch } from "@/utils/try-catch.utils";
import { notifyError } from "@data-app";
import { logger } from "@util-logger";
import { computed, readonly, ref } from "vue";

type TaskResult<T> =
	| { success: true; result: T; error?: undefined }
	| { success: false; result?: undefined; error: Error };

export const useSafeTask = () => {
	const error = ref<Error>();
	const status = ref<Status>("");
	const isRunning = computed(() => status.value === "pending");

	const execute = async <T>(fn: AsyncFunction<T>, onErrorNotifyMessage?: string): Promise<TaskResult<T>> => {
		error.value = undefined;
		status.value = "pending";

		const [err, result] = await useTryCatch(fn);

		if (err) {
			error.value = err;
			status.value = "error";
			logger.error(err);

			if (onErrorNotifyMessage) {
				notifyError(onErrorNotifyMessage);
			}
			return { success: false, result: undefined, error: error.value };
		}

		status.value = "completed";

		return { success: true, result, error: undefined };
	};

	const reset = () => {
		error.value = undefined;
		status.value = "";
	};

	return {
		error: readonly(error),
		status: readonly(status),
		isRunning,
		execute,
		reset,
	};
};

export const useSafeTaskRunner = <T>(fn: AsyncFunction<T>) => {
	const { error, status, isRunning, execute, reset } = useSafeTask();

	const data = ref<T>();

	const run = async () => {
		const { result, success } = await execute(fn);
		data.value = result;
		return { result, success };
	};
	return { error, status, data, isRunning, run, reset };
};
