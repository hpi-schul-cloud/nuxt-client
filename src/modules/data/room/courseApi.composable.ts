import { CoursesApiFactory, CourseStatusQueryType } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

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

	const buildArchiveQuery = (courseStatusQueryType: CourseStatusQueryType) => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		let archiveQuery = {};
		if (courseStatusQueryType === CourseStatusQueryType.CURRENT) {
			archiveQuery = {
				$or: [
					{ untilDate: { $exists: false } },
					{ untilDate: null },
					{ untilDate: { $gte: yesterday } },
				],
			};
		}
		if (courseStatusQueryType === CourseStatusQueryType.ARCHIVE) {
			archiveQuery = { untilDate: { $lt: yesterday } };
		}
		return archiveQuery;
	};

	const loadCoursesForSchool = async (
		courseStatusQueryType: CourseStatusQueryType,
		limit: number,
		skip: number,
		key: string | undefined,
		order: number
	) => {
		//const archiveQuery =
		buildArchiveQuery(courseStatusQueryType);

		const query = {
			//$and: [archiveQuery],
			$populate: ["classIds", "teacherIds"],
			$limit: limit,
			$skip: skip,
			$sort: { key, order },
		};

		//const response = await $axios.get("/v1/courses", {
		//	params: query,
		//});

		console.log(query);

		//return response.data;

		return {};
	};

	return {
		stopSynchronization,
		startSynchronization,
		loadCoursesForSchool,
	};
};
