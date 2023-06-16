<template>
	<VCardText>
		<template v-for="(element, index) in elements">
			<RichTextContentElement
				v-if="isRichTextElementResponse(element)"
				:key="element.id"
				:element="element"
				:isEditMode="isEditMode"
			/>
			<FileContentElement
				v-else-if="isFileElementResponse(element)"
				:key="element.id"
				:element="element"
				:isEditMode="isEditMode"
				:isFirstElement="isFirstElement(element.id)"
				:isLastElement="isLastElement(element.id)"
				:hasMultipleElements="hasMultipleElements"
				@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
				@move-down:edit="onMoveElementDown(index, element)"
				@move-up:edit="onMoveElementUp(index, element)"
			/>
		</template>
	</VCardText>
</template>

<script lang="ts">
import {
	ContentElementType,
	FileElementResponse,
	RichTextElementResponse,
} from "@/serverApi/v3";
import { computed, defineComponent, PropType } from "vue";
import { AnyContentElement } from "../types/ContentElement";
import { ElementMove } from "../types/DragAndDrop";
import FileContentElement from "./FileContentElement.vue";
import RichTextContentElement from "./RichTextContentElement.vue";

export default defineComponent({
	name: "ContentElementList",
	components: {
		FileContentElement,
		RichTextContentElement,
	},
	props: {
		elements: {
			type: Array as PropType<AnyContentElement[]>,
			required: true,
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["move-down:element", "move-up:element", "move-keyboard:element"],
	setup(props, { emit }) {
		const isRichTextElementResponse = (
			element: AnyContentElement
		): element is RichTextElementResponse => {
			return element.type === ContentElementType.RichText;
		};

		const isFileElementResponse = (
			element: AnyContentElement
		): element is FileElementResponse => {
			return element.type === ContentElementType.File;
		};

		const onMoveElementDown = (
			elementIndex: number,
			element: AnyContentElement
		) => {
			const elementMove: ElementMove = {
				elementIndex,
				payload: element.id,
			};
			emit("move-down:element", elementMove);
		};

		const onMoveElementUp = (
			elementIndex: number,
			element: AnyContentElement
		) => {
			const elementMove: ElementMove = {
				elementIndex,
				payload: element.id,
			};
			emit("move-up:element", elementMove);
		};

		const onMoveElementKeyboard = (
			elementIndex: number,
			element: AnyContentElement,
			event: KeyboardEvent
		) => {
			const elementMove: ElementMove = {
				elementIndex,
				payload: element.id,
			};
			emit("move-keyboard:element", elementMove, event.code);
		};

		const hasMultipleElements = computed(() => props.elements.length > 1);

		const isFirstElement = (elementId: string) => {
			const elementIndex = props.elements.findIndex(
				(element: AnyContentElement) => element.id === elementId
			);

			if (elementIndex === -1) {
				return false;
			}

			const isFirstElement = elementIndex === 0;
			return isFirstElement;
		};

		const isLastElement = (elementId: string) => {
			const elementIndex = props.elements.findIndex(
				(element: AnyContentElement) => element.id === elementId
			);

			if (elementIndex === -1) {
				return false;
			}

			const lastElementIndex = props.elements.length - 1;

			const isLastElement = elementIndex === lastElementIndex;
			return isLastElement;
		};

		return {
			ContentElementType,
			hasMultipleElements,
			isFileElementResponse,
			isFirstElement,
			isLastElement,
			isRichTextElementResponse,
			onMoveElementDown,
			onMoveElementUp,
			onMoveElementKeyboard,
		};
	},
});
</script>
