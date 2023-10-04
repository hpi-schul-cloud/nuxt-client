<template>
	<div>
		<div class="grey lighten-4 pa-4 rounded">
			<SubmissionContentElementTitle />
			<div class="menu">
				<SubmissionContentElementMenu
					:isFirstElement="isFirstElement"
					:isLastElement="isLastElement"
					:hasMultipleElements="hasMultipleElements"
					@move-down:element="onMoveElementDown"
					@move-up:element="onMoveElementUp"
					@delete:element="onDeleteElement"
				/>
			</div>
			<date-time-picker
				class="mt-1"
				:dateTime="dueDate"
				:date-input-label="t('common.labels.date')"
				:time-input-label="t('common.labels.time')"
				@input="onDateTimeInput"
			/>
			<FileContentElement
				:key="mockedFileElement.id"
				:element="mockedFileElement"
				isEditMode
			/>
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
import { SubmissionsResponse, ContentElementType } from "@/serverApi/v3";
import SubmissionContentElementMenu from "./SubmissionContentElementMenu.vue";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";
import { DateTimePicker } from "@feature-date-time-picker";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";
import { FileContentElement } from "@feature-board-file-element";

export default defineComponent({
	name: "SubmissionContentElementEdit",
	components: {
		SubmissionContentElementMenu,
		SubmissionContentElementTitle,
		DateTimePicker,
		SubmissionItemsTeacherDisplay,
		FileContentElement,
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
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"update:dueDate",
	],
	setup(props, { emit }) {
		const { t } = useI18n();

		const onMoveElementDown = () => {
			emit("move-down:element");
		};

		const onMoveElementUp = () => {
			emit("move-up:element");
		};

		const onDeleteElement = () => {
			emit("delete:element");
		};

		const onDateTimeInput = (dateTime: string) => {
			emit("update:dueDate", dateTime);
		};

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
			t,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
			onDateTimeInput,
			mockedFileElement,
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
