<template>
	<v-card
		class="mb-4"
		data-testid="drawing-element"
		outlined
		dense
		ref="drawingElement"
		:ripple="false"
		tabindex="0"
		elevation="0"
		@keydown.up.down="onKeydownArrow"
	>
		<div>
			<DrawingContentElementDisplay
				v-if="!isEditMode"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				:drawing-name="element.content.drawingName"
			/>

			<DrawingContentElementEdit
				v-if="isEditMode"
				:drawingName="element.content.drawingName"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				><BoardMenu scope="element">
					<BoardMenuActionMoveUp @click="onMoveDrawingElementEditUp" />
					<BoardMenuActionMoveDown @click="onMoveDrawingElementEditDown" />
					<BoardMenuActionDelete @click="onDeleteElement" />
				</BoardMenu>
			</DrawingContentElementEdit>
		</div>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef } from "vue";
import { DrawingElementResponse } from "@/serverApi/v3";
import DrawingContentElementDisplay from "./DrawingContentElementDisplay.vue";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import { useBoardFocusHandler } from "@data-board";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";

export default defineComponent({
	name: "DrawingContentElement",
	components: {
		BoardMenu,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
		BoardMenuActionDelete,
		DrawingContentElementDisplay,
		DrawingContentElementEdit,
	},
	props: {
		element: {
			type: Object as PropType<DrawingElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const drawingElement = ref<HTMLElement | null>(null);
		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, drawingElement);

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
			emit("delete:element", props.element.id);
		};
		return {
			drawingElement,
			onDeleteElement,
			onKeydownArrow,
			onMoveDrawingElementEditDown,
			onMoveDrawingElementEditUp,
		};
	},
});
</script>
