import {
	CourseInfoApiFactory,
	CourseSortQueryType,
	CourseStatusQueryType,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useCourseInfoApi = () => {
	const courseInfoApi = CourseInfoApiFactory(undefined, "/v3", $axios);

	const loadCoursesForSchool = async (
		courseStatusQueryType: CourseStatusQueryType,
		limit: number,
		skip: number,
		key: CourseSortQueryType | undefined,
		order: "asc" | "desc"
	) => {
		const response =
			await courseInfoApi.courseInfoControllerGetCoursesForSchool(
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
