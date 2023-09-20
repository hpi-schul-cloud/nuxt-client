<template>
	<div>
		<img
			class="rounded-t-sm image"
			loading="lazy"
			:src="previewUrl"
			:alt="name"
			@click="onClick"
		/>
		<div v-if="isEditMode" class="menu-background"></div>
	</div>
</template>

<script lang="ts">
import { useLightBox } from "@ui-light-box";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ImageDisplay",
	props: {
		url: { type: String, required: true },
		previewUrl: { type: String, required: true },
		name: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const { open } = useLightBox();

		const onClick = () => {
			const options = {
				url: props.url,
				alt: props.name,
				name: props.name,
			};
			open(options);
		};

		return {
			onClick,
		};
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
