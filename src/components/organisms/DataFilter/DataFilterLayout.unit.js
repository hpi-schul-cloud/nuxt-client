import DataFilterLayout from "./DataFilterLayout";

describe("@components/organisms/DataFilter/DataFilterLayout", () => {
	it(...isValidComponent(DataFilterLayout));

	it("renders its slots", () => {
		const wrapper = mount(DataFilterLayout, {
			slots: {
				select: "select",
				chips: "chips",
				modal: "modal",
			},
		});
		console.log("wrapperhtml", wrapper.html());
		expect(wrapper.find(".select").text()).toBe("select");
		expect(wrapper.find(".chips").text()).toBe("chips");
		expect(wrapper.find(".modal").text()).toBe("modal");
	});
});
