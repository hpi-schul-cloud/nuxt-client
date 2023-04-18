import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";

describe(DeleteConfirmation.name, () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: {
		isDeleteModalOpen?: boolean;
		cardTitle?: string;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(DeleteConfirmation as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: {
				isDeleteModalOpen: options?.isDeleteModalOpen || true,
				cardTitle: options.cardTitle || "card title",
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({});
			expect(wrapper.findComponent(DeleteConfirmation).exists()).toBe(true);
		});
	});

	describe("when a dialog button clicked", () => {
		it("should emit 'delete-confirm' if 'remove' button clicked", () => {
			setup({});
			const dialog = wrapper.findComponent({ name: "vCustomDialog" });
			dialog.vm.$emit("dialog-confirmed");
			const emitted = wrapper.emitted();

			expect(emitted["delete-confirm"]).toBeDefined();
		});

		it("should emit 'dialog-cancel' if 'cancel' button clicked", () => {
			setup({});
			const dialog = wrapper.findComponent({ name: "vCustomDialog" });
			dialog.vm.$emit("dialog-closed");
			const emitted = wrapper.emitted();

			expect(emitted["dialog-cancel"]).toBeDefined();
		});
	});
});
