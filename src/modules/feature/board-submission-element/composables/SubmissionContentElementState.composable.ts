import { StudentSubmission, TeacherSubmission } from "../types/submission";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { SubmissionsResponse } from "@/serverApi/v3";
import { computed, onMounted, Ref, ref, watch } from "vue";

export const useSubmissionContentElementState = (id: string, modelValue: Ref<{ dueDate?: string }>) => {
	const { notifyWithTemplate } = useErrorHandler();
	const { fetchSubmissionItemsCall, createSubmissionItemCall, updateSubmissionItemCall } = useSubmissionItemApi();
	let submissionsResponse: SubmissionsResponse = {
		submissionItemsResponse: [],
		users: [],
	};
	const submissions = ref<Array<TeacherSubmission>>([]);
	const studentSubmission = ref<StudentSubmission>({ completed: false });
	const loading = ref(false);

	const fetchSubmissionItems = async (id: string): Promise<void> => {
		try {
			loading.value = true;
			submissionsResponse = await fetchSubmissionItemsCall(id);

			submissions.value = mapTeacherSubmission(submissionsResponse);
			studentSubmission.value = mapStudentSubmission(submissionsResponse);
		} catch {
			notifyWithTemplate("notLoaded", "boardElement")();
		} finally {
			loading.value = false;
		}
	};

	const createSubmissionItem = async (completed: boolean) => {
		try {
			const response = await createSubmissionItemCall(id, completed);
			submissionsResponse.submissionItemsResponse.push(response);
		} catch {
			notifyWithTemplate("notCreated", "boardElement")();
		}
	};

	const updateSubmissionItem = async (completed: boolean) => {
		if (submissionsResponse.submissionItemsResponse.length === 0) {
			await createSubmissionItem(completed);
			return;
		}
		try {
			await updateSubmissionItemCall(submissionsResponse.submissionItemsResponse[0].id, completed);
			submissionsResponse.submissionItemsResponse[0].completed = completed;
		} catch {
			notifyWithTemplate("notUpdated", "boardElement")();
		}
	};

	onMounted(() => {
		fetchSubmissionItems(id);
	});

	watch(
		() => modelValue.value.dueDate,
		() => {
			submissions.value = mapTeacherSubmission(submissionsResponse);
			studentSubmission.value = mapStudentSubmission(submissionsResponse);
		}
	);

	const isOverdue = computed(() => {
		if (!modelValue.value.dueDate) {
			return false;
		}
		return new Date() > new Date(modelValue.value.dueDate);
	});

	const sortByName = (submissionA: TeacherSubmission, submissionB: TeacherSubmission) => {
		const lastNameA = submissionA.lastName.toUpperCase();
		const lastNameB = submissionB.lastName.toUpperCase();
		if (lastNameA < lastNameB) {
			return -1;
		}
		if (lastNameA > lastNameB) {
			return 1;
		}

		return 0;
	};

	const mapStudentSubmission = (submissionsResponse: SubmissionsResponse) => {
		if (submissionsResponse.submissionItemsResponse.length === 0) {
			return { completed: false };
		}

		const completionState = submissionsResponse.submissionItemsResponse[0].completed;
		return { completed: completionState };
	};

	const mapTeacherSubmission = (submissionsResponse: SubmissionsResponse) =>
		submissionsResponse.users
			.map((student) => {
				const submissionInfo: Partial<TeacherSubmission> = {
					firstName: student.firstName,
					lastName: student.lastName,
				};

				const submission = submissionsResponse.submissionItemsResponse.find(
					(submission) => submission.userId === student.userId
				);

				if (!submission) {
					submissionInfo.status = !isOverdue.value ? "open" : "expired";
					return submissionInfo as TeacherSubmission;
				}

				if (submission.completed) {
					submissionInfo.status = "completed";
				}
				if (!submission.completed && !isOverdue.value) {
					submissionInfo.status = "open";
				}
				if (!submission.completed && isOverdue.value) {
					submissionInfo.status = "expired";
				}

				return submissionInfo as TeacherSubmission;
			})
			.sort(sortByName);

	return {
		submissions,
		studentSubmission,
		fetchSubmissionItems,
		updateSubmissionItem,
		loading,
		isOverdue,
	};
};
