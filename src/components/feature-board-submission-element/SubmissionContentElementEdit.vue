<template>
	<div>
		<div class="grey lighten-4 px-4 py-3 rounded-t-sm">
			<v-list-item
				class="px-0"
				data-testid="board-submission-element-edit"
				inactive
			>
				<v-list-item-icon class="mr-2 my-2">
					<v-icon
						class="grey--text text--darken-2"
						data-testid="board-submission-element-edit-icon"
						medium
						>{{ mdiLightbulbOnOutline }}</v-icon
					>
				</v-list-item-icon>

				<v-list-item-content class="py-0">
					<span
						class="subtitle-1 d-inline-block text-truncate grey--text text--darken-2"
						data-testid="board-submission-element-edit-content"
						>{{ $t("components.cardElement.submissionElement") }}</span
					>
				</v-list-item-content>

				<SubmissionContentElementMenu
					:isFirstElement="isFirstElement"
					:isLastElement="isLastElement"
					:hasMultipleElements="hasMultipleElements"
					@move-down:element="onMoveElementDown"
					@move-up:element="onMoveElementUp"
					@delete:element="onDeleteElement"
				/>
			</v-list-item>

			<v-card-text
				class="pa-0 subtitle-1 font-weight-bold"
				data-testid="board-submission-element-due-date"
			>
				{{ dayjs(dueDate).format("DD.MM.YYYY HH:mm") }}
			</v-card-text>
		</div>
		<SubmissionItemsTeacherDisplay
			:submissions="submissions"
			:editable="editable"
			:loading="loading"
		/>
	</div>
</template>

<script lang="ts">
import { mdiLightbulbOnOutline } from "@mdi/js";
import { defineComponent, PropType } from "vue";
import dayjs from "dayjs";
import SubmissionContentElementMenu from "./SubmissionContentElementMenu.vue";
import { SubmissionsResponse } from "@/serverApi/v3";
import SubmissionItemsTeacherDisplay from "./SubmissionItemsTeacherDisplay.vue";

export default defineComponent({
	name: "SubmissionContentElementEdit",
	components: { SubmissionContentElementMenu, SubmissionItemsTeacherDisplay },
	props: {
		dueDate: {
			type: String,
			required: true,
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
	emits: ["delete:element", "move-down:element", "move-up:element"],
	setup(props, { emit }) {
		const onMoveElementDown = () => {
			emit("move-down:element");
		};

		const onMoveElementUp = () => {
			emit("move-up:element");
		};

		const onDeleteElement = () => {
			emit("delete:element");
		};

		return {
			dayjs,
			mdiLightbulbOnOutline,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
		};
	},
});
</script>
