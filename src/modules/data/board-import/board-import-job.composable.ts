import { $axios } from "@/utils/api";
import {
	BoardImportApiFactory,
	BoardImportJobResponse,
	BoardImportJobStatus,
	BoardImportTargetType,
} from "@api-board-import";
import { isObject, tryOnScopeDispose, useTimeoutPoll } from "@vueuse/core";
import { isAxiosError } from "axios";
import { ref } from "vue";

const POLL_INTERVAL_MS = 3000;
const END_STATUSES: BoardImportJobStatus[] = [BoardImportJobStatus.FINISHED, BoardImportJobStatus.FAILED];

const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every((item) => typeof item === "string");

const getBackendErrorMessages = (error: unknown): string[] => {
	const payload: unknown = isAxiosError(error) ? error.response?.data : undefined;
	if (!isObject(payload)) return [];

	const { title, message, validationErrors } = payload as Record<string, unknown>;
	const messages: string[] = [];

	if (typeof message === "string" && message) {
		messages.push(typeof title === "string" && title ? `${title}: ${message}` : message);
	}

	if (Array.isArray(validationErrors)) {
		for (const detail of validationErrors) {
			if (isObject(detail) && "field" in detail && "errors" in detail) {
				const { field, errors } = detail;
				if (isStringArray(field) && isStringArray(errors)) {
					messages.push(`${field.join(".")}: ${errors.join(", ")}`);
				}
			}
		}
	}

	return messages;
};

export const useBoardImportJob = () => {
	const boardImportApi = BoardImportApiFactory(undefined, "/v3", $axios);

	const job = ref<BoardImportJobResponse>();
	const hasError = ref(false);
	const errorMessages = ref<string[]>([]);
	const isStarting = ref(false);

	// Responses that arrive after reset() or unmount must not change the state or restart the polling.
	let generation = 0;
	const isOutdated = (requestGeneration: number): boolean => requestGeneration !== generation;

	const setError = (error: unknown): void => {
		hasError.value = true;
		errorMessages.value = getBackendErrorMessages(error);
	};

	const clearError = (): void => {
		hasError.value = false;
		errorMessages.value = [];
	};

	const fetchJob = async (): Promise<void> => {
		if (!job.value) return;

		const requestGeneration = generation;
		try {
			const response = await boardImportApi.boardImportControllerGetJob(job.value.id);
			if (isOutdated(requestGeneration)) return;

			job.value = response.data;
			if (END_STATUSES.includes(response.data.status)) {
				pause();
			}
		} catch (error) {
			if (isOutdated(requestGeneration)) return;

			setError(error);
			pause();
		}
	};

	const { pause, resume } = useTimeoutPoll(fetchJob, POLL_INTERVAL_MS, { immediate: false });

	const startImport = async (link: string, targetType: BoardImportTargetType, targetId: string): Promise<void> => {
		clearError();
		isStarting.value = true;

		const requestGeneration = generation;
		try {
			const response = await boardImportApi.boardImportControllerStartImport({ link, targetType, targetId });
			if (isOutdated(requestGeneration)) return;

			job.value = response.data;
			resume();
		} catch (error) {
			if (isOutdated(requestGeneration)) return;

			setError(error);
		} finally {
			if (!isOutdated(requestGeneration)) {
				isStarting.value = false;
			}
		}
	};

	const reset = (): void => {
		generation++;
		pause();
		job.value = undefined;
		isStarting.value = false;
		clearError();
	};

	tryOnScopeDispose(() => {
		generation++;
	});

	return { job, hasError, errorMessages, isStarting, startImport, reset };
};
