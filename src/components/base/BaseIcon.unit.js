import BaseIcon from "./BaseIcon";

describe("@/components/base/BaseIcon", () => {
	const mountComponent = (attrs = {}) => {
		const wrapper = mount(BaseIcon, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			...attrs,
		});
		return wrapper;
	};

	it("can render fontawesome icons", () => {
		const wrapper = mountComponent({
			propsData: { source: "fa", icon: "pencil", fill: "red" },
		});
		expect(wrapper.find(".fa-pencil").exists()).toBe(true);
		expect(wrapper.find("svg").exists()).toBe(false);
	});

	it("can render custom icons", () => {
		const wrapper = mountComponent({
			propsData: { source: "custom", icon: "tasks", fill: "green" },
		});
		expect(wrapper.find(".v-icon").exists()).toBe(true);
		expect(wrapper.find(".v-icon").classes()).toContain("custom-icon");
	});

	it("can render material icons", () => {
		const wrapper = mountComponent({
			propsData: { source: "material", icon: "close", fill: "blue" },
		});
		expect(wrapper.find(".v-icon").exists()).toBe(true);
		expect(wrapper.find(".v-icon").classes()).toContain("material-icon");
	});
});
