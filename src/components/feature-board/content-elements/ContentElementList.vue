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
				@move-down:rich-text-edit="onTryMoveRichTextDown(element.id)"
				@move-up:rich-text-edit="onTryMoveRichTextUp(element.id)"
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
	emits: ["move-down:rich-text", "move-up:rich-text"],
	setup(_, { emit }) {
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

		const onTryMoveRichTextDown = (elementId: string) => {
			emit("move-down:rich-text", elementId);
		};

		const onTryMoveRichTextUp = (elementId: string) => {
			emit("move-up:rich-text", elementId);
		};

		return {
			ContentElementType,
			isRichTextElementResponse,
			isFileElementResponse,
			onTryMoveRichTextDown,
			onTryMoveRichTextUp,
		};
	},
});
</script>
