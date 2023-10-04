import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ref, computed, onMounted } from "vue";
import { authModule } from "@/store";
import { SubmissionsResponse } from "@/serverApi/v3";
import {
	TeacherViewSubmission,
	StudentViewSubmission,
} from "../types/submission";

export const useSubmissionContentElementState = (
	id: string,
	dueDate?: string
) => {
	const { notifyWithTemplate } = useErrorHandler();
	const {
		fetchSubmissionItemsCall,
		createSubmissionItemCall,
		updateSubmissionItemCall,
	} = useSubmissionItemApi();
	const submissionsResponse = ref<SubmissionsResponse>({
		submissionItemsResponse: [],
		users: [],
	});
	const submissions = ref<Array<TeacherViewSubmission | StudentViewSubmission>>(
		[]
	);
	const loading = ref(true);

	const fetchSubmissionItems = async (id: string): Promise<void> => {
		try {
			const response = await fetchSubmissionItemsCall(id);
			submissions.value = mapSubmissionResponse(response);
		} catch (error) {
			notifyWithTemplate("notLoaded", "boardElement")();
		} finally {
			loading.value = false;
		}
	};

	const createSubmissionItem = async (completed: boolean) => {
		try {
			const response = await createSubmissionItemCall(id, completed);
			submissionsResponse.value.submissionItemsResponse.push(response);
		} catch (error) {
			notifyWithTemplate("notCreated", "boardElement")();
		}
	};

	const updateSubmissionItem = async (completed: boolean) => {
		if (submissionsResponse.value.submissionItemsResponse.length === 0) {
			await createSubmissionItem(completed);
			return;
		}
		try {
			await updateSubmissionItemCall(
				submissionsResponse.value.submissionItemsResponse[0].id,
				completed
			);
			submissionsResponse.value.submissionItemsResponse[0].completed =
				completed;
		} catch (error) {
			notifyWithTemplate("notUpdated", "boardElement")();
		}
	};

	const isStudent = computed(() => {
		return authModule.getUserRoles.includes("student");
	});

	const editable = computed(() => {
		return !dueDate || new Date() < new Date(dueDate);
	});

	onMounted(() => {
		fetchSubmissionItems(id);
	});

	const sortByName = (
		submissionA: TeacherViewSubmission,
		submissionB: TeacherViewSubmission
	) => {
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

	const mapSubmissionResponse = (submissionsResponse: SubmissionsResponse) => {
		if (isStudent.value) {
			if (submissionsResponse.submissionItemsResponse.length === 0) {
				return [{ completed: false }];
			}

			const completionState =
				submissionsResponse.submissionItemsResponse[0].completed;
			return [{ completed: completionState }];
		} else {
			return submissionsResponse.users
				.map((student) => {
					const submissionInfo: Partial<TeacherViewSubmission> = {
						firstName: student.firstName,
						lastName: student.lastName,
					};

					const submission = submissionsResponse.submissionItemsResponse.find(
						(submission) => submission.userId === student.userId
					);

					if (!submission) {
						submissionInfo.status = editable.value ? "open" : "expired";
						return submissionInfo as TeacherViewSubmission;
					}

					if (submission.completed) {
						submissionInfo.status = "completed";
					}
					if (!submission.completed && editable.value) {
						submissionInfo.status = "open";
					}
					if (!submission.completed && !editable.value) {
						submissionInfo.status = "expired";
					}

					return submissionInfo as TeacherViewSubmission;
				})
				.sort(sortByName);
		}
	};

	return {
		submissions,
		fetchSubmissionItems,
		updateSubmissionItem,
		loading,
		editable,
	};
};
