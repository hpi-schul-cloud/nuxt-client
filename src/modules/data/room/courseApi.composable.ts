import { CoursesApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useCourseApi = () => {
	const courseApi = CoursesApiFactory(undefined, "/v3", $axios);

	const stopSynchronization = async (courseId: string): Promise<void> => {
		await courseApi.courseControllerStopSynchronization(courseId);
	};

	const startSynchronization = async (courseId: string, groupId: string): Promise<void> => {
		await courseApi.courseControllerStartSynchronization(courseId, { groupId });
	};

	const deleteCourseById = async (id: string) => {
		await $axios.delete(`v1/courses/${id}`);
	};

	return {
		stopSynchronization,
		startSynchronization,
		deleteCourseById,
	};
};
