import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export const useElementTypeSelection = () => {
	const askType = async (): Promise<any | undefined> => {
		const promise = new Promise<any | undefined>((resolve) => {
			const { askInternal } = useInternalElementTypeSelection();
			askInternal(resolve);
		});
		return promise;
	};

	return {
		askType,
	};
};

export const useInternalElementTypeSelection = createSharedComposable(() => {
	let returnResult: ((addElement?: any) => void) | undefined = undefined;

	const isDialogOpen = ref<boolean>(false);

	const select = (addElement?: any) => {
		if (returnResult) {
			returnResult(addElement);
		}
		isDialogOpen.value = false;
	};

	const askInternal = (resolve: (addElement?: any) => void) => {
		isDialogOpen.value = true;
		returnResult = resolve;
	};

	return {
		askInternal,
		isDialogOpen,
		select,
	};
});
