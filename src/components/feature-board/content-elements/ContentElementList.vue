<template>
	<VCardText>
		<template v-for="element in elements">
			<RichTextContentElement
				v-if="element.type === ContentElementType.RichText"
				:key="element.id"
				:element="asRichTextElementResponse(element)"
				:isEditMode="isEditMode"
			/>
			<FileContentElement
				v-else-if="element.type === ContentElementType.File"
				:key="element.id"
				:element="asFileElementResponse(element)"
				:isEditMode="isEditMode"
			/>
			<template v-else>
				Content Element {{ element.type }} not implemented
			</template>
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
	setup() {
		const asRichTextElementResponse = (element: AnyContentElement) => {
			return element as RichTextElementResponse;
		};

		const asFileElementResponse = (element: AnyContentElement) => {
			return element as FileElementResponse;
		};

		return {
			ContentElementType,
			asFileElementResponse,
			asRichTextElementResponse,
		};
	},
});
</script>
