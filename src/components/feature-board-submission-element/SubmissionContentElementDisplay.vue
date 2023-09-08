<template>
	<div class="grey lighten-4 pa-4 rounded">
		<SubmissionContentElementTitle />
		<v-card-subtitle
			class="pa-0 mt-1 subtitle-1"
			data-testid="board-submission-element-due-date"
		>
			{{ formattedDueDate }}
		</v-card-subtitle>
		<SubmissionItemStudentDisplay
			v-if="isStudent"
			:completed="completed"
			:editable="editable"
			:loading="loading"
			@update:completed="updateCompleted"
		/>
	</div>
</template>

<script lang="ts">
import SubmissionItemStudentDisplay from "./SubmissionItemStudentDisplay.vue";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { defineComponent, ref, computed, toRef } from "vue";
import dayjs from "dayjs";
import { useI18n } from "@/composables/i18n.composable";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";

export default defineComponent({
	name: "SubmissionContentElementDisplay",
	components: { SubmissionContentElementTitle, SubmissionItemStudentDisplay },
	props: {
		completed: {
			type: Boolean,
			required: true,
		},
		loading: {
			type: Boolean,
			required: true,
		},
		dueDate: {
			type: String,
		},
	},
	emits: ["update:completed"],
	setup(props, { emit }) {
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
		const userRoles = ref(authModule.getUserRoles);

		const isStudent = computed(() => {
			return userRoles.value.includes("student");
		});

		const updateCompleted = (completed: boolean) => {
			emit("update:completed", completed);
		};

		const editable = computed(() => {
			const dueDate = toRef(props, "dueDate").value;
			const today = dayjs();
			return today.isBefore(dueDate);
		});

		const { t } = useI18n();

		const formattedDueDate = props.dueDate
			? dayjs(props.dueDate).format(`dddd, ${t("format.date")} - HH:mm`)
			: undefined;

		return {
			isStudent,
			editable,
			dayjs,
			updateCompleted,
			formattedDueDate,
		};
	},
});
</script>
