import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";
import { Status } from "@/store/types/commons";
import { AsyncFunction } from "@/types/async.types";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { withDebouncedLoading } from "@/utils/loading-utils";
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

export const useSafeAxiosTask = () => {
	const { execute: safeExec, isRunning, reset, status, error } = useSafeTask();
	const { t } = useI18nGlobal();
	const isLoading = ref(false);
	// Can be used to disable UI elements while the task is either running or loading.
	// Since loading is used to indicate the state of a debounced task, it can be true while the task is not running.
	const isBlocked = computed(() => isRunning.value || isLoading.value);

	const execute = async <T>(fn: AsyncFunction<T>, onErrorNotifyMessage?: string): Promise<TaskResult<T>> => {
		const { result, success, error } = await withDebouncedLoading(() => safeExec<T>(fn), {
			onStart: () => (isLoading.value = true),
			onEnd: () => (isLoading.value = false),
		});

		if (error && onErrorNotifyMessage) {
			const apiError = mapAxiosErrorToResponseError(error);

			if (apiError.code) {
				const statusKey = `error.${apiError.code}`;
				const errorKeyExists = i18nKeyExists(statusKey);

				if (errorKeyExists) {
					notifyError(`${onErrorNotifyMessage} ${t(statusKey)}`);
				} else {
					notifyError(onErrorNotifyMessage);
				}
			}
		}

		if (success) {
			return { result, error, success: true };
		} else {
			return { result: undefined, error, success: false };
		}
	};

	return { execute, isRunning, isLoading: readonly(isLoading), isBlocked, reset, status, error };
};

export const useSafeTaskRunner = <T>(fn: AsyncFunction<T>, onErrorNotifyMessage?: string) => {
	const { error, status, isRunning, execute, reset } = useSafeTask();

	const data = ref<T>();

	const run = async () => {
		const { result, success } = await execute(fn, onErrorNotifyMessage);
		data.value = result;
		return { result, success };
	};
	return { data: readonly(data), error, status, isRunning, run, reset };
};

export const useSafeAxiosRunner = <T>(
	fn: AsyncFunction<T>,
	options: {
		immediate?: boolean;
		onErrorNotifyMessage?: string;
	} = {}
) => {
	const { immediate = true, onErrorNotifyMessage } = options;
	const { execute: safeExec, isRunning, isLoading, isBlocked, reset, status, error } = useSafeAxiosTask();

	const data = ref<T>();

	const execute = async (): Promise<TaskResult<T>> => {
		const { result, success, error } = await safeExec(fn, onErrorNotifyMessage);

		if (success) {
			data.value = result;
		}

		return { result, success, error } as TaskResult<T>;
	};

	if (immediate) {
		execute();
	}

	return {
		data: readonly(data),
		error,
		status,
		isRunning,
		isLoading,
		isBlocked,
		execute,
		reset,
	};
};
