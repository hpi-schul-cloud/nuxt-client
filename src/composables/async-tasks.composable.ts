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
	const isBlocked = computed(() => isRunning.value || isLoading.value);
	// isLoading uses withDebouncedLoading: delays activation and enforces a minimum display time.
	// isBlocked = isRunning || isLoading — use it to disable UI elements during either state.
	//
	// Step-by-step flow (fast task — finishes before delay):
	//
	//   execute() called
	//       │
	//       ├─ isRunning = true  ──────────────────────────────────────┐
	//       │                                                          │
	//       ├─ task finishes → isRunning = false                	  ────┘
	//       │
	//       └─ [delay never passes] → isLoading stays false
	//
	//   - isLoading never gets activated because the task finishes before the debounce delay.
	//   - isBlocked gets activated only while isRunning is true.
	//
	// Step-by-step flow (slow task — exceeds delay):
	//
	//   execute() called
	//       │
	//       ├─ isRunning = true  ──────────────────────────────────────┐
	//       │                                                          │
	//       ├─ [delay passes] → isLoading = true  ────────────────┐    │
	//       │                                                     │    │
	//       ├─ task finishes → isRunning = false                  │ ───┘
	//       │                                                     │
	//       └─ [minDisplayTime expires] → isLoading = false  ─────┘
	//
	//   - isLoading gets activated after the debounce delay and remains true for at least the minimum display time,
	//     even if the task finishes in the meantime.
	//   - isBlocked is true from the moment execute() is called until both isRunning and isLoading are false,
	//     ensuring the UI remains disabled during the entire operation.
	//
	// This approach provides a smoother user experience by preventing flickering for fast tasks and ensuring consistent feedback for slower tasks.

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
