import {
	CoursesApiFactory,
	CourseSortQueryType,
	CourseStatusQueryType,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { envConfigModule } from "../../../store";

export const useCourseApi = () => {
	const courseApi = CoursesApiFactory(undefined, "/v3", $axios);

	const stopSynchronization = async (courseId: string): Promise<void> => {
		await courseApi.courseControllerStopSynchronization(courseId);
	};

	const startSynchronization = async (
		courseId: string,
		groupId: string
	): Promise<void> => {
		await courseApi.courseControllerStartSynchronization(courseId, { groupId });
	};

	const loadCoursesForSchool = async (
		courseStatusQueryType: CourseStatusQueryType,
		limit: number,
		skip: number,
		key: CourseSortQueryType | undefined,
		order: "asc" | "desc"
	) => {
		const response = await courseApi.courseControllerGetAllCourses(
			skip,
			limit,
			order,
			key,
			courseStatusQueryType
		);

		return response;
	};

	const deleteCourseById = async (id: string) => {
		if (envConfigModule.getEnv.CALENDAR_SERVICE_ENABLED) {
			await $axios.delete(`v1/calendar/courses/${id}`);
		}
		await $axios.delete(`v1/courses/${id}`);
	};

	return {
		stopSynchronization,
		startSynchronization,
		loadCoursesForSchool,
		deleteCourseById,
	};
};
