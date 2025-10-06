import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

interface ConfirmationOptions {
	message: string;
	confirmActionLangKey?: string;
}

export const useConfirmationDialog = () => {
	const { askInternal, isDialogOpen } = useInternalConfirmationDialog();

	const askConfirmation = async (data: ConfirmationOptions): Promise<boolean> => {
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

export const useInternalConfirmationDialog = createSharedComposable(() => {
	let returnResult: ((value: boolean) => void) | undefined = undefined;

	const dialogOptions = ref<ConfirmationOptions | undefined>(undefined);
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

	const askInternal = (options: ConfirmationOptions, resolve: (value: boolean) => void) => {
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
