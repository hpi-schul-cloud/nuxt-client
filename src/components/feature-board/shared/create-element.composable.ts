import { CreateContentElementBodyTypeEnum } from "@/serverApi/v3";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { useCardState } from "../state/CardState.composable";

export const useCreateElement = createSharedComposable(() => {
	const isDialogOpen = ref<boolean>(false);
	const cardId = ref<string | undefined>(undefined);

	const getElementAction = () => {
		if (cardId.value) {
			const { addElement } = useCardState(cardId.value);

			return { addElement };
		}
		throw new Error("ID unknown");
	};

	const openDialog = (id: string) => {
		cardId.value = id;
		isDialogOpen.value = true;
		console.log("openDialog", isDialogOpen.value);
	};

	const addTextElement = async () => {
		const { addElement } = getElementAction();
		const result = await addElement(CreateContentElementBodyTypeEnum.Text);

		console.log(result);
	};

	const addFileElement = () => {
		console.log("addFileElement");
	};

	return {
		isDialogOpen,
		openDialog,
		addTextElement,
		addFileElement,
	};
});
