<template>
	<v-card
		class="mb-4"
		data-testid="drawing-element"
		variant="outlined"
		dense
		ref="drawingElement"
		:ripple="false"
		tabindex="0"
		elevation="0"
		@keydown.up.down="onKeydownArrow"
		role="button"
		:href="sanitizedUrl"
		target="_blank"
	>
		<div>
			<InnerContent
				v-if="!isEditMode"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				:docName="element.id"
			/>

			<InnerContent
				v-if="isEditMode"
				:lastUpdatedAt="element.timestamps.lastUpdatedAt"
				:docName="element.id"
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
import { computed, defineComponent, PropType, ref, toRef } from "vue";
import { sanitizeUrl } from "@braintree/sanitize-url";
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
	],
	setup(props, { emit }) {
		const drawingElement = ref<HTMLElement | null>(null);
		const element = toRef(props, "element");
		const sanitizedUrl = computed(() =>
			sanitizeUrl(`/tldraw?roomName=${element.value.id}`)
		);
		useBoardFocusHandler(element.value.id, drawingElement);

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};
		const onMoveDrawingElementEditDown = () => emit("move-down:edit");
		const onMoveDrawingElementEditUp = () => emit("move-up:edit");
		const onDeleteElement = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:element", props.element.id);
			}
		};
		return {
			drawingElement,
			sanitizedUrl,
			onDeleteElement,
			onKeydownArrow,
			onMoveDrawingElementEditDown,
			onMoveDrawingElementEditUp,
		};
	},
});
</script>
