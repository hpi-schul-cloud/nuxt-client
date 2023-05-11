import { CreateContentElementBodyTypeEnum } from "@/serverApi/v3";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export const useElementTypeSelection = () => {
	const askType = async (): Promise<
		CreateContentElementBodyTypeEnum | undefined
	> => {
		const promise = new Promise<CreateContentElementBodyTypeEnum | undefined>(
			(resolve) => {
				const { askInternal } = useInternalElementTypeSelection();
				askInternal(resolve);
			}
		);
		return promise;
	};

	return {
		askType,
	};
};

export const useInternalElementTypeSelection = createSharedComposable(() => {
	let returnResult:
		| ((value?: CreateContentElementBodyTypeEnum) => void)
		| undefined = undefined;

	const isDialogOpen = ref<boolean>(false);

	const select = (type?: CreateContentElementBodyTypeEnum) => {
		if (returnResult) {
			returnResult(type);
		}
		isDialogOpen.value = false;
	};

	const askInternal = (
		resolve: (type?: CreateContentElementBodyTypeEnum) => void
	) => {
		isDialogOpen.value = true;
		returnResult = resolve;
	};

	return {
		askInternal,
		isDialogOpen,
		select,
	};
});
