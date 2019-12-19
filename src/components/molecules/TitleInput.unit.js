import TitleInput from "./TitleInput";

describe("@components/TitleInput", () => {
	it(...isValidComponent(TitleInput));
	it("contains an input", () => {
		const wrapper = mount(TitleInput, {
			propsData: {
				vmodel: "",
				label: "test",
				name: "test",
				value: "test",
				type: "text",
			},
		});
		expect(wrapper.find("input").exists()).toBe(true);
	});
});
