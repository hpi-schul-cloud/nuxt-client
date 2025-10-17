<template>
	<div class="rounded-b border-top">
		<v-skeleton-loader v-if="loading" class="mt-5 ml-5 mb-6" type="image" width="120" height="22" />
		<v-checkbox
			v-else
			v-model="modelValue"
			class="px-4"
			:disabled="isOverdue"
			:label="t('components.cardElement.submissionElement.completed')"
			hide-details
		/>
	</div>
</template>

<script lang="ts">
import { StudentSubmission } from "../types/submission";
import { computed, defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "SubmissionItemStudentDisplay",
	props: {
		isOverdue: {
			type: Boolean,
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
	},
	emits: ["update:completed"],
	setup(props, { emit }) {
		const modelValue = computed({
			get() {
				return props.studentSubmission.completed;
			},
			set(newValue) {
				emit("update:completed", newValue);
			},
		});

		const { t } = useI18n();

		return {
			modelValue,
			t,
		};
	},
});
</script>

<style lang="scss" scoped>
.border-top {
	border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
