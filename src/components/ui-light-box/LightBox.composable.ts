import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

interface LightBoxOptions {
	url: string;
	previewUrl: string;
	alt: string;
	name?: string;
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
	const lightBoxOptions = ref<LightBoxOptions | undefined>(undefined);

	const close = () => {
		lightBoxOptions.value = undefined;
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
