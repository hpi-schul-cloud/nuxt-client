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
				@move-down:file-edit="onTryMoveFileDown(element.id)"
				@move-up:file-edit="onTryMoveFileUp(element.id)"
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

		const onTryMoveFileDown = (elementId: string) => {
			emit("move-down:file", elementId);
		};

		const onTryMoveFileUp = (elementId: string) => {
			emit("move-up:file", elementId);
		};

		return {
			ContentElementType,
			isRichTextElementResponse,
			isFileElementResponse,
			onTryMoveFileDown,
			onTryMoveFileUp,
		};
	},
});
</script>
