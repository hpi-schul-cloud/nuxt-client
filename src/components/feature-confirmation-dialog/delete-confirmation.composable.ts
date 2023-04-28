import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

interface DeleteConfirmationOptions {
	message: string;
}

export const useDeleteConfirmation = () => {
	const askConfirmation = async (data: DeleteConfirmationOptions) => {
		const promise = new Promise<void>((resolve, reject) => {
			const { askInternal } = useInternalDeleteConfirmation();
			askInternal(data, resolve, reject);
		});
		return promise;
	};

	return {
		askConfirmation,
	};
};

export const useInternalDeleteConfirmation = createSharedComposable(() => {
	let confirmInternal: (() => void) | undefined = undefined;
	let cancelInternal: (() => void) | undefined = undefined;

	const dialogOptions = ref<DeleteConfirmationOptions | undefined>(undefined);
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
		options: DeleteConfirmationOptions,
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
