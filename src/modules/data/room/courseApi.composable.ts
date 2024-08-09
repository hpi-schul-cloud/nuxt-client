import { CoursesApiFactory, SchoolYearQueryType } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useCourseApi = () => {
	const courseApi = CoursesApiFactory(undefined, "/v3", $axios);

	const stopSynchronization = async (courseId: string): Promise<void> => {
		await courseApi.courseControllerStopSynchronization(courseId);
	};

	const buildArchiveQuery = (schoolyear: SchoolYearQueryType) => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		let archiveQuery = {};
		if (schoolyear === SchoolYearQueryType.CurrentYear) {
			archiveQuery = {
				$or: [
					{ untilDate: { $exists: false } },
					{ untilDate: null },
					{ untilDate: { $gte: yesterday } },
				],
			};
		}
		if (schoolyear === SchoolYearQueryType.PreviousYears) {
			archiveQuery = { untilDate: { $lt: yesterday } };
		}
		return archiveQuery;
	};

	const loadCoursesForSchool = async (
		schoolYear: SchoolYearQueryType,
		limit: number,
		skip: number,
		key: string | undefined,
		order: number
	) => {
		//const archiveQuery =
		buildArchiveQuery(schoolYear);

		const query = {
			//$and: [archiveQuery],
			$populate: ["classIds", "teacherIds"],
			$limit: limit,
			$skip: skip,
			$sort: { key, order },
		};

		const response = await $axios.get("/v1/courses", {
			params: query,
		});

		console.log(response);

		return response.data;
	};

	return {
		stopSynchronization,
		loadCoursesForSchool,
	};
};
