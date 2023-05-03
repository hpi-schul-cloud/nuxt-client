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
<<<<<<< HEAD
		returnResult ? returnResult(true) : null;
=======
		if (returnResult) {
			returnResult(true);
		}
>>>>>>> 86bcc52f05cd70880b95a6af77f70f8306f60242
		dialogOptions.value = undefined;
		isDialogOpen.value = false;
	};

	const cancel = () => {
<<<<<<< HEAD
		returnResult ? returnResult(false) : null;
=======
		if (returnResult) {
			returnResult(false);
		}
>>>>>>> 86bcc52f05cd70880b95a6af77f70f8306f60242
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
