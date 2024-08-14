import { CourseStatusQueryType } from "@/serverApi/v3";
import { BusinessError, Pagination } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useCourseApi } from "./courseApi.composable";
import { CourseInfo } from "./type/course-info";

export const useCourseList = () => {
	const { loadCoursesForSchool } = useCourseApi();
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

	const courses: Ref<CourseInfo[]> = ref([]);
	const pagination: Ref<Pagination> = ref({ total: 0, limit: 10, skip: 0 });
	const page: Ref<number> = ref(1);
	const key: Ref<string | undefined> = ref();
	const sortOrder: Ref<boolean | "asc" | "desc"> = ref("asc");
	const currentPage: Ref<number> = ref(1);

	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();

	const setSortBy = (sortBy: string | undefined) => {
		key.value = sortBy;
	};

	const setSortOrder = (order: boolean | "asc" | "desc") => {
		sortOrder.value = order;
	};

	const setCurrentPage = (page: number) => {
		currentPage.value = page;
	};

	const setPagination = (paginationData: Pagination) => {
		pagination.value = paginationData;
	};

	const fetchCourses = async (
		courseStatusQueryType: CourseStatusQueryType
	): Promise<void> => {
		isLoading.value = true;

		const order: number = sortOrder.value === "desc" ? -1 : 1;

		try {
			const response = await loadCoursesForSchool(
				courseStatusQueryType,
				pagination.value.limit,
				pagination.value.skip,
				key.value,
				order
			);

			console.log(response);

			/*courses.value = response.data.map((course: any) => {
				return CourseInfoMapper.mapToCourseInfo(course);
			});*/

			courses.value.push(
				new CourseInfo({
					id: "3243433",
					name: "mathe",
					teacherNames: ["Hans", "Wurst", "Greta", "Tuna"],
					classNames: ["class1", "class2", "class3"],
					syncedWithGroup: "Group",
				}),
				new CourseInfo({
					id: "222223243433",
					name: "mathe1",
					teacherNames: ["Hansss", "Wurstttt", "Gretaaaa", "Tunaaaaa"],
					classNames: ["class1", "class2", "class3"],
					syncedWithGroup: "Group",
				}),
				new CourseInfo({
					id: "0000dcfbfb5c7a3f00bf21ab",
					name: "Matheerdfyg",
					teacherNames: ["Lehrer", "Lehrer 1", "Lehrer 2"],
					classNames: ["Klasse1", "Klasse2"],
				})
			);

			//	pagination.value.total = response.data.total;
			pagination.value.total = courses.value.length;
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
		pagination,
		page,
		courses,
		currentPage,
		setPagination,
		setCurrentPage,
		setSortBy,
		setSortOrder,
		fetchCourses,
	};
};
