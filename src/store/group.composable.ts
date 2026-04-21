import { ClassInfo } from "./types/class-info";
import { Pagination } from "./types/commons";
import { SortOrder } from "./types/sort-order.enum";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { ClassSortQueryType, GroupApiFactory, SchoolYearQueryType } from "@api-server";
import { GroupMapper } from "@data-group";
import { ref } from "vue";

// TODO: where to move this file? modules/data/??  group? administration? classes?
export const useGroup = () => {
	const { t } = useI18nGlobal();
	const groupApi = GroupApiFactory(undefined, "/v3", $axios);

	const classes = ref<ClassInfo[]>([]);

	const pagination = ref<Pagination>({
		limit: 10,
		skip: 0,
		total: 0,
	});
	const page = ref(1);
	const sortBy = ref<ClassSortQueryType | undefined>(ClassSortQueryType.NAME);
	const sortOrder = ref<SortOrder>(SortOrder.ASC);

	const { execute: execDelete } = useSafeAxiosTask();
	const { execute: execFetch, isRunning: isFetching } = useSafeAxiosTask();

	const deleteClass = async (deleteQuery: { classId: string; query?: SchoolYearQueryType }): Promise<void> => {
		const { success } = await execDelete(
			() => $axios.delete(`/v1/classes/${deleteQuery.classId}`),
			t("common.notifications.errors.notDeleted", { type: t("common.labels.class") })
		);

		if (success) {
			await fetchClassesForSchool({ schoolYearQuery: deleteQuery.query });
		}
	};

	const fetchClassesForSchool = async (data?: { schoolYearQuery?: SchoolYearQueryType }): Promise<void> => {
		const { result, success } = await execFetch(
			() =>
				groupApi.groupControllerFindClasses(
					pagination.value.skip,
					pagination.value.limit,
					sortOrder.value,
					sortBy.value,
					data?.schoolYearQuery
				),
			t("error.load")
		);

		if (success && result) {
			pagination.value = {
				limit: result.data.limit,
				skip: result.data.skip,
				total: result.data.total,
			};

			classes.value = GroupMapper.mapToClassInfo(result.data.data);
		}
	};

	return {
		deleteClass,
		fetchClassesForSchool,
		classes,
		isFetching,
		pagination,
		page,
		sortBy,
		sortOrder,
	};
};
