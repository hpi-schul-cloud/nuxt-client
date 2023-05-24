import { ContentElementType } from "@/serverApi/v3";
import { mdiFormatSize, mdiUpload } from "@mdi/js";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { AddCardElement } from "../state/CardState.composable";
import { useFilePicker } from "./FilePicker.composable";
import { filesPOCModule } from "@/store";
import { FileRecordParamsParentType } from "@/fileStorageApi/v3";

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
	let addElementFunction: AddCardElement | undefined;

	const createTextElement = async (addElement: AddCardElement) => {
		await addElement(ContentElementType.Text);
	};

	const openFilePicker = async (addElement: AddCardElement) => {
		addElementFunction = addElement;
		triggerFilePicker();
	};

	const createFileElement = async (file: File) => {
		if (addElementFunction && file) {
			const result = await addElementFunction(ContentElementType.File);
			console.log("result", result);
			// TODO: upload multiple files at once? File array?
			if (result?.id) {
				await filesPOCModule.upload(
					result.id,
					FileRecordParamsParentType.BOARDNODES,
					file
				);
				console.log("filesPOCModule.files", filesPOCModule.files);
				console.log("filesPOCModule.status", filesPOCModule.status);
				console.log(
					"filesPOCModule.businessError",
					filesPOCModule.businessError
				);
				// 	result.fileRecord = fileRecordResponse;
				//	result.showProgress = true; // until upload is finished
			}
		}
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
			action: () => returnCreateFunction(openFilePicker),
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
		createFileElement,
	};
});
