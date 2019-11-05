import BaseIcon from "./BaseIcon";

describe("@components/BaseIcon", () => {
	it(...isValidComponent(BaseIcon));

	it("can render fontawesome icons", () => {
		const wrapper = mount(BaseIcon, {
			propsData: { source: "fa", icon: "pencil", fill: "red" },
		});
		expect(wrapper.find(".fa-pencil").exists()).toBe(true);
		expect(wrapper.find("svg").exists()).toBe(false);
	});
});
