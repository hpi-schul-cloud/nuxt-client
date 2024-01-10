<template>
	<v-img
		ref="imageRef"
		class="image rounded-t-sm"
		loading="lazy"
		:src="imageSrc"
		:alt="alt"
		:contain="contain"
		:aspect-ratio="aspectRatio"
		:position="position"
		@load="setWidth"
		@error="setError"
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
import { defineComponent, ref, computed } from "vue";
import { useNaturalwidth } from "./NaturalWidth.composable";
import errorImage from "@/assets/img/preview-not-possible.svg";

export default defineComponent({
	name: "PreviewImage",
	props: {
		alt: { type: String, required: true },
		src: { type: String, required: true },
		contain: { type: Boolean, required: false, default: false },
		aspectRatio: { type: Number, required: false },
		position: { type: String, required: false },
	},
	setup(props, { emit }) {
		const { imageRef, imageWidth, setWidth } = useNaturalwidth();
		const isError = ref(false);

		const imageSrc = computed(() => {
			if (isError.value) {
				return errorImage;
			}
			return props.src;
		});

		const setError = () => {
			isError.value = true;
			emit("error", isError);
		};

		return {
			imageRef,
			setWidth,
			imageWidth,
			imageSrc,
			setError,
			isError,
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
