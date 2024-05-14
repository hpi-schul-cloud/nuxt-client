import { useBoardApi } from "./BoardApi.composable";
import { AnyContentElement } from "@/types/board/ContentElement";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useContentElementStore = defineStore("contentElementStore", () => {
	const elements = ref<AnyContentElement[]>([]);
	const isLoading = ref<boolean>(false);
	const { updateElementCall } = useBoardApi();

	const addElement = (element: AnyContentElement) => {
		elements.value.push(element);
	};

	const removeElement = (elementId: string) => {
		const index = elements.value.findIndex(
			(element) => element.id === elementId
		);
		if (index !== -1) {
			elements.value.splice(index, 1);
		}
	};

	const updateElement = async (element: AnyContentElement) => {
		const item = elements.value.find((el) => el.id === element.id);
		if (!item) return;

		await updateElementCall(item);
	};

	// const modelValue = (elementId: string) => {
	// 	const element = elements.value.find((el) => el.id === elementId);
	// 	return toRef(element?.content);
	// };

	return {
		addElement,
		elements,
		isLoading,
		removeElement,
		updateElement,
		// modelValue,
	};
});
