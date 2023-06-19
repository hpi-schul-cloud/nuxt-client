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
				:isFirstElement="firstElementId === element.id"
				:isLastElement="lastElementId === element.id"
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

		const firstElementId = computed<Element["id"] | null>(() =>
			props.elements.length > 0 ? props.elements[0].id : null
		);

		const lastElementId = computed<Element["id"] | null>(() => {
			const lastElementIndex = props.elements.length - 1;
			return props.elements.length > 0
				? props.elements[lastElementIndex].id
				: null;
		});

		return {
			ContentElementType,
			firstElementId,
			hasMultipleElements,
			isFileElementResponse,
			isRichTextElementResponse,
			lastElementId,
			onMoveElementDown,
			onMoveElementUp,
			onMoveElementKeyboard,
		};
	},
});
</script>
