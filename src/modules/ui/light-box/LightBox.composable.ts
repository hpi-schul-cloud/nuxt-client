import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export interface LightBoxOptions {
	downloadUrl: string;
	previewUrl: string;
	alt: string;
	name: string;
}

export const useLightBox = () => {
	const { isLightBoxOpen, openInternal } = useInternalLightBox();

	const open = (data: LightBoxOptions) => {
		openInternal(data);
	};

	return {
		isLightBoxOpen,
		open,
	};
};

export const useInternalLightBox = createSharedComposable(() => {
	const isLightBoxOpen = ref<boolean>(false);
	const lightBoxOptions = ref<LightBoxOptions>({
		downloadUrl: "",
		previewUrl: "",
		alt: "",
		name: "",
	});

	const close = () => {
		lightBoxOptions.value = {
			downloadUrl: "",
			previewUrl: "",
			alt: "",
			name: "",
		};
		isLightBoxOpen.value = false;
	};

	const openInternal = (options: LightBoxOptions) => {
		lightBoxOptions.value = options;
		isLightBoxOpen.value = true;
	};

	return {
		close,
		isLightBoxOpen,
		lightBoxOptions,
		openInternal,
	};
});
