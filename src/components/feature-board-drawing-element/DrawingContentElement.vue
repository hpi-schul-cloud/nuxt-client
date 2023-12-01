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
		@click="onClick"
	>
		<div>
			<InnerContent
				v-if="!isEditMode"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				:doc-name="element.id"
			/>

			<InnerContent
				v-if="isEditMode"
				:docName="element.id"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				><BoardMenu scope="element">
					<BoardMenuActionMoveUp @click="onMoveDrawingElementEditUp" />
					<BoardMenuActionMoveDown @click="onMoveDrawingElementEditDown" />
					<BoardMenuActionDelete @click="onDeleteElement" />
				</BoardMenu>
			</InnerContent>
		</div>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef } from "vue";
import { DrawingElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler } from "@data-board";
import InnerContent from "./InnerContent.vue";
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
		InnerContent,
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
		"open:element",
	],
	setup(props, { emit }) {
		const drawingElement = ref<HTMLElement | null>(null);
		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, drawingElement);

		const onClick = () => {
			const urlWithRoom = `/tldraw?roomName=${element.value.id}`;
			window.open(urlWithRoom, "_blank");
			emit("open:element");
		};
		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};
		const onMoveDrawingElementEditDown = () => emit("move-down:edit");
		const onMoveDrawingElementEditUp = () => emit("move-up:edit");
		const onDeleteElement = () => emit("delete:element", element.value.id);

		return {
			drawingElement,
			onClick,
			onDeleteElement,
			onKeydownArrow,
			onMoveDrawingElementEditDown,
			onMoveDrawingElementEditUp,
		};
	},
});
</script>
