import { CopyParamsTypeEnum } from "@/store/copy";
import { useLoadingStore } from "@data-app";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useCopyFlow = () => {
	let resolvePromise: ((confirmed: boolean) => void) | null = null;

	const isDialogOpen = ref(false);
	const copyItemType = ref<CopyParamsTypeEnum>(CopyParamsTypeEnum.Course);

	const confirm = (type: CopyParamsTypeEnum): Promise<boolean> => {
		copyItemType.value = type;
		isDialogOpen.value = true;

		return new Promise((resolve) => {
			resolvePromise = resolve;
		});
	};

	const onConfirmed = () => {
		isDialogOpen.value = false;
		resolvePromise?.(true);
		resolvePromise = null;
	};

	const onCancelled = () => {
		isDialogOpen.value = false;
		resolvePromise?.(false);
		resolvePromise = null;
	};

	const { withLoadingState } = useLoadingStore();
	const { t } = useI18n();
	const withCopyLoading = <T>(fn: () => Promise<T>) =>
		withLoadingState(fn, t("components.molecules.copyResult.title.loading"));

	return {
		isDialogOpen,
		copyItemType,
		confirm,
		onConfirmed,
		onCancelled,
		withCopyLoading,
	};
};
