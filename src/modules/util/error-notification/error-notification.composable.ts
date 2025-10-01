import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { Ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const useErrorNotification = (error: Ref<unknown | undefined | null>) => {
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
	const { t } = useI18n();

	watch(error, (value, oldValue) => {
		if (value && value !== oldValue) {
			notifierModule.show({
				status: "error",
				text: t("error.generic"),
			});
		}
	});
};
