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
