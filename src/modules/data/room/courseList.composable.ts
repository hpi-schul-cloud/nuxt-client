import { useCourseApi } from "./courseApi.composable";
import { useCourseInfoApi } from "./courseInfoApi.composable";
import { CourseInfoDataResponse, CourseSortProps, CourseStatus } from "@/serverApi/v3";
import { BusinessError, Pagination } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { notifyError } from "@data-app";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useCourseList = () => {
	const { deleteCourseById } = useCourseApi();
	const { loadCoursesForSchool } = useCourseInfoApi();

	const { t } = useI18n();

	const courses: Ref<CourseInfoDataResponse[]> = ref([]);
	const pagination: Ref<Pagination> = ref({ total: 0, limit: 10, skip: 0 });
	const page: Ref<number> = ref(1);
	const key: Ref<CourseSortProps | undefined> = ref();
	const sortOrder: Ref<"asc" | "desc"> = ref("asc");
	const withoutTeacher: Ref<boolean> = ref(false);

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();

	const setSortBy = (sortBy: CourseSortProps | undefined) => {
		key.value = sortBy;
	};

	const setSortOrder = (order: "asc" | "desc") => {
		sortOrder.value = order;
	};

	const setPage = (currentPage: number) => {
		page.value = currentPage;
	};

	const setPagination = (paginationData: Pagination) => {
		pagination.value = paginationData;
	};

	const fetchCourses = async (courseStatusQueryType: CourseStatus): Promise<void> => {
		isLoading.value = true;

		try {
			const response = await loadCoursesForSchool(
				courseStatusQueryType,
				withoutTeacher.value,
				pagination.value.limit,
				pagination.value.skip,
				key.value,
				sortOrder.value
			);

			courses.value = response.data.data;

			pagination.value.limit = response.data.limit;
			pagination.value.skip = response.data.skip;
			pagination.value.total = response.data.total;
		} catch (errorResponse) {
			handleError(errorResponse);
		}

		isLoading.value = false;
	};

	const deleteCourse = async (id: string) => {
		isLoading.value = true;

		try {
			const deletedCourse = await deleteCourseById(id);
			isLoading.value = false;

			return deletedCourse;
		} catch (errorResponse) {
			handleError(errorResponse);
			isLoading.value = false;
		}
	};

	const handleError = (errorResponse: unknown) => {
		const apiError = mapAxiosErrorToResponseError(errorResponse);

		error.value = {
			error: apiError,
			statusCode: apiError.code,
			message: apiError.message,
		};

		notifyError(t("error.load"));
	};

	return {
		isLoading,
		pagination,
		page,
		courses,
		error,
		key,
		sortOrder,
		withoutTeacher,
		setPagination,
		setPage,
		setSortBy,
		setSortOrder,
		fetchCourses,
		deleteCourse,
	};
};
