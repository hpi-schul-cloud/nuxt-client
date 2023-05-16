<template>
	<VCardText>
		<template v-for="element in elements">
			<TextContentElement
				v-if="element.type === ContentElementType.Text"
				:key="element.id"
				:element="element"
				:isEditMode="isEditMode"
			></TextContentElement>
			<FileContentElement
				v-else-if="element.type === ContentElementType.File"
				:key="element.id"
				:element="element"
				:isEditMode="isEditMode"
			></FileContentElement>
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
