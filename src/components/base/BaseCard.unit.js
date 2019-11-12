import BaseCard from "./BaseCard";

describe("@components/BaseCard", () => {
	it(...isValidComponent(BaseCard));
	it(...rendersSlotContent(BaseCard));

	it("Renders header, content, and footer slots", () => {
		const wrapper = shallowMount(BaseCard, {
			slots: {
				header: "Header",
				content: "Content",
				footer: "Footer",
			},
		});
		expect(wrapper.find(".customcard-header").text()).toBe("Header");
		expect(wrapper.find(".customcard-content").text()).toBe("Content");
		expect(wrapper.find(".customcard-footer").text()).toBe("Footer");
	});

	it("using the default slot will remove all other slots", () => {
		const wrapper = shallowMount(BaseCard, {
			slots: {
				default: "Content",
			},
		});
		expect(wrapper.find(".customcard-header").exists()).toBe(false);
		expect(wrapper.find(".customcard-content").exists()).toBe(false);
		expect(wrapper.find(".customcard-footer").exists()).toBe(false);
	});
});
