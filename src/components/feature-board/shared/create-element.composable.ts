import { ref } from "vue";
import { ContentElementType } from "../types/ContentElement";

export interface CreateElementItems {
	icon: string;
	label: string;
	action?: string;
	testId: string;
	type: ContentElementType;
}
export const useCreateElement = () => {
	const isDialogOpen = ref<boolean>(false);

	const items = ref<CreateElementItems[]>([
		{
			icon: "",
			label: "create-element.text",
			action: "",
			testId: "create-element-text",
			type: ContentElementType.TEXT,
		},
		{
			icon: "",
			label: "create-element.file",
			action: "",
			testId: "create-element-file",
			type: ContentElementType.FILE,
		},
		{
			icon: "",
			label: "create-element.test",
			action: "",
			testId: "create-element-test",
			type: ContentElementType.TEXT,
		},
	]);

	const openDialog = () => {
		isDialogOpen.value = true;
		console.log("openDialog", isDialogOpen.value);
	};

	return {
		isDialogOpen,
		openDialog,
		items,
	};
};
