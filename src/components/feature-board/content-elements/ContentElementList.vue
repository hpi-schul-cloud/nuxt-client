<template>
	<VCardText>
		<template v-for="(element, index) in elements">
			<TextContentElement
				v-if="element.type === ContentElementType.TEXT"
				:key="index"
				:element="element"
				:isEditMode="isEditMode"
			></TextContentElement>
			<template v-else>
				Content Element {{ element.type }} not implemented
			</template>
		</template>
	</VCardText>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AnyContentElement, ContentElementType } from "../types/ContentElement";
import TextContentElement from "./TextContentElement.vue";

export default defineComponent({
	name: "ContentElementList",
	components: {
		TextContentElement,
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
