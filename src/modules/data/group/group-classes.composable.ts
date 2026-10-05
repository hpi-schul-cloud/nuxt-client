import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { Pagination } from "@/types/common/commons";
import { SortOrder } from "@/types/enum/sort-order.enum";
import { $axios } from "@/utils/api";
import { ClassSortQueryType, GroupApiFactory, SchoolYearQueryType } from "@api-server";
import { ClassInfo, GroupMapper } from "@data-group";
import { ref } from "vue";

export const useGroupClasses = () => {
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
	const { execute: execMutate, isRunning: isMutating } = useSafeAxiosTask();

	const fetchClassById = async (classId: string) => {
		const { result, success } = await execFetch(
			() => $axios.get(`/v1/classes/${classId}`),
			t("error.load")
		);

		return success && result ? result.data : undefined;
	};

	const createClass = async (payload: {
		name: string;
		gradeLevel?: number;
		year?: string;
		teacherIds?: string[];
	}) => {
		const { result, success } = await execMutate(
			() => $axios.post("/v1/classes", payload),
			t("common.notifications.errors.notCreated", { type: t("common.labels.class") })
		);

		return { success, data: result?.data };
	};

	const updateClass = async (
		classId: string,
		payload: {
			name: string;
			gradeLevel?: number;
			year?: string;
			teacherIds?: string[];
		}
	) => {
		const { result, success } = await execMutate(
			() => $axios.patch(`/v1/classes/${classId}`, payload),
			t("common.notifications.errors.notSaved", { type: t("common.labels.class") })
		);

		return { success, data: result?.data };
	};

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
		fetchClassById,
		createClass,
		updateClass,
		deleteClass,
		fetchClassesForSchool,
		classes,
		isFetching,
		isMutating,
		pagination,
		page,
		sortBy,
		sortOrder,
	};
};
