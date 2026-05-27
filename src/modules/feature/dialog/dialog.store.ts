import {
	type AwaitableResult,
	type DialogKey,
	type DialogProps,
	dialogRegistry,
	type DialogResult,
} from "./dialog-registry";
import { uniqueId } from "lodash-es";
import { defineStore } from "pinia";
import { markRaw, ref } from "vue";

type DialogRequest<K extends DialogKey> = {
	id: string;
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

export const useDialogStore = defineStore("dialogStore", () => {
	const activeDialog = ref<AnyDialogRequest>();
	const queue = ref<AnyDialogRequest[]>([]);

	const beginSettlement = (request: AnyDialogRequest, result: AwaitableResult<unknown>) => {
		if (request.id !== activeDialog.value?.id) return;
		if (request.resolved) return;
		if (request.pendingSettlement) return;

		request.pendingSettlement = result;
		request.modelValue = false;
	};

	const finalizeSettlement = (request: AnyDialogRequest) => {
		if (request.id !== activeDialog.value?.id) return;
		if (request.resolved) return;
		if (!request.pendingSettlement) return;

		request.resolved = true;
		activeDialog.value = undefined;

		request.resolve(request.pendingSettlement);

		activeDialog.value = queue.value.shift() ?? undefined;
	};

	const cancelDialog = (request: AnyDialogRequest) => {
		if (activeDialog.value?.id === request.id) {
			beginSettlement(request, { completed: false, data: undefined });
		} else {
			const index = queue.value.findIndex((r) => r.id === request.id);
			if (index !== -1) queue.value.splice(index, 1);
			if (!request.resolved) {
				request.resolved = true;
				request.resolve({ completed: false, data: undefined });
			}
		}
	};

	const createDialog = <K extends DialogKey>(
		type: K,
		props: DialogProps<K>
	): { result: Promise<AwaitableResult<DialogResult<K>>>; cancel: () => void } => {
		let resolvePromise!: (value: AwaitableResult<unknown>) => void;
		const result = new Promise<AwaitableResult<DialogResult<K>>>((resolve) => {
			resolvePromise = resolve as (value: AwaitableResult<unknown>) => void;
		});

		const item: DialogRequest<K> = {
			id: uniqueId(),
			type,
			props,
			modelValue: true,
			resolved: false,
			pendingSettlement: undefined,
			resolve: resolvePromise,
		};

		if (activeDialog.value === undefined) {
			activeDialog.value = item as AnyDialogRequest;
		} else {
			queue.value.push(item as AnyDialogRequest);
		}

		return { result, cancel: () => cancelDialog(item as AnyDialogRequest) };
	};

	const onCompleteDialog = <K extends DialogKey>(request: DialogRequest<K>, data: DialogResult<K>) => {
		beginSettlement(request as AnyDialogRequest, { completed: true, data });
	};

	const onCancelDialog = (request: AnyDialogRequest) => {
		beginSettlement(request, { completed: false, data: undefined });
	};

	const setDialogModelValue = (request: AnyDialogRequest, value: boolean) => {
		if (request.id !== activeDialog.value?.id) return;
		if (request.resolved) return;

		request.modelValue = value;

		if (value === false && !request.pendingSettlement) {
			request.pendingSettlement = { completed: false, data: undefined };
		}
	};

	const onDialogAfterLeave = (request: AnyDialogRequest) => {
		finalizeSettlement(request);
	};

	const cancelAllDialogsImmediately = () => {
		const active = activeDialog.value;
		const queued = [...queue.value];

		activeDialog.value = undefined;
		queue.value.splice(0, queue.value.length);

		if (active && !active.resolved) {
			active.resolved = true;
			active.resolve({ completed: false, data: undefined });
		}

		for (const item of queued) {
			if (item.resolved) continue;
			item.resolved = true;
			item.resolve({ completed: false, data: undefined });
		}
	};

	return {
		activeDialog,
		queue,
		registry: markRaw(dialogRegistry),
		createDialog,
		onCompleteDialog,
		onCancelDialog,
		setDialogModelValue,
		onDialogAfterLeave,
		cancelAllDialogsImmediately,
	};
});

export const openDialog = <K extends DialogKey>(type: K, props: DialogProps<K>) =>
	useDialogStore().createDialog(type, props).result;

export const openCancellableDialog = <K extends DialogKey>(type: K, props: DialogProps<K>) =>
	useDialogStore().createDialog(type, props);
