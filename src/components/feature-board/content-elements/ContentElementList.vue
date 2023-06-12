<template>
	<VCardText>
		<template v-for="element in elements">
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
				@move-down:file-edit="onMoveFileDown(element.id)"
				@move-up:file-edit="onMoveFileUp(element.id)"
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
import { defineComponent, PropType } from "vue";
import { AnyContentElement } from "../types/ContentElement";
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
	emits: ["move-down:file", "move-up:file"],
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

		const onMoveFileDown = (elementId: string) => {
			emit("move-down:file", elementId);
		};

		const onMoveFileUp = (elementId: string) => {
			emit("move-up:file", elementId);
		};

		const hasMultipleElements = () => props.elements.length > 1;

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
			onMoveFileDown,
			onMoveFileUp,
		};
	},
});
</script>
