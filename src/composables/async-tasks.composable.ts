import { Status } from "@/store/types/commons";
import { ref } from "vue";
import { useTryCatch } from "@/utils/try-catch.utils";
import { AsyncFunction } from "@/types/async.types";

export const useAsyncTasks = () => {
	const error = ref<Error>();
	const status = ref<Status>("");
	const isLoading = ref(false);

	const execute = async <T>(fn: AsyncFunction<T>): Promise<T | undefined> => {
		error.value = undefined;
		status.value = "pending";
		isLoading.value = true;

		const [err, response] = await useTryCatch(fn);
		isLoading.value = false;

		if (err) {
			error.value = err;
			status.value = "error";
			return undefined;
		}

		status.value = "completed";
		return response;
	};

	const reset = () => {
		error.value = undefined;
		status.value = "";
		isLoading.value = false;
	};

	return {
		error,
		status,
		isLoading,
		execute,
		reset,
	};
};
