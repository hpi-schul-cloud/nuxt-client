<template>
	<div>
		<template v-for="(element, index) in elements">
			<!-- <element-wrapper> -->
			<template v-if="element.type === abc"> abc-element </template>
			<template v-if="element.type === def"> def-element </template>
			<!-- </element-wrapper> -->
		</template>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ContentElement } from "./types/ContentElement";

export default defineComponent({
	name: "ContentElementList",
	props: {
		elements: {
			type: Array as PropType<ContentElement[]>,
			required: true,
		},
	},
});
</script>
