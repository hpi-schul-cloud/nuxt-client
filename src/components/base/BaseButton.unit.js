import BaseButton from "./BaseButton";

const defaultButton = {
	components: { BaseButton },
	template: `<base-button>Default</base-button>`,
};

const smallButton = {
	components: { BaseButton },
	template: `<base-button size="small">Default</base-button>`,
};

const primaryButton = {
	components: { BaseButton },
	template: `<base-button design="primary">Default</base-button>`,
};

const secondaryButton = {
	components: { BaseButton },
	template: `<base-button design="secondary">Default</base-button>`,
};

const successButton = {
	components: { BaseButton },
	template: `<base-button design="success">Default</base-button>`,
};

describe("@components/BaseButton", () => {
	it(...isValidComponent(BaseButton));
	it(...rendersSlotContent(BaseButton));
	it("Generates a default button", () => {
		const wrapper = mount(defaultButton);
		expect(wrapper.find("button").exists()).toBe(true);
		expect(wrapper.find(".is-secondary").exists()).toBe(false);
	});

	it("throws an error for invalid designs", async () => {
		expect(() => {
			mount(BaseButton, {
				propsData: {
					design: "some Invalid Design",
				},
			});
		}).toThrow(/the design .* is not available/);
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
	it("Generates a success button", () => {
		const wrapper = mount(successButton);
		expect(wrapper.find("button").exists()).toBe(true);
		expect(wrapper.find(".is-success").exists()).toBe(true);
	});
	it(`has default type="button"`, () => {
		const wrapper = mount(BaseButton);
		expect(wrapper.find(`button[type=button]`).exists()).toBe(true);
	});
	it(`type can be manipulated`, () => {
		const wrapper = mount(BaseButton, {
			propsData: {
				type: "submit",
			},
		});
		expect(wrapper.find(`button[type=button]`).exists()).toBe(false);
		expect(wrapper.find(`button[type=submit]`).exists()).toBe(true);
	});
	it(`renders a button by default`, () => {
		const wrapper = shallowMount(BaseButton);
		expect(wrapper.find(`button`).exists()).toBe(true);
	});
	it(`renders a base-link if to is specified`, () => {
		const wrapper = shallowMount(BaseButton, {
			propsData: {
				to: "/news",
			},
		});
		expect(wrapper.find(`base-link-stub`).exists()).toBe(true);
	});
	it(`renders a base-link if a href is specified`, () => {
		const wrapper = shallowMount(BaseButton, {
			propsData: {
				href: "/news",
			},
		});
		expect(wrapper.find(`base-link-stub`).exists()).toBe(true);
	});
	it(`passes attributes and props to base-link`, () => {
		const wrapper = shallowMount(BaseButton, {
			propsData: {
				href: "/news",
				class: "test",
			},
		});
		const link = wrapper.find(`base-link-stub`);
		expect(link.exists()).toBe(true);
		expect(link.attributes("href")).toBe("/news");
		expect(link.attributes("class")).toBe("test");
	});
});
