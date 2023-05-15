import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { AddCardElement } from "../state/CardState.composable";
import { useFilePicker } from "./FilePicker.composable";

type CreateElementFn = (addElement: AddCardElement) => void;

export const useElementTypeSelection = () => {
	const askType = async (): Promise<CreateElementFn | undefined> => {
		const promise = new Promise<CreateElementFn | undefined>((resolve) => {
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

	let resolveWithCreateFunction:
		| ((createElementFn?: CreateElementFn) => void)
		| undefined = undefined;

	const createTextElement = (addElement: AddCardElement) => {
		addElement(ContentElementType.Text);
	};

	const createFileElement = (addElement: AddCardElement) => {
		triggerFilePicker();
	};

	const returnCreateFunction = (createElementFn?: CreateElementFn) => {
		if (resolveWithCreateFunction) {
			resolveWithCreateFunction(createElementFn);
		}

		isDialogOpen.value = false;
	};

	const elementTypeOptions = [
		{
			icon: mdiFormatSize,
			label: "components.elementTypeSelection.elements.textElement.subtitle",
			action: () => returnCreateFunction(createTextElement),
			testId: "create-element-text",
		},
		{
			icon: mdiUpload,
			label: "components.elementTypeSelection.elements.fileElement.subtitle",
			action: () => returnCreateFunction(createFileElement),
			testId: "create-element-file",
		},
	];

	const askInternal = (resolve: (value?: CreateElementFn) => void) => {
		isDialogOpen.value = true;
		resolveWithCreateFunction = resolve;
	};

	const closeDialog = () => {
		returnCreateFunction();
	};

	return {
		askInternal,
		isDialogOpen,
		elementTypeOptions,
		closeDialog,
	};
});
