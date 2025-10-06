<template>
	<div>
		<div class="bg-grey-lighten-4 pa-4 rounded">
			<SubmissionContentElementTitle />
			<div class="menu">
				<slot />
			</div>
		</div>

		<date-time-picker
			class="mt-1 mx-4"
			:date-time="dueDate"
			:date-input-label="t('common.labels.date')"
			:time-input-label="t('common.labels.time')"
			@update:date-time="onDateTimeInput"
		/>
		<SubmissionItemsTeacherDisplay :submissions="submissions" :is-overdue="isOverdue" :loading="loading" />
	</div>
</template>

<script lang="ts">
import { TeacherSubmission } from "../types/submission";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { mdiLightbulbOnOutline } from "@icons/material";
import { DateTimePicker } from "@ui-date-time-picker";
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "SubmissionContentElementEdit",
	components: {
		DateTimePicker,
		SubmissionContentElementTitle,
		SubmissionItemsTeacherDisplay,
	},
	props: {
		dueDate: {
			type: String,
			default: undefined,
		},
		submissions: {
			type: Array as PropType<Array<TeacherSubmission>>,
			required: true,
		},
		isOverdue: {
			type: Boolean,
			required: true,
		},
		loading: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:dueDate"],
	setup(props, { emit }) {
		const { t } = useI18n();

		const onDateTimeInput = (dateTime: string) => {
			emit("update:dueDate", dateTime);
		};

		return {
			t,
			onDateTimeInput,
			mdiLightbulbOnOutline,
		};
	},
});
</script>

<style lang="scss" scoped>
.menu {
	position: absolute;
	right: 4px;
	top: 4px;
}
</style>
