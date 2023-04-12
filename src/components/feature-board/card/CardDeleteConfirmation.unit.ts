import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CardDeleteConfirmation from "./CardDeleteConfirmation.vue";

describe("CardDeleteConfirmation", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options: {
		isDeleteModalOpen?: boolean;
		cardTitle?: string;
	}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(CardDeleteConfirmation as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: {
				isDeleteModalOpen: options?.isDeleteModalOpen || true,
				cardTitle: options.cardTitle || "card title",
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({});
			expect(wrapper.findComponent(CardDeleteConfirmation).exists()).toBe(true);
		});

		it("card title should be in dom", () => {
			setup({ cardTitle: "test card title" });
			expect(wrapper.element.textContent).toContain("test card title");
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
