<template>
	<div>
		<ContentElementBar :hasGreyBackground="true" :icon="mdiLightbulbOnOutline">
			<template #title>
				<ContentElementTitle>
					{{ t("components.cardElement.submissionElement") }}
				</ContentElementTitle>
			</template>
			<template #menu>
				<slot />
			</template>
		</ContentElementBar>

		<date-time-picker
			class="mt-1 mx-4"
			:dateTime="dueDate"
			:date-input-label="t('common.labels.date')"
			:time-input-label="t('common.labels.time')"
			@input="onDateTimeInput"
		/>
		<SubmissionItemsTeacherDisplay
			:submissions="submissions"
			:isOverdue="isOverdue"
			:loading="loading"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mdiLightbulbOnOutline } from "@mdi/js";
import { useI18n } from "@/composables/i18n.composable";
import { TeacherSubmission } from "../types/submission";
import { DateTimePicker } from "@ui-date-time-picker";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";

export default defineComponent({
	name: "SubmissionContentElementEdit",
	components: {
		DateTimePicker,
		SubmissionItemsTeacherDisplay,
	},
	props: {
		dueDate: {
			type: String,
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
