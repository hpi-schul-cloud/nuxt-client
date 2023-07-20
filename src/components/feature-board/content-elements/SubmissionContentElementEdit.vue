<template>
	<v-list-item
		class="grey lighten-3 px-2 rounded-t-sm"
		data-testid="board-submission-element-edit"
		inactive
		:ripple="false"
	>
		<v-list-item-icon class="my-2 mr-2">
			<v-icon
				class="grey--text"
				data-testid="board-submission-element-edit-icon"
				large
				>{{ mdiClipboardClockOutline }}</v-icon
			>
		</v-list-item-icon>

		<v-list-item-content>
			<span
				class="subtitle-1 d-inline-block text-truncate"
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
</template>

<script lang="ts">
import { mdiClipboardClockOutline } from "@mdi/js";
import { defineComponent } from "vue";
import SubmissionContentElementMenu from "./SubmissionContentElementMenu.vue";

export default defineComponent({
	name: "SubmissionContentElementEdit",
	components: { SubmissionContentElementMenu },
	props: {
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
			mdiClipboardClockOutline,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
		};
	},
});
</script>
