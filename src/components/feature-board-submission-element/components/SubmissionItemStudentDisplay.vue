<template>
	<div class="rounded-b border-top">
		<v-skeleton-loader
			v-if="loading"
			class="mt-5 ml-5 mb-6"
			type="image"
			width="120"
			height="22"
		/>
		<FileContentElement
			v-else
			:key="mockedFileElement.id"
			:element="mockedFileElement"
			:isEditMode="false"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import { useI18n } from "@/composables/i18n.composable";
import { FileContentElement } from "@feature-board-file-element";
import { SubmissionsResponse, ContentElementType } from "@/serverApi/v3";

export default defineComponent({
	name: "SubmissionItemStudentDisplay",
	components: {
		FileContentElement,
	},
	props: {
		editable: {
			type: Boolean,
			required: true,
		},
		submissions: {
			type: Object as PropType<SubmissionsResponse>,
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
				if (props.submissions.submissionItemsResponse.length === 0) {
					return false;
				}

				const completionState =
					props.submissions.submissionItemsResponse[0].completed;
				return completionState;
			},
			set(newValue) {
				emit("update:completed", newValue);
			},
		});

		const { t } = useI18n();

		const mockedFileElement = ref({
			id: "651d7cf82436e17a07740748",
			type: ContentElementType.File,
			timestamps: {
				createdAt: "",
				lastUpdatedAt: "",
			},
			content: {
				caption: "Caption",
				alternativeText: "Alternativer Text",
			},
		});

		return {
			modelValue,
			mockedFileElement,
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
