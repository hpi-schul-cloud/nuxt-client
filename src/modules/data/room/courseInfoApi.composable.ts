import { $axios } from "@/utils/api";
import { CourseInfoApiFactory, CourseSortProps, CourseStatus } from "@api-server";

export const useCourseInfoApi = () => {
	const courseInfoApi = CourseInfoApiFactory(undefined, "/v3", $axios);

	const loadCoursesForSchool = async (
		courseStatusQueryType: CourseStatus,
		withoutTeacher: boolean,
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
			courseStatusQueryType,
			withoutTeacher
		);

		return response;
	};

	return {
		loadCoursesForSchool,
	};
};
