<template>
	<WarningAlert v-if="isError">
		{{ $t("components.cardElement.fileElement.previewError") }}
	</WarningAlert>
	<v-img
		ref="imageRef"
		class="image mx-auto"
		loading="lazy"
		:src="imageSrc"
		:alt="alt"
		:cover="cover"
		:aspect-ratio="aspectRatio"
		@load="setWidth"
		@error="setError"
		:max-width="imageWidth"
		:max-height="maxHeight"
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
import errorImage from "@/assets/img/image-not-available.svg";
import { WarningAlert } from "@ui-alert";

export default defineComponent({
	name: "PreviewImage",
	props: {
		alt: { type: String, required: true },
		src: { type: String, required: true },
		cover: { type: Boolean, required: false, default: false },
		aspectRatio: { type: Number, required: false },
		position: { type: String, required: false },
		maxHeight: { type: Number, required: false },
	},
	components: { WarningAlert },
	emits: ["error"],
	setup(props, { emit }) {
		const isError = ref(false);
		const imageRef = ref();
		const imageWidth = ref();

		const setWidth = () => {
			imageWidth.value = imageRef.value.image.naturalWidth;
		};

		const imageSrc = computed(() => {
			if (isError.value) {
				return errorImage;
			}

			return props.src;
		});

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
		};
	},
});
</script>
