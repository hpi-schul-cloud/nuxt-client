import { useBoardNotifier } from "@util-board";
import { useI18n } from "vue-i18n";
import { useDocumentVisibility } from "@vueuse/core";
import { useTimeoutFn } from "@vueuse/shared";
import { ref, watch } from "vue";

export const connectionOptions = {
	isTimeoutReached: false,
	MAX_TIMEOUT_FOR_INACTIVITY: 15 * 60 * 1000,
};

export const usePageInactivity = (
	maxInactivityTime: number = connectionOptions.MAX_TIMEOUT_FOR_INACTIVITY
) => {
	const { t } = useI18n();
	const { showInfo } = useBoardNotifier();

	const timeoutFn = useTimeoutFn(() => {
		connectionOptions.isTimeoutReached = true;
	}, maxInactivityTime);

	const visibility = ref(useDocumentVisibility());

	watch(visibility, (current, previous) => {
		if (timeoutFn.isPending) timeoutFn.stop();

		if (current === "visible" && previous === "hidden") {
			if (connectionOptions.isTimeoutReached) {
				showInfo(t("common.notification.reload.page"));
			}
			timeoutFn.stop();
			connectionOptions.isTimeoutReached = false;
			return;
		}

		timeoutFn.start();
	});

	return { visibility };
};
