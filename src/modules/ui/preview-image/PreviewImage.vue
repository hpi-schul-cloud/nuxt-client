<template>
	<v-img
		ref="imageRef"
		class="mx-auto"
		data-testid="image-preview"
		:class="{ 'error-image': isError }"
		:src="imageSrc"
		:alt="alt"
		:cover="cover"
		:aspect-ratio="aspectRatio"
		:max-width="imageWidth"
		:max-height="maxHeight"
		:position="position"
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
import errorImage from "@/assets/img/image-not-available.svg";
import { WarningAlert } from "@ui-alert";
import { defineComponent, ref } from "vue";

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
	setup(props) {
		const isError = ref(false);
		const imageRef = ref();
		const imageWidth = ref();

		const setWidth = () => {
			imageWidth.value = imageRef.value.image.naturalWidth;
		};

		const setError = () => {
			isError.value = true;
		};

		return {
			imageRef,
			setWidth,
			imageWidth,
			imageSrc: props.src,
			setError,
			isError,
			errorImage,
		};
	},
});
</script>

<style>
.v-img__error {
	/* For some reason .v-img__error has position: absolute normally. We override it because the image is not visible otherwise. */
	position: static;
	background-color: white;
}

.error-image {
	/* We override the flex-grow value of v-img, so that the error image doesn't get stretched. */
	flex-grow: 0;
}
</style>
