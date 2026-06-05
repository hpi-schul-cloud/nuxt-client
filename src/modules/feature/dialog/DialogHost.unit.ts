import { useDialogStore } from "./dialog.store";
import DialogHost from "./DialogHost.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { defineComponent, nextTick } from "vue";
import { createRouterMock, injectRouterMock, RouterMock } from "vue-router-mock";

const DialogStub = defineComponent({
	props: { modelValue: Boolean },
	emits: ["update:modelValue", "complete", "cancel", "after-leave"],
	template: `<div data-testid="dialog-stub" />`,
});

const globalStubs = {
	ConfirmationDialog: DialogStub,
	CopyDialog: DialogStub,
	ImportDialog: DialogStub,
	ImportCardDialog: DialogStub,
	ShareDialog: DialogStub,
	LoadingStateDialog: DialogStub,
};

describe("DialogHost", () => {
	let router: RouterMock;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		router = createRouterMock();
		injectRouterMock(router);
	});

	const setup = () => {
		const wrapper = mount(DialogHost, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: globalStubs,
			},
		});
		const dialogStore = useDialogStore();
		return { wrapper, dialogStore };
	};

	describe("when there is no active dialog", () => {
		it("should render nothing", () => {
			const { wrapper } = setup();

			expect(wrapper.find("[data-testid=dialog-stub]").exists()).toBe(false);
		});
	});

	describe("when a dialog is opened", () => {
		it("should render the dialog component", async () => {
			const { wrapper, dialogStore } = setup();

			dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			expect(wrapper.findComponent(DialogStub).exists()).toBe(true);
		});

		it("should pass modelValue=true to the dialog component", async () => {
			const { wrapper, dialogStore } = setup();

			dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			expect(wrapper.findComponent(DialogStub).props("modelValue")).toBe(true);
		});

		it("should pass dialog props to the component via v-bind", async () => {
			const { wrapper, dialogStore } = setup();

			dialogStore.createDialog("confirmation", { title: "My Dialog Title" });
			await nextTick();

			expect(wrapper.findComponent(DialogStub).attributes("title")).toBe("My Dialog Title");
		});
	});

	describe("when the complete event is emitted", () => {
		it("should begin settlement and resolve with completed: true after after-leave", async () => {
			const { wrapper, dialogStore } = setup();
			const { result } = dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			const stub = wrapper.findComponent(DialogStub);
			stub.vm.$emit("complete", true);
			stub.vm.$emit("after-leave");
			await flushPromises();

			expect(await result).toEqual({ completed: true, data: true });
		});

		it("should hide the dialog after settlement begins", async () => {
			const { wrapper, dialogStore } = setup();
			dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			const stub = wrapper.findComponent(DialogStub);
			stub.vm.$emit("complete", true);
			await nextTick();

			expect(wrapper.findComponent(DialogStub).props("modelValue")).toBe(false);
		});
	});

	describe("when the cancel event is emitted", () => {
		it("should resolve with completed: false after after-leave", async () => {
			const { wrapper, dialogStore } = setup();
			const { result } = dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			const stub = wrapper.findComponent(DialogStub);
			stub.vm.$emit("cancel");
			stub.vm.$emit("after-leave");
			await flushPromises();

			expect(await result).toEqual({ completed: false, data: undefined });
		});
	});

	describe("when after-leave is emitted", () => {
		it("should finalize settlement and remove the dialog", async () => {
			const { wrapper, dialogStore } = setup();
			dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			const stub = wrapper.findComponent(DialogStub);
			stub.vm.$emit("cancel");
			stub.vm.$emit("after-leave");
			await nextTick();

			expect(wrapper.find("[data-testid=dialog-stub]").exists()).toBe(false);
		});
	});

	describe("when update:modelValue is emitted with false", () => {
		it("should update the modelValue in the active dialog", async () => {
			const { wrapper, dialogStore } = setup();
			dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			wrapper.findComponent(DialogStub).vm.$emit("update:modelValue", false);
			await nextTick();

			expect(dialogStore.activeDialog?.modelValue).toBe(false);
		});
	});

	describe("when the route changes", () => {
		it("should cancel all dialogs immediately", async () => {
			const { dialogStore } = setup();
			const { result } = dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			router.currentRoute.value = {
				...router.currentRoute.value,
				path: "/new-path",
				fullPath: "/new-path",
			};
			await flushPromises();

			expect(await result).toEqual({ completed: false, data: undefined });
		});

		it("should remove the dialog from the DOM", async () => {
			const { wrapper, dialogStore } = setup();
			dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			router.currentRoute.value = {
				...router.currentRoute.value,
				path: "/new-path",
				fullPath: "/new-path",
			};
			await flushPromises();

			expect(wrapper.find("[data-testid=dialog-stub]").exists()).toBe(false);
		});
	});

	describe("when the component is unmounted", () => {
		it("should cancel all dialogs immediately", async () => {
			const { wrapper, dialogStore } = setup();
			const { result } = dialogStore.createDialog("confirmation", { title: "Test" });
			await nextTick();

			wrapper.unmount();
			await flushPromises();

			expect(await result).toEqual({ completed: false, data: undefined });
		});
	});

	describe("when a second dialog is opened while one is active", () => {
		it("should show the second dialog after the first is resolved", async () => {
			const { wrapper, dialogStore } = setup();
			const { result: result1 } = dialogStore.createDialog("confirmation", { title: "First" });
			dialogStore.createDialog("confirmation", { title: "Second" });
			await nextTick();

			// First dialog is active
			expect(wrapper.findComponent(DialogStub).attributes("title")).toBe("First");

			// Complete the first dialog
			const stub = wrapper.findComponent(DialogStub);
			stub.vm.$emit("complete", true);
			stub.vm.$emit("after-leave");
			await flushPromises();

			expect(await result1).toEqual({ completed: true, data: true });

			// Second dialog should now be shown
			await nextTick();
			expect(wrapper.findComponent(DialogStub).attributes("title")).toBe("Second");
		});
	});
});
