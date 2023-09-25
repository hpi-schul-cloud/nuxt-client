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

	const open = async (data: LightBoxOptions): Promise<boolean> => {
		const promise = new Promise<boolean>((resolve) => {
			openInternal(data, resolve);
		});
		return promise;
	};

	return {
		isLightBoxOpen,
		open,
	};
};

export const useInternalLightBox = createSharedComposable(() => {
	let returnResult: ((value: boolean) => void) | undefined = undefined;

	const isLightBoxOpen = ref<boolean>(false);
	const lightBoxOptions = ref<LightBoxOptions | undefined>(undefined);

	const close = () => {
		if (returnResult) {
			returnResult(false);
		}
		lightBoxOptions.value = undefined;
		isLightBoxOpen.value = false;
	};

	const openInternal = (
		options: LightBoxOptions,
		resolve: (value: boolean) => void
	) => {
		lightBoxOptions.value = options;
		isLightBoxOpen.value = true;
		returnResult = resolve;
	};

	return {
		close,
		isLightBoxOpen,
		lightBoxOptions,
		openInternal,
	};
});
