import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { AddCardElement } from "../state/CardState.composable";
import { useFilePicker } from "./FilePicker.composable";

type CreateElementFn = (addElement: AddCardElement) => Promise<void>;

export const useElementTypeSelection = () => {
	const getCreateFn = async (): Promise<CreateElementFn | undefined> => {
		const promise = new Promise<CreateElementFn | undefined>((resolve) => {
			const { askType } = useInternalElementTypeSelection();
			askType(resolve);
		});
		return promise;
	};

	return {
		getCreateFn,
	};
};

export const useInternalElementTypeSelection = createSharedComposable(() => {
	const { triggerFilePicker } = useFilePicker();
	const isDialogOpen = ref<boolean>(false);

	let resolveWithCreateFunction:
		| ((createElementFn?: CreateElementFn) => void)
		| undefined;

	const createTextElement = async (addElement: AddCardElement) => {
		await addElement(ContentElementType.Text);
	};

	const createFileElement = async (addElement: AddCardElement) => {
		triggerFilePicker();
		await addElement(ContentElementType.File);
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

	const askType = (resolve: (value?: CreateElementFn) => void) => {
		isDialogOpen.value = true;
		resolveWithCreateFunction = resolve;
	};

	const closeDialog = () => {
		returnCreateFunction();
	};

	return {
		askType,
		isDialogOpen,
		elementTypeOptions,
		closeDialog,
	};
});
