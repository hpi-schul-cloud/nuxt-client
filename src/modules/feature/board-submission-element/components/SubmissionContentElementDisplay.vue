<template>
	<div>
		<div class="bg-grey-lighten-4 pa-4 rounded-t">
			<SubmissionContentElementTitle />
			<v-card-subtitle
				class="pa-0 mt-1 text-subtitle-1"
				data-testid="board-submission-element-due-date"
			>
				{{ formattedDueDate }}
			</v-card-subtitle>
		</div>
		<SubmissionItemStudentDisplay
			v-if="isStudent"
			:student-submission="studentSubmission"
			:is-overdue="isOverdue"
			:loading="loading"
			@update:completed="updateCompleted"
		/>
		<SubmissionItemsTeacherDisplay
			v-if="isTeacher"
			:submissions="submissions"
			:is-overdue="isOverdue"
			:loading="loading"
		/>
	</div>
</template>

<script lang="ts">
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { defineComponent, ref, computed, PropType } from "vue";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { StudentSubmission, TeacherSubmission } from "../types/submission";
import { DATETIME_FORMAT } from "@/plugins/datetime";

export default defineComponent({
	name: "SubmissionContentElementDisplay",
	components: {
		SubmissionContentElementTitle,
		SubmissionItemStudentDisplay,
		SubmissionItemsTeacherDisplay,
	},
	props: {
		submissions: {
			type: Array as PropType<Array<TeacherSubmission>>,
			required: true,
		},
		studentSubmission: {
			type: Object as PropType<StudentSubmission>,
			required: true,
		},
		loading: {
			type: Boolean,
			required: true,
		},
		isOverdue: {
			type: Boolean,
			required: true,
		},
		dueDate: {
			type: String,
			default: null,
		},
	},
	emits: ["update:completed"],
	setup(props, { emit }) {
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
		const { t } = useI18n();
		const userRoles = ref(authModule.getUserRoles);

		const isStudent = computed(() => {
			return userRoles.value.includes("student");
		});

		const isTeacher = computed(() => {
			return userRoles.value.includes("teacher");
		});

		const updateCompleted = (completed: boolean) => {
			emit("update:completed", completed);
		};

		const formattedDueDate = computed(() => {
			if (!props.dueDate) {
				return undefined;
			}

			dayjs.locale(authModule.getLocale);
			const format = `dddd, ${DATETIME_FORMAT.date} - HH:mm`;

			return `${t("components.cardElement.submissionElement.until")} ${dayjs(
				props.dueDate
			).format(format)}`;
		});

		return {
			isStudent,
			isTeacher,
			dayjs,
			updateCompleted,
			formattedDueDate,
		};
	},
});
</script>
