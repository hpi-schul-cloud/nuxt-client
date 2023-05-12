import { CreateContentElementBodyTypeEnum } from "@/serverApi/v3";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { useFilePicker } from "./FilePicker.composable";

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
	const { triggerFilePicker } = useFilePicker();
	const isDialogOpen = ref<boolean>(false);

	let resolveWithCreateFunction: ((addElement?: any) => void) | undefined =
		undefined;

	const createTextElement = (addElement: any) => {
		addElement(CreateContentElementBodyTypeEnum.Text);
	};

	const createFileElement = (addElement: any) => {
		triggerFilePicker();
	};

	const returnCreateFunction = (addElement?: any) => {
		if (resolveWithCreateFunction) {
			resolveWithCreateFunction(addElement);
		}

		isDialogOpen.value = false;
	};

	const buttons = [
		{
			icon: "",
			label: "create-element.text",
			action: () => returnCreateFunction(createTextElement),
			testId: "create-element-text",
		},
		{
			icon: "",
			label: "create-element.file",
			action: () => returnCreateFunction(createFileElement),
			testId: "create-element-file",
		},
	];

	const askInternal = (resolve: (addElement?: any) => void) => {
		isDialogOpen.value = true;
		resolveWithCreateFunction = resolve;
	};

	const closeDialog = () => {
		isDialogOpen.value = false;
	};

	return {
		askInternal,
		isDialogOpen,
		buttons,
		closeDialog,
	};
});
