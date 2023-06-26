import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

interface DeleteConfirmationOptions {
	message: string;
}

export const useDeleteConfirmation = () => {
	const { askInternal, isDialogOpen } = useInternalDeleteConfirmation();

	const askConfirmation = async (
		data: DeleteConfirmationOptions
	): Promise<boolean> => {
		const promise = new Promise<boolean>((resolve) => {
			askInternal(data, resolve);
		});
		return promise;
	};

	return {
		askConfirmation,
		isDialogOpen,
	};
};

export const useInternalDeleteConfirmation = createSharedComposable(() => {
	let returnResult: ((value: boolean) => void) | undefined = undefined;

	const dialogOptions = ref<DeleteConfirmationOptions | undefined>(undefined);
	const isDialogOpen = ref<boolean>(false);

	const confirm = () => {
		if (returnResult) {
			returnResult(true);
		}
		dialogOptions.value = undefined;
		isDialogOpen.value = false;
	};

	const cancel = () => {
		if (returnResult) {
			returnResult(false);
		}
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
