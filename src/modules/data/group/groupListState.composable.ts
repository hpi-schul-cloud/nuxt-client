import { GroupListFilter } from "./types";
import { GroupListResponse, GroupResponse } from "@/serverApi/v3";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { useGroupApi } from "@data-group";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useGroupListState = () => {
	const { getGroups } = useGroupApi();
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

	const groups: Ref<GroupResponse[]> = ref([]);
	const total: Ref<number> = ref(0);
	const limit: Ref<number> = ref(10);
	const skip: Ref<number> = ref(0);

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();

	const fetchGroups = async (filter?: GroupListFilter, options?: { append: boolean }): Promise<void> => {
		isLoading.value = true;

		try {
			const response: GroupListResponse = await getGroups({ limit: limit.value, skip: skip.value }, filter);

			total.value = response.total;

			if (options?.append) {
				groups.value.push(...response.data);
			} else {
				groups.value = response.data;
			}
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
