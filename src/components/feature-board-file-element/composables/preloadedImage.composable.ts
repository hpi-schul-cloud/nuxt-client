import { onMounted, ref } from "vue";

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
