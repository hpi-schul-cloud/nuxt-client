<template>
	<div>
		<img
			class="rounded-t-sm image"
			loading="lazy"
			:src="previewUrl"
			:alt="name"
		/>
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
</style>
