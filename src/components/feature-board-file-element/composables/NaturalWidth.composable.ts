import { ref } from "vue";

// Calculates the max width of an image, because v-img currently has a bug. Images that are smaller than the parent element are stretched to full width.
export const useNaturalwidth = () => {
	const imageRef = ref();
	const imageWidth = ref();

	const setWidth = () => {
		const { naturalWidth } = imageRef.value.image;
		const parenElementWidth = imageRef.value.$parent.$el.clientWidth;

		if (naturalWidth < parenElementWidth)
			imageWidth.value = imageRef.value.image.naturalWidth;
	};

	return {
		imageRef,
		imageWidth,
		setWidth,
	};
};
