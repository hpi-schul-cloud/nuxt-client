<template>
	<VCardText>
		<template v-for="element in elements">
			<RichTextContentElement
				v-if="element.type === ContentElementType.RichText"
				:key="element.id"
				:element="element"
				:isEditMode="isEditMode"
			/>
			<template v-else>
				Content Element {{ element.type }} not implemented
			</template>
		</template>
	</VCardText>
</template>
<script lang="ts">
import { ContentElementType } from "@/serverApi/v3";
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
	setup() {
		return {
			ContentElementType,
		};
	},
});
</script>
