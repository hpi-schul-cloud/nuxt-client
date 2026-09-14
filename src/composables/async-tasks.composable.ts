import { useDebouncedLoading } from "./debounced-loading.composable";
import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";
import { AsyncFunction } from "@/types/async.types";
import { Status } from "@/types/common/commons";
import { LoadingStateOptions } from "@/types/loading.types";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useTryCatch } from "@/utils/try-catch.utils";
import { notifyError } from "@data-app";
import { logger } from "@util-logger";
import { computed, readonly, ref } from "vue";

type TaskResult<T> =
	| { success: true; result: T; error?: undefined }
	| { success: false; result?: undefined; error: Error };

export const noDebounceLoadingOptions: LoadingStateOptions = {
	delay: 0,
	minDisplayTime: 0,
};

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

	const { loadingState, withLoadingState } = useDebouncedLoading();

	const execute = async <T>(
		fn: AsyncFunction<T>,
		onErrorNotifyMessage?: string,
		options: LoadingStateOptions = {}
	): Promise<TaskResult<T>> => {
		const { skipErrorNotification, ...loadingOptions } = options;
		const { result, success, error } = await withLoadingState(() => safeExec<T>(fn), loadingOptions);

		if (error && onErrorNotifyMessage && !skipErrorNotification?.(error)) {
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

	return { execute, isRunning, loadingState, reset, status, error };
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
		loadingOptions?: LoadingStateOptions;
	} = {}
) => {
	const { immediate = true, onErrorNotifyMessage, loadingOptions } = options;
	const { execute: safeExec, isRunning, loadingState, reset, status, error } = useSafeAxiosTask();

	const data = ref<T>();

	const execute = async (): Promise<TaskResult<T>> => {
		const { result, success, error } = await safeExec(fn, onErrorNotifyMessage, loadingOptions);

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
		loadingState,
		execute,
		reset,
	};
};
