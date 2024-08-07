import { SchoolYearQueryType } from "@/serverApi/v3";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useCourseApi } from "./courseApi.composable";
import { CourseInfo } from "./type/course-info";
import { CourseInfoMapper } from "./course-info.mapper";

export const useCourseList = () => {
	const { loadCoursesForSchool } = useCourseApi();
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

	const courses: Ref<CourseInfo[]> = ref([]);
	const total: Ref<number> = ref(0);
	const limit: Ref<number> = ref(10);
	const skip: Ref<number> = ref(0);

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();

	const fetchCourses = async (
		schoolYear: SchoolYearQueryType,
		sortItem: { key: string; order: any }
	): Promise<void> => {
		isLoading.value = true;

		sortItem.order = sortItem.order === "desc" ? -1 : 1;

		try {
			const response = await loadCoursesForSchool(
				schoolYear,
				limit.value,
				skip.value,
				sortItem
			);

			courses.value = response.data.data.map((course: any) => {
				return CourseInfoMapper.mapToCourseInfo(course);
			});

			total.value = response.data.total;
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
		total,
		skip,
		limit,
		fetchCourses,
	};
};
