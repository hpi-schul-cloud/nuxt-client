import { filterOpenTasks, mapDoneTask, mapOpenTask, mapTopic, unwrapList } from "./course-group.mapper";
import { CourseGroupTasks, CourseGroupTopic, V1Homework, V1Lesson, V1Paginated, V1Submission } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { LessonApiFactory } from "@api-server";

export const useCourseGroupDetails = () => {
	const { t } = useI18nGlobal();
	const lessonApi = LessonApiFactory(undefined, "/v3", $axios);

	const { execute: execFetch, isRunning: isFetching } = useSafeAxiosTask();
	const { execute: execMutate, isRunning: isMutating } = useSafeAxiosTask();

	const fetchTopics = async (groupId: string): Promise<CourseGroupTopic[]> => {
		const { result, success } = await execFetch(
			() =>
				$axios.get<V1Paginated<V1Lesson>>("/v1/lessons", {
					params: { courseGroupId: groupId, $sort: "position" },
				}),
			t("common.notifications.errors.notLoaded", { type: t("common.words.topics") })
		);

		return success ? unwrapList(result.data).map(mapTopic) : [];
	};

	const deleteTopic = async (topicId: string): Promise<boolean> => {
		const { success } = await execMutate(
			() => lessonApi.lessonControllerDelete(topicId),
			t("common.notifications.errors.notDeleted", { type: t("common.words.topic") })
		);

		return success;
	};

	const fetchGroupTasks = async (groupId: string, courseId: string, groupSize: number): Promise<CourseGroupTasks> => {
		const { result, success } = await execFetch(
			() =>
				Promise.all([
					$axios.get<V1Paginated<V1Submission>>("/v1/submissions", {
						params: { courseGroupId: groupId, $populate: ["homeworkId"] },
					}),
					$axios.get<V1Paginated<V1Homework>>("/v1/homework", { params: { courseId } }),
				]),
			t("common.notifications.errors.notLoaded", { type: t("common.words.tasks") })
		);

		if (!success) return { done: [], open: [] };

		const [submissionsResponse, homeworkResponse] = result;
		const doneSubmissions = unwrapList(submissionsResponse.data).filter((submission) => submission.homeworkId);
		const homeworks = unwrapList(homeworkResponse.data);

		return {
			done: doneSubmissions.map(mapDoneTask),
			open: filterOpenTasks(homeworks, doneSubmissions, groupSize).map(mapOpenTask),
		};
	};

	return { fetchTopics, deleteTopic, fetchGroupTasks, isFetching, isMutating };
};
