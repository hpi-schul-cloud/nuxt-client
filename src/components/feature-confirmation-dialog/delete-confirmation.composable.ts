import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

interface DeleteConfirmationOptions {
	message: string;
}

export const useDeleteConfirmation = () => {
	const askConfirmation = async (
		data: DeleteConfirmationOptions
	): Promise<boolean> => {
		const promise = new Promise<boolean>((resolve) => {
			const { askInternal } = useInternalDeleteConfirmation();
			askInternal(data, resolve);
		});
		return promise;
	};

	return {
		askConfirmation,
	};
};

export const useInternalDeleteConfirmation = createSharedComposable(() => {
	let returnResult: ((value: boolean) => void) | undefined = undefined;

	const dialogOptions = ref<DeleteConfirmationOptions | undefined>(undefined);
	const isDialogOpen = ref<boolean>(false);

	const confirm = () => {
		returnResult ? returnResult(true) : null;
		dialogOptions.value = undefined;
		isDialogOpen.value = false;
	};

	const cancel = () => {
		returnResult ? returnResult(false) : null;
		dialogOptions.value = undefined;
		isDialogOpen.value = false;
	};

	const askInternal = (
		options: DeleteConfirmationOptions,
		resolve: (value: boolean) => void
	) => {
		dialogOptions.value = options;
		isDialogOpen.value = true;
		returnResult = resolve;
	};

	return {
		askInternal,
		dialogOptions,
		isDialogOpen,
		confirm,
		cancel,
	};
});
