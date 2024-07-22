import { ComponentMountingOptions, mount } from "@vue/test-utils";
import CustomDialog from "./vCustomDialog.vue";

import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

const mockProps = {
	isOpen: true,
	size: 480,
	hasButtons: true,
};
const negativeTestmockProps = {
	isOpen: false,
	size: 480,
	hasButtons: true,
};

describe("@/components/vCustomDialog", () => {
	const mountComponent = (
		options: ComponentMountingOptions<typeof CustomDialog> = {}
	) => {
		return mount(CustomDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});
	};

	it("should open the dialog", () => {
		const wrapper = mountComponent({ props: mockProps });
		const dialog = wrapper.findComponent({
			ref: "vDialog",
		});
		expect(dialog.props("modelValue")).toBe(true);
	});

	it("should not open the dialog", () => {
		const wrapper = mountComponent({ props: negativeTestmockProps });
		expect(wrapper.findComponent(".dialog-closed").exists()).toBe(false);
	});

	it("should emit on click on dialog-close btn", async () => {
		const wrapper = mountComponent({ props: mockProps });

		const button = wrapper.getComponent(".dialog-closed");
		await button.trigger("click");

		expect(wrapper.emitted()).toHaveProperty("dialog-closed");
	});

	it("should click dialog-confirmed btn", async () => {
		const wrapper = mountComponent({ props: mockProps });

		const button = wrapper.getComponent(".dialog-confirmed");
		await button.trigger("click");

		expect(wrapper.emitted()).toHaveProperty("dialog-confirmed");
		expect(wrapper.emitted()).toHaveProperty("dialog-closed");
	});

	it("should have dialog buttons", () => {
		const wrapper = mountComponent({ props: mockProps });

		expect(wrapper.findComponent(".dialog-closed").exists()).toBe(true);
		expect(wrapper.findComponent(".dialog-confirmed").exists()).toBe(true);
	});

	it("should not have dialog buttons if has-button prop set false", () => {
		const wrapper = mountComponent({
			props: {
				isOpen: true,
				size: 480,
				hasButtons: false,
			},
		});

		expect(wrapper.findComponent(".dialog-closed").exists()).toBe(false);
		expect(wrapper.findComponent(".dialog-confirmed").exists()).toBe(false);
	});

	it("should have buttons which passed as a prop", () => {
		const wrapper = mountComponent({
			props: {
				isOpen: true,
				size: 480,
				hasButtons: true,
				buttons: ["back", "cancel", "confirm", "close", "next"],
			},
		});

		const backButton = wrapper.findComponent(`[data-testid="dialog-back"]`);
		const cancelButton = wrapper.findComponent(`[data-testid="dialog-cancel"]`);
		const confirmButton = wrapper.findComponent(
			`[data-testid="dialog-confirm"]`
		);
		const closeButton = wrapper.findComponent(`[data-testid="dialog-cancel"]`);
		const nextButton = wrapper.findComponent(`[data-testid="dialog-next"]`);
		expect(backButton.exists()).toBe(true);
		expect(cancelButton.exists()).toBe(true);
		expect(confirmButton.exists()).toBe(true);
		expect(closeButton.exists()).toBe(true);
		expect(nextButton.exists()).toBe(true);
	});

	it("should disable the confirm button when 'confirmBtnDisabled' passed as a prop", () => {
		const wrapper = mountComponent({
			props: {
				isOpen: true,
				size: 480,
				hasButtons: true,
				confirmBtnDisabled: true,
			},
		});

		const confirmButton = wrapper.getComponent(
			`[data-testid="dialog-confirm"]`
		);
		expect(confirmButton.attributes().disabled).toBeDefined();
	});

	it("should change the confirm button text via passing the prop", () => {
		const wrapper = mountComponent({
			propsData: {
				isOpen: true,
				size: 480,
				hasButtons: true,
				confirmBtnTitleKey: "test text",
			},
		});

		const confirmButton = wrapper.getComponent(
			`[data-testid="dialog-confirm"]`
		);
		expect(confirmButton.html()).toContain("test text");
	});

	it("should disable the next button when 'nextBtnDisabled' passed as a prop", () => {
		const wrapper = mountComponent({
			propsData: {
				isOpen: true,
				size: 480,
				hasButtons: true,
				nextBtnDisabled: true,
				buttons: ["next"],
			},
		});

		const nextButton = wrapper.getComponent(`[data-testid="dialog-next"]`);
		expect(nextButton.attributes().disabled).toBeDefined();
	});

	it("should change the next button text via passing the prop", () => {
		const wrapper = mountComponent({
			propsData: {
				isOpen: true,
				size: 480,
				hasButtons: true,
				nextBtnTitleKey: "test text",
				buttons: ["next"],
			},
		});

		const nextButton = wrapper.getComponent(`[data-testid="dialog-next"]`);
		expect(nextButton.html()).toContain("test text");
	});
});
