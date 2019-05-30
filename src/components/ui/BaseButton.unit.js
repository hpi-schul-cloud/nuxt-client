import BaseButton from "./BaseButton";

const defaultButton = {
	components: { BaseButton },
	template: `<base-button>Default</base-button>`,
};

const smallButton = {
	components: { BaseButton },
	template: `<base-button class="is-small">Default</base-button>`,
};

const primaryButton = {
	components: { BaseButton },
	template: `<base-button class="is-primary">Default</base-button>`,
};

const secondaryButton = {
	components: { BaseButton },
	template: `<base-button class="is-secondary">Default</base-button>`,
};

const successButton = {
	components: { BaseButton },
	template: `<base-button class="is-success">Default</base-button>`,
};

describe("@components/BaseButton", () => {
	it(...isValidComponent(BaseButton));
	it(...rendersDefaultSlotContent(BaseButton));
	it("Generates a default button", () => {
		const wrapper = mount(defaultButton);
		expect(wrapper.find("button").exists()).toBe(true);
		expect(wrapper.find(".is-secondary").exists()).toBe(false);
	});
	it("Generates a primary button", () => {
		const wrapper = mount(primaryButton);
		expect(wrapper.find("button").exists()).toBe(true);
		expect(wrapper.find(".is-primary").exists()).toBe(true);
	});
	it("Generates a secondary button", () => {
		const wrapper = mount(secondaryButton);
		expect(wrapper.find("button").exists()).toBe(true);
		expect(wrapper.find(".is-secondary").exists()).toBe(true);
	});
	it("Generates a small button", () => {
		const wrapper = mount(smallButton);
		expect(wrapper.find("button").exists()).toBe(true);
		expect(wrapper.find(".is-small").exists()).toBe(true);
	});
});
