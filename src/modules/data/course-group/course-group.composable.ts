import { mapCourse, mapCourseGroup, unwrapList } from "./course-group.mapper";
import { CourseGroup, CourseGroupCourse, CourseGroupPayload, V1Course, V1CourseGroup, V1Paginated } from "./types";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { Permission } from "@api-server";
import { useAppStore } from "@data-app";
import { computed } from "vue";

export const useCourseGroups = () => {
	const { t } = useI18nGlobal();
	const appStore = useAppStore();

	const { execute: execFetch, isRunning: isFetching } = useSafeAxiosTask();
	const { execute: execMutate, isRunning: isMutating } = useSafeAxiosTask();

	const groupLabel = computed(() => t("pages.courseRoomDetails.groups.group"));

	// Users without COURSE_EDIT (students) only see and manage their own groups; the server does not enforce this
	const canSeeAllGroups = computed(() => appStore.userPermissions.includes(Permission.COURSE_EDIT));
	const currentUserId = computed(() => appStore.user?.id);

	const withCurrentUser = (userIds: string[]): string[] => {
		const userId = currentUserId.value;
		if (canSeeAllGroups.value || !userId || userIds.includes(userId)) {
			return userIds;
		}

		return [...userIds, userId];
	};

	const fetchGroups = async (courseId: string): Promise<CourseGroup[]> => {
		const { result, success } = await execFetch(
			() =>
				$axios.get<V1Paginated<V1CourseGroup>>("/v1/courseGroups", {
					params: { courseId, $populate: ["userIds"], $limit: false },
				}),
			t("common.notifications.errors.notLoaded", { type: groupLabel.value })
		);

		if (!success) return [];

		const groups = unwrapList(result.data).map(mapCourseGroup);

		return canSeeAllGroups.value
			? groups
			: groups.filter((group) => group.members.some((member) => member.id === currentUserId.value));
	};

	const fetchGroup = async (groupId: string): Promise<CourseGroup | undefined> => {
		const { result, success } = await execFetch(
			() => $axios.get<V1CourseGroup>(`/v1/courseGroups/${groupId}`, { params: { $populate: ["userIds"] } }),
			t("common.notifications.errors.notLoaded", { type: groupLabel.value })
		);

		return success ? mapCourseGroup(result.data) : undefined;
	};

	const fetchCourse = async (courseId: string): Promise<CourseGroupCourse | undefined> => {
		const { result, success } = await execFetch(
			() => $axios.get<V1Course>(`/v1/courses/${courseId}`, { params: { $populate: ["userIds", "teacherIds"] } }),
			t("common.notifications.errors.notLoaded", { type: t("common.labels.course") })
		);

		return success ? mapCourse(result.data) : undefined;
	};

	const createGroup = async (courseId: string, payload: CourseGroupPayload): Promise<CourseGroup | undefined> => {
		const { result, success } = await execMutate(
			() =>
				$axios.post<V1CourseGroup>("/v1/courseGroups", {
					name: payload.name,
					courseId,
					schoolId: appStore.school?.id,
					userIds: withCurrentUser(payload.userIds),
				}),
			t("common.notifications.errors.notCreated", { type: groupLabel.value })
		);

		return success ? mapCourseGroup(result.data) : undefined;
	};

	// Only name and members change; the group never moves to another course
	const updateGroup = async (groupId: string, payload: CourseGroupPayload): Promise<boolean> => {
		const { success } = await execMutate(
			() =>
				$axios.patch(`/v1/courseGroups/${groupId}`, {
					name: payload.name,
					userIds: withCurrentUser(payload.userIds),
				}),
			t("common.notifications.errors.notSaved", { type: groupLabel.value })
		);

		return success;
	};

	const deleteGroup = async (groupId: string): Promise<boolean> => {
		const { success } = await execMutate(
			() => $axios.delete(`/v1/courseGroups/${groupId}`),
			t("common.notifications.errors.notDeleted", { type: groupLabel.value })
		);

		return success;
	};

	return {
		canSeeAllGroups,
		fetchGroups,
		fetchGroup,
		fetchCourse,
		createGroup,
		updateGroup,
		deleteGroup,
		isFetching,
		isMutating,
	};
};
