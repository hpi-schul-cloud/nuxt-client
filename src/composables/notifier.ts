import NotifierModule from "@/store/notifier";
import { AlertPayload } from "@/store/types/alert-payload";
import { inject } from "@vue/composition-api";

export function useNotifier() {
	const notifierModule = inject<NotifierModule>("notifierModule");

	const showNotifier = (payload: AlertPayload) => {
		if (notifierModule === undefined) return;

		notifierModule.show(payload);
	};

	return {
		showNotifier,
	};
}
