<template>
	<v-img
		ref="imageRef"
		class="image rounded-t-sm"
		loading="lazy"
		:src="src"
		:alt="alt"
		:contain="contain"
		:aspect-ratio="aspectRatio"
		:position="position"
		@load="setWidth"
		:max-width="imageWidth"
	>
		<template v-slot:placeholder>
			<v-row class="fill-height ma-0" align="center" justify="center">
				<VProgressCircular color="primary" indeterminate :size="36" />
			</v-row>
		</template>
	</v-img>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNaturalwidth } from "./NaturalWidth.composable";

export default defineComponent({
	name: "PreviewImage",
	props: {
		alt: { type: String, required: true },
		src: { type: String, required: true },
		contain: { type: Boolean, required: false, default: false },
		aspectRatio: { type: Number, required: false },
		position: { type: String, required: false },
	},
	setup() {
		const { imageRef, imageWidth, setWidth } = useNaturalwidth();

		return {
			imageRef,
			setWidth,
			imageWidth,
		};
	},
});
</script>

<style scoped>
.image {
	left: 50%;
	transform: translateX(-50%);
}
</style>
