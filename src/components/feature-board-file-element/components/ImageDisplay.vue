<template>
	<div>
		<v-img class="rounded-t-sm" :src="previewUrl" :alt="name">
			<div v-if="isEditMode" class="menu-background"></div>
		</v-img>
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
.menu-background {
	position: absolute;
	width: 100%;
	height: 52px;
	background-color: var(--v-white-base);
	opacity: 80%;
}
</style>
