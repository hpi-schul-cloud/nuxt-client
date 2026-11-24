import { $axios } from "@/utils/api";
import {
	BoardImportApiFactory,
	BoardImportJobResponse,
	BoardImportJobStatus,
	BoardImportTargetType,
} from "@api-board-import";
import { useTimeoutPoll } from "@vueuse/core";
import { ref } from "vue";

const POLL_INTERVAL_MS = 3000;
const END_STATUSES: BoardImportJobStatus[] = [BoardImportJobStatus.FINISHED, BoardImportJobStatus.FAILED];

export const useBoardImportJob = () => {
	const boardImportApi = BoardImportApiFactory(undefined, "/v3", $axios);

	const job = ref<BoardImportJobResponse>();
	const hasError = ref(false);
	const isStarting = ref(false);

	const fetchJob = async (): Promise<void> => {
		if (!job.value) return;

		try {
			const response = await boardImportApi.boardImportControllerGetJob(job.value.id);
			job.value = response.data;
			if (END_STATUSES.includes(response.data.status)) {
				pause();
			}
		} catch {
			hasError.value = true;
			pause();
		}
	};

	const { pause, resume } = useTimeoutPoll(fetchJob, POLL_INTERVAL_MS, { immediate: false });

	const startImport = async (link: string, targetType: BoardImportTargetType, targetId: string): Promise<void> => {
		hasError.value = false;
		isStarting.value = true;

		try {
			const response = await boardImportApi.boardImportControllerStartImport({ link, targetType, targetId });
			job.value = response.data;
			resume();
		} catch {
			hasError.value = true;
		} finally {
			isStarting.value = false;
		}
	};

	const reset = (): void => {
		pause();
		job.value = undefined;
		hasError.value = false;
	};

	return { job, hasError, isStarting, startImport, reset };
};
