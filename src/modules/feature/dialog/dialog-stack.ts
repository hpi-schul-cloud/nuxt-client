import { DialogKey, DialogRegistry, dialogRegistry } from "./dialog-registry";
import type { AwaitableResult, PropsOf, ResultOf } from "./dialog-types";
import { ref } from "vue";

type PendingSettlement = { completed: true; data: unknown } | { completed: false; data: undefined } | null;

type StackItem<K extends DialogKey = DialogKey> = {
	id: number;
	type: K;
	props: PropsOf<DialogRegistry[K]>;
	modelValue: boolean;
	resolved: boolean;
	pendingSettlement: PendingSettlement;
	resolve: (value: AwaitableResult<unknown>) => void;
};

const stack = ref<StackItem[]>([]);

let nextId = 1;

const findDialog = (id: number) => stack.value.find((item) => item.id === id);

const findDialogIndex = (id: number) => stack.value.findIndex((item) => item.id === id);

const beginSettlement = (id: number, result: PendingSettlement) => {
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

	(item.resolve as (value: AwaitableResult<unknown>) => void)(item.pendingSettlement);
};

export const openDialog = <K extends DialogKey>(
	type: K,
	props: PropsOf<DialogRegistry[K]>
): Promise<AwaitableResult<ResultOf<DialogRegistry[K]>>> => {
	console.log("Opening dialog:", type, props);
	return new Promise((resolve) => {
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
};

export const completeDialog = <K extends DialogKey>(id: number, data: ResultOf<DialogRegistry[K]>) => {
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
		(item.resolve as (value: AwaitableResult<unknown>) => void)({
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
