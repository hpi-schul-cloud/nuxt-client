import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

interface DialogOptions {
	message: string;
}

export const useDeleteConfirmation = () => {
	const ask = async (data: DialogOptions) => {
		const promise = new Promise<void>((resolve, reject) => {
			const { askInternal } = useInternalDeleteConfirmation();
			askInternal(data, resolve, reject);
		});
		return promise;
	};

	return {
		ask,
	};
};

export const useInternalDeleteConfirmation = createSharedComposable(() => {
	let confirmInternal: (() => void) | undefined = undefined;
	let cancelInternal: (() => void) | undefined = undefined;

	const dialogOptions = ref<DialogOptions | undefined>(undefined);
	const isDialogOpen = ref<boolean>(false);

	const confirm = () => {
		confirmInternal ? confirmInternal() : null;
		dialogOptions.value = undefined;
		isDialogOpen.value = false;
	};

	const cancel = () => {
		cancelInternal ? cancelInternal() : null;
		dialogOptions.value = undefined;
		isDialogOpen.value = false;
	};

	const askInternal = (
		options: DialogOptions,
		resolve: () => void,
		reject: () => void
	) => {
		dialogOptions.value = options;
		isDialogOpen.value = true;
		confirmInternal = resolve;
		cancelInternal = reject;
	};

	return {
		askInternal,
		dialogOptions,
		isDialogOpen,
		confirm,
		cancel,
	};
});
