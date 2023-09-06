<template>
	<v-card
		class="mb-4"
		data-testid="drawing-element"
		:outlined="isOutlined"
		ref="drawingElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<div>
			<DrawingContentElementDisplay
				v-if="!isEditMode"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
			/>

			<DrawingContentElementEdit
				v-if="isEditMode"
				:elementId="element.id"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveDrawingElementEditDown"
				@move-up:element="onMoveDrawingElementEditUp"
				@delete:element="onDeleteElement"
			/>
		</div>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { DrawingElementResponse } from "@/serverApi/v3";
import DrawingContentElementDisplay from "./DrawingContentElementDisplay.vue";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import { useBoardFocusHandler } from "@data-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export default defineComponent({
	name: "DrawingContentElement",
	components: {
		DrawingContentElementDisplay,
		DrawingContentElementEdit,
	},
	props: {
		element: {
			type: Object as PropType<DrawingElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);
		const drawingElement = ref<HTMLElement | null>(null);
		useBoardFocusHandler(props.element.id, drawingElement);

		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const isOutlined = ref(props.isEditMode);

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveDrawingElementEditDown = () => {
			emit("move-down:edit");
		};

		const onMoveDrawingElementEditUp = () => {
			emit("move-up:edit");
		};

		const onDeleteElement = async (): Promise<void> => {
			const shouldDelete = await askDeleteConfirmation(
				i18n.t("components.cardElement.drawingElement").toString(),
				"boardElement"
			);

			if (shouldDelete) {
				emit("delete:element", props.element.id);
			}
		};

		return {
			isOutlined,
			drawingElement,
			onDeleteElement,
			onKeydownArrow,
			onMoveDrawingElementEditDown,
			onMoveDrawingElementEditUp,
		};
	},
});
</script>
