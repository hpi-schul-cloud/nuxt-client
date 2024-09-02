import {
	CourseInfoApiFactory,
	CourseSortProps,
	CourseStatus,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useCourseInfoApi = () => {
	const courseInfoApi = CourseInfoApiFactory(undefined, "/v3", $axios);

	const loadCoursesForSchool = async (
		courseStatusQueryType: CourseStatus,
		limit: number,
		skip: number,
		key: CourseSortProps | undefined,
		order: "asc" | "desc"
	) => {
		const response = await courseInfoApi.courseInfoControllerGetCourseInfo(
			skip,
			limit,
			order,
			key,
			courseStatusQueryType
		);

		return response;
	};

	return {
		loadCoursesForSchool,
	};
};
