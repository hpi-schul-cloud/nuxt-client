import { openCancellableDialog, openDialog, useDialogStore } from "./dialog.store";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";

describe("useDialogStore", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	const openConfirmation = (title = "Test") => useDialogStore().createDialog("confirmation", { title });

	describe("createDialog", () => {
		it("sets the created request as the active dialog", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "First" });

			expect(store.activeDialog).toBeDefined();
			expect(store.activeDialog?.type).toBe("confirmation");
			expect((store.activeDialog?.props as { title: string }).title).toBe("First");
		});

		it("sets modelValue to true on the created dialog", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });

			expect(store.activeDialog?.modelValue).toBe(true);
		});

		it("queues a second dialog when one is already active", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "First" });
			store.createDialog("confirmation", { title: "Second" });

			expect(store.queue).toHaveLength(1);
			expect((store.queue[0].props as { title: string }).title).toBe("Second");
		});

		it("returns a pending result promise", async () => {
			let resolved = false;
			const { result } = openConfirmation();
			result.then(() => (resolved = true));

			await flushPromises();
			expect(resolved).toBe(false);
		});

		it("returns a cancel function", () => {
			const { cancel } = openConfirmation();
			expect(typeof cancel).toBe("function");
		});
	});

	describe("onCompleteDialog", () => {
		it("sets pendingSettlement to completed: true with the provided data", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;

			store.onCompleteDialog(request, true);

			expect(request.pendingSettlement).toEqual({ completed: true, data: true });
		});

		it("sets modelValue to false", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;

			store.onCompleteDialog(request, true);

			expect(request.modelValue).toBe(false);
		});

		it("does nothing when called for a non-active request", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Active" });
			store.createDialog("confirmation", { title: "Queued" });
			const queuedRequest = store.queue[0];

			store.onCompleteDialog(queuedRequest as never, true);

			expect(queuedRequest.pendingSettlement).toBeUndefined();
		});

		it("does nothing when the request is already resolved", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;
			request.resolved = true;

			store.onCompleteDialog(request, true);

			expect(request.pendingSettlement).toBeUndefined();
		});

		it("does nothing when a pending settlement already exists", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;
			store.onCancelDialog(request);

			store.onCompleteDialog(request, true);

			expect(request.pendingSettlement).toEqual({ completed: false, data: undefined });
		});
	});

	describe("onCancelDialog", () => {
		it("sets pendingSettlement to completed: false", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;

			store.onCancelDialog(request);

			expect(request.pendingSettlement).toEqual({ completed: false, data: undefined });
		});

		it("sets modelValue to false", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;

			store.onCancelDialog(request);

			expect(request.modelValue).toBe(false);
		});

		it("does nothing when called for a non-active request", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Active" });
			store.createDialog("confirmation", { title: "Queued" });
			const queuedRequest = store.queue[0];

			store.onCancelDialog(queuedRequest);

			expect(queuedRequest.pendingSettlement).toBeUndefined();
		});
	});

	describe("onDialogAfterLeave", () => {
		it("resolves the result promise with the pending settlement", async () => {
			const store = useDialogStore();
			const { result } = store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;
			store.onCompleteDialog(request, true);

			store.onDialogAfterLeave(request);
			await flushPromises();

			expect(await result).toEqual({ completed: true, data: true });
		});

		it("clears the active dialog after finalization", async () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;
			store.onCancelDialog(request);

			store.onDialogAfterLeave(request);
			await flushPromises();

			expect(store.activeDialog).toBeUndefined();
		});

		it("promotes the next queued dialog to active", async () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "First" });
			store.createDialog("confirmation", { title: "Second" });
			const firstRequest = store.activeDialog!;
			store.onCompleteDialog(firstRequest, true);

			store.onDialogAfterLeave(firstRequest);
			await flushPromises();

			expect(store.activeDialog).toBeDefined();
			expect((store.activeDialog?.props as { title: string }).title).toBe("Second");
			expect(store.queue).toHaveLength(0);
		});

		it("does nothing when request is not the active dialog", async () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Active" });
			store.createDialog("confirmation", { title: "Queued" });
			const queuedRequest = store.queue[0];

			store.onDialogAfterLeave(queuedRequest);
			await flushPromises();

			expect(store.activeDialog).toBeDefined();
		});

		it("does nothing when there is no pending settlement", async () => {
			const store = useDialogStore();
			const { result } = store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;

			let resolved = false;
			result.then(() => (resolved = true));
			store.onDialogAfterLeave(request);
			await flushPromises();

			expect(resolved).toBe(false);
			expect(store.activeDialog).toBeDefined();
		});
	});

	describe("setDialogModelValue", () => {
		it("updates the modelValue on the active dialog", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;

			store.setDialogModelValue(request, false);

			expect(request.modelValue).toBe(false);
		});

		it("sets pendingSettlement to cancelled when modelValue is set to false with no existing settlement", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;

			store.setDialogModelValue(request, false);

			expect(request.pendingSettlement).toEqual({ completed: false, data: undefined });
		});

		it("does not overwrite an existing pending settlement when modelValue is set to false", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;
			store.onCompleteDialog(request, true);

			store.setDialogModelValue(request, false);

			expect(request.pendingSettlement).toEqual({ completed: true, data: true });
		});

		it("does nothing when request is not the active dialog", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Active" });
			store.createDialog("confirmation", { title: "Queued" });
			const queuedRequest = store.queue[0];

			store.setDialogModelValue(queuedRequest, false);

			expect(queuedRequest.modelValue).toBe(true);
		});

		it("does nothing when the dialog is already resolved", () => {
			const store = useDialogStore();
			store.createDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;
			request.resolved = true;

			store.setDialogModelValue(request, false);

			expect(request.modelValue).toBe(true);
		});
	});

	describe("cancel() function returned by createDialog", () => {
		describe("when the dialog is active", () => {
			it("resolves the result promise immediately with completed: false", async () => {
				const store = useDialogStore();
				const { result, cancel } = store.createDialog("confirmation", { title: "Test" });

				cancel();
				await flushPromises();

				expect(await result).toEqual({ completed: false, data: undefined });
			});
		});

		describe("when the dialog is in the queue", () => {
			it("removes it from the queue", () => {
				const store = useDialogStore();
				store.createDialog("confirmation", { title: "Active" });
				const { cancel } = store.createDialog("confirmation", { title: "Queued" });

				cancel();

				expect(store.queue).toHaveLength(0);
			});

			it("resolves the result promise immediately with completed: false", async () => {
				const store = useDialogStore();
				store.createDialog("confirmation", { title: "Active" });
				const { result, cancel } = store.createDialog("confirmation", { title: "Queued" });

				cancel();
				await flushPromises();

				expect(await result).toEqual({ completed: false, data: undefined });
			});
		});
	});

	describe("cancelAllDialogsImmediately", () => {
		it("resolves the active dialog as cancelled immediately", async () => {
			const store = useDialogStore();
			const { result } = openConfirmation();

			store.cancelAllDialogsImmediately();
			await flushPromises();

			expect(await result).toEqual({ completed: false, data: undefined });
		});

		it("resolves all queued dialogs as cancelled immediately", async () => {
			const store = useDialogStore();
			openConfirmation("Active");
			const { result: result2 } = openConfirmation("Second");
			const { result: result3 } = openConfirmation("Third");

			store.cancelAllDialogsImmediately();
			await flushPromises();

			expect(await result2).toEqual({ completed: false, data: undefined });
			expect(await result3).toEqual({ completed: false, data: undefined });
		});

		it("clears the active dialog and queue", () => {
			const store = useDialogStore();
			openConfirmation("Active");
			openConfirmation("Queued");

			store.cancelAllDialogsImmediately();

			expect(store.activeDialog).toBeUndefined();
			expect(store.queue).toHaveLength(0);
		});

		it("does not reject already-resolved dialogs a second time", async () => {
			const store = useDialogStore();
			const { result } = openConfirmation();
			const request = store.activeDialog!;
			store.onCompleteDialog(request, true);
			store.onDialogAfterLeave(request);
			await flushPromises();

			// dialog is already resolved — calling cancel again should not change the result
			store.cancelAllDialogsImmediately();
			await flushPromises();

			expect(await result).toEqual({ completed: true, data: true });
		});
	});

	describe("openDialog", () => {
		it("returns a promise that resolves when the dialog is completed", async () => {
			const store = useDialogStore();
			const result = openDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;
			store.onCompleteDialog(request, true);
			store.onDialogAfterLeave(request);
			await flushPromises();

			expect(await result).toEqual({ completed: true, data: true });
		});
	});

	// ─── openCancellableDialog (module export) ────────────────────────────────────

	describe("openCancellableDialog", () => {
		it("returns a result promise and a cancel function", () => {
			const { result, cancel } = openCancellableDialog("confirmation", { title: "Test" });

			expect(result).toBeInstanceOf(Promise);
			expect(typeof cancel).toBe("function");
		});

		it("the cancel function resolves the result as cancelled", async () => {
			const store = useDialogStore();
			const { result, cancel } = openCancellableDialog("confirmation", { title: "Test" });
			const request = store.activeDialog!;

			cancel();
			store.onDialogAfterLeave(request);
			await flushPromises();

			expect(await result).toEqual({ completed: false, data: undefined });
		});
	});
});
