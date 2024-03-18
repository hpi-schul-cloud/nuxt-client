import { GroupEntryResponse } from "@/serverApi/v3";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { useGroupApi } from "@data-group";
import { ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { GroupListFilter } from "./types";

export const useGroupListState = () => {
	const { getGroups } = useGroupApi();
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

	const groups: Ref<GroupEntryResponse[]> = ref([]);
	const total: Ref<number> = ref(0);
	const limit: Ref<number> = ref(10);
	const skip: Ref<number> = ref(0);

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();

	const fetchGroups = async (options?: GroupListFilter): Promise<void> => {
		isLoading.value = true;

		try {
			groups.value = await getGroups(options);
		} catch (errorResponse) {
			handleError(errorResponse);
		}

		isLoading.value = false;
	};

	const handleError = (errorResponse: unknown) => {
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
	};

	return {
		isLoading,
		groups,
		total,
		skip,
		limit,
		fetchGroups,
	};
};
