import { notifyError } from "@data-app";
import { Ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const useErrorNotification = (error: Ref<unknown | undefined | null>) => {
	const { t } = useI18n();

	watch(error, (value, oldValue) => {
		if (value && value !== oldValue) {
			notifyError(t("error.generic"));
		}
	});
};
