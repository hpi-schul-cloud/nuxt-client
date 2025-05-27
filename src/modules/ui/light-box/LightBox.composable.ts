import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export enum LightBoxContentType {
	IMAGE = "image",
	AUDIO = "audio",
}

export interface LightBoxOptions {
	type: LightBoxContentType;
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
	const lightBoxOptions = ref<LightBoxOptions>();

	const close = () => {
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
