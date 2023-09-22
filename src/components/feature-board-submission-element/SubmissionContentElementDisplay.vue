<template>
	<div>
		<div class="grey lighten-4 px-4 py-3 rounded-t-sm">
			<v-list-item
				class="px-0"
				data-testid="board-submission-element-display"
				inactive
			>
				<v-list-item-icon class="mr-2 my-2">
					<v-icon
						class="grey--text text--darken-2"
						data-testid="board-submission-element-display-icon"
						medium
						>{{ mdiLightbulbOnOutline }}</v-icon
					>
				</v-list-item-icon>

				<v-list-item-content class="py-0">
					<span
						class="subtitle-1 d-inline-block text-truncate grey--text text--darken-2"
						data-testid="board-submission-element-display-content"
						>{{ $t("components.cardElement.submissionElement") }}</span
					>
				</v-list-item-content>
			</v-list-item>

			<v-card-text
				class="pa-0 subtitle-1 font-weight-bold"
				data-testid="board-submission-element-due-date"
			>
				{{ dayjs(dueDate).format("DD.MM.YYYY HH:mm") }}
			</v-card-text>
		</div>
		<SubmissionItemStudentDisplay
			v-if="isStudent"
			:submissions="submissions"
			:editable="editable"
			:loading="loading"
			@update:completed="updateCompleted"
		/>
		<SubmissionItemsTeacherDisplay
			v-if="isTeacher"
			:submissions="submissions"
			:editable="editable"
			:loading="loading"
		/>
	</div>
</template>

<script lang="ts">
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { mdiLightbulbOnOutline } from "@mdi/js";
import { defineComponent, ref, computed, PropType } from "vue";
import dayjs from "dayjs";
import { SubmissionsResponse } from "@/serverApi/v3";

export default defineComponent({
	name: "SubmissionContentElementDisplay",
	components: {
		SubmissionItemStudentDisplay,
		SubmissionItemsTeacherDisplay,
	},
	props: {
		submissions: {
			type: Object as PropType<SubmissionsResponse>,
			required: true,
		},
		loading: {
			type: Boolean,
			required: true,
		},
		editable: {
			type: Boolean,
			required: true,
		},
		dueDate: {
			type: String,
			required: true,
		},
	},
	emits: ["update:completed"],
	setup(props, { emit }) {
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
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

		return {
			isStudent,
			isTeacher,
			dayjs,
			updateCompleted,
			mdiLightbulbOnOutline,
		};
	},
});
</script>
