<template>
	<v-img
		ref="imageRef"
		loading="lazy"
		class="mx-auto"
		data-testid="image-preview"
		:class="{ 'error-image': isError }"
		:src="imageSrc"
		:alt="alt"
		:cover="cover"
		:aspect-ratio="aspectRatio"
		:max-width="imageWidth"
		:max-height="maxHeight"
		@load="setWidth"
		@error="setError"
	>
		<template #placeholder>
			<v-row class="fill-height ma-0" align="center" justify="center">
				<VProgressCircular color="primary" indeterminate :size="36" />
			</v-row>
		</template>
		<template #error>
			<WarningAlert>
				{{ $t("components.cardElement.fileElement.previewError") }}
			</WarningAlert>
			<v-img :src="errorImage" />
		</template>
	</v-img>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import errorImage from "@/assets/img/image-not-available.svg";
import { WarningAlert } from "@ui-alert";

export default defineComponent({
	name: "PreviewImage",
	components: { WarningAlert },
	props: {
		alt: { type: String, required: true },
		src: { type: String, required: true },
		cover: { type: Boolean, required: false, default: false },
		aspectRatio: { type: Number, required: false, default: undefined },
		position: { type: String, required: false, default: undefined },
		maxHeight: { type: Number, required: false, default: undefined },
	},
	emits: ["error"],
	setup(props, { emit }) {
		const isError = ref(false);
		const imageRef = ref();
		const imageWidth = ref();

		const setWidth = () => {
			imageWidth.value = imageRef.value.image.naturalWidth;
		};

		const imageSrc = computed(() => props.src);

		const setError = () => {
			isError.value = true;
			emit("error");
		};

		return {
			imageRef,
			setWidth,
			imageWidth,
			imageSrc,
			setError,
			isError,
			errorImage,
		};
	},
});
</script>

<style>
.v-img__error {
	/* For some reason .v-img__error has position: absolute normally. We override it so the image is displayed. */
	position: static;
	background-color: white;
}

.error-image {
	/* We override the flex-grow value of v-img, so that the error image doesn't get stretched. */
	flex-grow: 0;
}
</style>
