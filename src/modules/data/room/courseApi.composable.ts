import { CoursesApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useCourseApi = () => {
	const courseApi = CoursesApiFactory(undefined, "/v3", $axios);

	const stopSynchronization = async (courseId: string): Promise<void> => {
		await courseApi.courseControllerStopSynchronization(courseId);
	};

	return {
		stopSynchronization,
	};
};
