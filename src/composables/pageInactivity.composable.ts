import { useBoardNotifier } from "@util-board";
// import { useI18n } from "vue-i18n";
import { useDocumentVisibility } from "@vueuse/core";
import { useTimeoutFn } from "@vueuse/shared";
import { MaybeRefOrGetter, watch } from "vue";

export const connectionOptions = {
	isTimeoutReached: false,
	MAX_TIME_OUT_FOR_INACTIVITY: 15 * 60 * 1000,
};

export const usePageInactivity = (
	time: MaybeRefOrGetter<number> = connectionOptions.MAX_TIME_OUT_FOR_INACTIVITY
) => {
	// const { t } = useI18n();
	const { showInfo } = useBoardNotifier();

	const timeoutFn = useTimeoutFn(() => {
		connectionOptions.isTimeoutReached = true;
	}, time);

	const visibility = useDocumentVisibility();

	watch(visibility, (current, previous) => {
		if (timeoutFn.isPending) timeoutFn.stop();

		if (current === "visible" && previous === "hidden") {
			if (connectionOptions.isTimeoutReached) {
				showInfo("You should reload the page to get the latest data"); // should be i18n key
			}
			timeoutFn.stop();
			connectionOptions.isTimeoutReached = false;
			return;
		}

		timeoutFn.start();
	});
};
