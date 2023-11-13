import { onMounted, ref } from "vue";

// Loads image without the need to display an image element.
// When image element is rendered after image is loaded image for element is taken from cache.
export const usePreloadedImage = (imageUrl: string) => {
	const isImageLoading = ref(true);

	onMounted(() => {
		const img = new Image();
		img.src = imageUrl;
		img.onload = () => {
			isImageLoading.value = false;
		};
	});

	return {
		isImageLoading,
	};
};
