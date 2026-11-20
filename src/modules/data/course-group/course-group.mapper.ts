import {
	CourseGroup,
	CourseGroupCourse,
	CourseGroupMember,
	CourseGroupTask,
	CourseGroupTopic,
	V1Course,
	V1CourseGroup,
	V1Homework,
	V1Lesson,
	V1Paginated,
	V1Submission,
	V1User,
} from "./types";

const ONE_DAY_IN_MS = 864e5;
const DESCRIPTION_MAX_LENGTH = 140;

export const unwrapList = <T>(response: V1Paginated<T>): T[] => (Array.isArray(response) ? response : response.data);

const isPopulatedUser = (user: V1User | string): user is V1User => typeof user === "object" && user !== null;

export const mapMember = (user: V1User): CourseGroupMember => {
	const firstName = user.firstName ?? "";
	const lastName = user.lastName ?? "";

	return { id: user._id, firstName, lastName, fullName: `${firstName} ${lastName}`.trim() };
};

const mapMembers = (users: (V1User | string)[] = []): CourseGroupMember[] =>
	users.filter(isPopulatedUser).map(mapMember);

export const mapCourseGroup = (group: V1CourseGroup): CourseGroup => ({
	id: group._id,
	name: group.name,
	courseId: typeof group.courseId === "string" ? group.courseId : group.courseId._id,
	members: mapMembers(group.userIds),
});

// Same rule as the server's isArchived virtual, which the v1 JSON response does not always include
export const isCourseArchived = (course: V1Course, now = Date.now()): boolean => {
	if (course.isArchived !== undefined) {
		return course.isArchived;
	}

	return course.untilDate !== undefined && new Date(course.untilDate).getTime() <= now - ONE_DAY_IN_MS;
};

export const mapCourse = (course: V1Course): CourseGroupCourse => ({
	id: course._id,
	name: course.name,
	color: course.color,
	isArchived: isCourseArchived(course),
	students: mapMembers(course.userIds),
	teachers: mapMembers(course.teacherIds),
});

export const mapTopic = (lesson: V1Lesson): CourseGroupTopic => ({ id: lesson._id, name: lesson.name });

export const toPlainText = (html = "", maxLength = DESCRIPTION_MAX_LENGTH): string => {
	const text = new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";

	return text.trim().substring(0, maxLength);
};

export const mapDoneTask = (submission: V1Submission): CourseGroupTask => ({
	homeworkId: submission.homeworkId._id,
	name: submission.homeworkId.name,
	description: toPlainText(submission.homeworkId.description),
	date: submission.updatedAt,
	url: `/homework/${submission.homeworkId._id}/#activetabid=submission`,
});

export const mapOpenTask = (homework: V1Homework): CourseGroupTask => ({
	homeworkId: homework._id,
	name: homework.name,
	description: toPlainText(homework.description),
	date: homework.dueDate,
	url: `/homework/${homework._id}`,
});

// Team tasks this group can still submit: same filter as the legacy group page
export const filterOpenTasks = (
	homeworks: V1Homework[],
	doneSubmissions: V1Submission[],
	groupSize: number
): V1Homework[] => {
	const doneHomeworkIds = new Set(doneSubmissions.map((submission) => submission.homeworkId._id));

	return homeworks.filter(
		(homework) =>
			homework.teamSubmissions && (homework.maxTeamMembers ?? 0) >= groupSize && !doneHomeworkIds.has(homework._id)
	);
};
