<template>
	<VCardText>
		<template v-for="element in elements">
			<RichTextContentElement
				v-if="element.type === ContentElementType.RichText"
				:key="element.id"
				:element="asRichTextElementResponse(element)"
				:isEditMode="isEditMode"
				@move-down:rich-text-edit="onTryMoveRichTextDown(element.id)"
				@move-up:rich-text-edit="onTryMoveRichTextUp(element.id)"
			/>
			<template v-else>
				Content Element {{ element.type }} not implemented
			</template>
		</template>
	</VCardText>
</template>

<script lang="ts">
import { ContentElementType, RichTextElementResponse } from "@/serverApi/v3";
import { defineComponent, PropType } from "vue";
import { AnyContentElement } from "../types/ContentElement";
import RichTextContentElement from "./RichTextContentElement.vue";

export default defineComponent({
	name: "ContentElementList",
	components: {
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
		const asRichTextElementResponse = (element: AnyContentElement) => {
			return element as RichTextElementResponse;
		};

		const onTryMoveRichTextDown = (elementId: string) => {
			emit("move-down:rich-text", elementId);
		};

		const onTryMoveRichTextUp = (elementId: string) => {
			emit("move-up:rich-text", elementId);
		};

		return {
			ContentElementType,
			asRichTextElementResponse,
			onTryMoveRichTextDown,
			onTryMoveRichTextUp,
		};
	},
});
</script>
