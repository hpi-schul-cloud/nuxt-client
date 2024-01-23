import { ref, Ref } from "vue";
import { Group, useGroupApi } from "@data-group";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { BusinessError } from "@/store/types/commons";
import { useI18n } from "@/composables/i18n.composable";

export const useGroupState = () => {
	const { getGroup } = useGroupApi();
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

	const isLoading: Ref<boolean> = ref(false);
	const group: Ref<Group | undefined> = ref();
	const error: Ref<BusinessError | undefined> = ref();

	const fetchGroup = async (groupId: string): Promise<void> => {
		isLoading.value = true;

		try {
			const fetchedGroup: Group = await getGroup(groupId);
			group.value = fetchedGroup;
		} catch (errorResponse) {
			const apiError = mapAxiosErrorToResponseError(errorResponse);

			error.value = {
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			};

			notifierModule.show({
				text: t("error.load"),
				status: "error",
			});
		}

		isLoading.value = false;
	};

	return {
		isLoading,
		group,
		fetchGroup,
	};
};
