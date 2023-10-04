<template>
	<div>
		<div class="grey lighten-4 pa-4 rounded">
			<SubmissionContentElementTitle />
			<div class="menu">
				<slot></slot>
			</div>
			<date-time-picker
				class="mt-1"
				:dateTime="dueDate"
				:date-input-label="t('common.labels.date')"
				:time-input-label="t('common.labels.time')"
				@input="onDateTimeInput"
			/>
			<div v-if="dateTimeInPast" class="date-hint">
				Das Datum liegt in der Vergangenheit
			</div>
		</div>
		<SubmissionItemsTeacherDisplay
			:submissions="submissions"
			:editable="editable"
			:loading="loading"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useI18n } from "@/composables/i18n.composable";
import { SubmissionsResponse } from "@/serverApi/v3";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";
import { DateTimePicker } from "@feature-date-time-picker";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";

export default defineComponent({
	name: "SubmissionContentElementEdit",
	components: {
		SubmissionContentElementTitle,
		DateTimePicker,
		SubmissionItemsTeacherDisplay,
	},
	props: {
		dueDate: {
			type: String,
		},
		submissions: {
			type: Object as PropType<SubmissionsResponse>,
			required: true,
		},
		editable: {
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

		const dateTimeInPast = ref(false);

		const onDateTimeInput = (dateTime: string) => {
			dateTimeInPast.value = new Date(dateTime) < new Date();
			emit("update:dueDate", dateTime);
		};

		return {
			t,
			onDateTimeInput,
			dateTimeInPast,
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
.date-hint {
	color: red;
	display: block;
}
</style>
