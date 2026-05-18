import { dialogRegistry } from "./dialog-registry";
import type { AwaitableResult, DialogKey, DialogProps, DialogResult } from "./dialog-types";
import { ref } from "vue";

type StackItem<K extends DialogKey = DialogKey> = {
	id: number;
	type: K;
	props: DialogProps<K>;
	modelValue: boolean;
	resolved: boolean;
	pendingSettlement: AwaitableResult<DialogResult<K>> | null;
	resolve: (value: AwaitableResult<unknown>) => void;
};

const stack = ref<StackItem[]>([]);

let nextId = 1;

const findDialog = (id: number) => stack.value.find((item) => item.id === id);

const findDialogIndex = (id: number) => stack.value.findIndex((item) => item.id === id);

const beginSettlement = <K extends DialogKey>(id: number, result: AwaitableResult<DialogResult<K>>) => {
	const item = findDialog(id);
	if (!item) return;
	if (item.resolved) return;
	if (item.pendingSettlement) return;

	item.pendingSettlement = result;
	item.modelValue = false;
};

const finalizeSettlement = (id: number) => {
	const index = findDialogIndex(id);
	if (index === -1) return;

	const item = stack.value[index];
	if (item.resolved) return;
	if (!item.pendingSettlement) return;

	item.resolved = true;
	stack.value.splice(index, 1);

	item.resolve(item.pendingSettlement);
};

export const openDialog = <K extends DialogKey>(
	type: K,
	props: DialogProps<K>
): Promise<AwaitableResult<DialogResult<K>>> =>
	new Promise((resolve) => {
		stack.value.push({
			id: nextId++,
			type,
			props,
			modelValue: true,
			resolved: false,
			pendingSettlement: null,
			resolve: resolve as (value: AwaitableResult<unknown>) => void,
		});
	});

export const completeDialog = <K extends DialogKey>(id: number, data: DialogResult<K>) => {
	beginSettlement(id, { completed: true, data });
};

export const cancelDialog = (id: number) => {
	beginSettlement(id, { completed: false, data: undefined });
};

export const setDialogModelValue = (id: number, value: boolean) => {
	const item = findDialog(id);
	if (!item) return;
	if (item.resolved) return;

	item.modelValue = value;

	// If something external caused the dialog to close,
	// treat it as cancellation unless settlement is already in progress.
	if (value === false && !item.pendingSettlement) {
		item.pendingSettlement = { completed: false, data: undefined };
	}
};

export const onDialogAfterLeave = (id: number) => {
	finalizeSettlement(id);
};

export const cancelAllDialogsImmediately = () => {
	const items = [...stack.value];
	stack.value.splice(0, stack.value.length);

	for (const item of items) {
		if (item.resolved) continue;
		item.resolved = true;
		item.resolve({
			completed: false,
			data: undefined,
		});
	}
};

export const useDialogStack = () => ({
	stack,
	registry: dialogRegistry,
	openDialog,
	completeDialog,
	cancelDialog,
	setDialogModelValue,
	onDialogAfterLeave,
	cancelAllDialogsImmediately,
});
