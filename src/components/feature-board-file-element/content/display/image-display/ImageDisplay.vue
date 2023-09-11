<template>
	<div>
		<img class="rounded-t-sm image" :src="previewUrl" :alt="name" />
		<div v-if="isEditMode" class="menu-background"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "ImageDisplay",
	props: {
		previewUrl: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
	},
});
</script>

<style scoped>
.image {
	display: block;
	margin-right: auto;
	margin-left: auto;
}
.menu-background {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 52px;
	background-color: var(--v-white-base);
	opacity: 80%;
}
</style>
