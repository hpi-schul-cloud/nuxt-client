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
				@delete:element="onDeleteElement"
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
import {
	AnyContentElement,
	DeleteElementEventPayload,
} from "../types/ContentElement";
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
	emits: ["delete:element"],
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

		const onDeleteElement = (data: DeleteElementEventPayload): void => {
			emit("delete:element", data);
		};

		return {
			ContentElementType,
			isRichTextElementResponse,
			isFileElementResponse,
			onDeleteElement,
		};
	},
});
</script>
