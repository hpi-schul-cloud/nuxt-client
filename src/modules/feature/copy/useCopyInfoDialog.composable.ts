import { CopyParamsTypeEnum } from "@/store/copy";
import { ref } from "vue";

export const useCopyInfoDialog = () => {
	let resolvePromise: ((confirmed: boolean) => void) | null = null;

	const isOpen = ref(false);
	const copyItemType = ref<CopyParamsTypeEnum>(CopyParamsTypeEnum.Course);

	const confirm = (type: CopyParamsTypeEnum): Promise<boolean> => {
		copyItemType.value = type;
		isOpen.value = true;

		return new Promise((resolve) => {
			resolvePromise = resolve;
		});
	};

	const onConfirmed = () => {
		isOpen.value = false;
		resolvePromise?.(true);
		resolvePromise = null;
	};

	const onCancelled = () => {
		isOpen.value = false;
		resolvePromise?.(false);
		resolvePromise = null;
	};

	return {
		isOpen,
		copyItemType,
		confirm,
		onConfirmed,
		onCancelled,
	};
};
