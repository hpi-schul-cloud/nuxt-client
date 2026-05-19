import { dialogRegistry } from "./dialog-registry";
import type { AwaitableResult, DialogKey, DialogProps, DialogResult } from "./dialog-types";
import { markRaw, ref } from "vue";

type DialogRequest<K extends DialogKey = DialogKey> = {
	id: number;
	type: K;
	props: DialogProps<K>;
	modelValue: boolean;
	resolved: boolean;
	pendingSettlement: AwaitableResult<unknown> | undefined;
	resolve: (value: AwaitableResult<unknown>) => void;
};

type AnyDialogRequest = {
	[K in DialogKey]: DialogRequest<K>;
}[DialogKey];

const activeDialog = ref<AnyDialogRequest | undefined>(undefined);
const queue = ref<AnyDialogRequest[]>([]);

let nextId = 1;

const activateNextDialog = () => {
	if (activeDialog.value || queue.value.length === 0) return;
	activeDialog.value = queue.value.shift() ?? undefined;
};

const beginSettlement = <K extends DialogKey>(id: number, result: AwaitableResult<DialogResult<K>>) => {
	const item = activeDialog.value;
	if (!item) return;
	if (item.id !== id) return;
	if (item.resolved) return;
	if (item.pendingSettlement) return;

	item.pendingSettlement = result;
	item.modelValue = false;
};

const finalizeSettlement = (id: number) => {
	const item = activeDialog.value;
	if (!item) return;
	if (item.id !== id) return;
	if (item.resolved) return;
	if (!item.pendingSettlement) return;

	item.resolved = true;
	activeDialog.value = undefined;

	item.resolve(item.pendingSettlement);

	activateNextDialog();
};

export const openDialog = <K extends DialogKey>(
	type: K,
	props: DialogProps<K>
): Promise<AwaitableResult<DialogResult<K>>> =>
	new Promise((resolve) => {
		const item: DialogRequest<K> = {
			id: nextId++,
			type,
			props,
			modelValue: true,
			resolved: false,
			pendingSettlement: undefined,
			resolve: resolve as (value: AwaitableResult<unknown>) => void,
		};

		if (activeDialog.value === undefined) {
			activeDialog.value = item as AnyDialogRequest;
		} else {
			queue.value.push(item as AnyDialogRequest);
		}
	});

export const completeDialog = <K extends DialogKey>(id: number, data: DialogResult<K>) => {
	beginSettlement(id, { completed: true, data });
};

export const cancelDialog = (id: number) => {
	beginSettlement(id, { completed: false, data: undefined });
};

export const setDialogModelValue = (id: number, value: boolean) => {
	const item = activeDialog.value;
	if (!item) return;
	if (item.id !== id) return;
	if (item.resolved) return;

	item.modelValue = value;

	if (value === false && !item.pendingSettlement) {
		item.pendingSettlement = markRaw({ completed: false, data: undefined });
	}
};

export const onDialogAfterLeave = (id: number) => {
	finalizeSettlement(id);
};

export const cancelAllDialogsImmediately = () => {
	const active = activeDialog.value;
	const queued = [...queue.value];

	activeDialog.value = undefined;
	queue.value.splice(0, queue.value.length);

	if (active && !active.resolved) {
		active.resolved = true;
		active.resolve({
			completed: false,
			data: undefined,
		});
	}

	for (const item of queued) {
		if (item.resolved) continue;
		item.resolved = true;
		item.resolve({
			completed: false,
			data: undefined,
		});
	}
};

export const useDialogManager = () => ({
	activeDialog,
	queue,
	registry: dialogRegistry,
	openDialog,
	completeDialog,
	cancelDialog,
	setDialogModelValue,
	onDialogAfterLeave,
	cancelAllDialogsImmediately,
});
