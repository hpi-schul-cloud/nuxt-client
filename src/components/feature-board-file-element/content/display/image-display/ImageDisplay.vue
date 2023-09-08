<template>
	<div>
		<v-img class="rounded-t-sm" :src="previewUrl" :alt="name">
			<div v-if="isEditMode" class="menu-background"></div>
		</v-img>
		<AlternativeText v-if="isEditMode" :element="element"></AlternativeText>
	</div>
</template>

<script lang="ts">
import { FileElementResponse } from "@/serverApi/v3";
import { defineComponent, PropType } from "vue";
import AlternativeText from "./AlternativeText.vue";

export default defineComponent({
	name: "ImageDisplay",
	components: {
		AlternativeText,
	},
	props: {
		previewUrl: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		element: { type: Object as PropType<FileElementResponse>, required: true },
	},
});
</script>

<style scoped>
.menu-background {
	position: absolute;
	width: 100%;
	height: 52px;
	background-color: var(--v-white-base);
	opacity: 80%;
}
</style>
