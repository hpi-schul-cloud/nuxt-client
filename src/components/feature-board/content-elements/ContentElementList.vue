<template>
	<VCardText>
		<template v-for="element in elements">
			<RichTextContentElement
				v-if="isRichTextElementResponse(element)"
				:key="element.id"
				:element="element"
				:isEditMode="isEditMode"
				@delete:element="onDeleteElement"
			/>
			<FileContentElement
				v-else-if="isFileElementResponse(element)"
				:key="element.id"
				:element="element"
				:isEditMode="isEditMode"
				:deleteElement="deleteElement"
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
		deleteElement: {
			type: Function as PropType<(elementId: string) => Promise<void>>,
			required: true,
		},
	},
	setup() {
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

		return {
			ContentElementType,
			isRichTextElementResponse,
			isFileElementResponse,
		};
	},
});
</script>
