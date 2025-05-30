import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export enum LightBoxContentType {
	IMAGE = "image",
	AUDIO = "audio",
	VIDEO = "video",
}

export interface LightBoxOptions {
	type: LightBoxContentType;
	downloadUrl: string;
	name: string;
	previewUrl?: string;
	alt?: string;
}

export const useLightBox = createSharedComposable(() => {
	const isLightBoxOpen = ref<boolean>(false);
	const lightBoxOptions = ref<LightBoxOptions>();

	const open = (options: LightBoxOptions) => {
		lightBoxOptions.value = options;
		isLightBoxOpen.value = true;
	};

	const close = () => {
		isLightBoxOpen.value = false;
	};

	return {
		open,
		close,
		isLightBoxOpen,
		lightBoxOptions,
	};
});
