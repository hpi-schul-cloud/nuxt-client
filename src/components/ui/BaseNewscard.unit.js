import BaseNewsCard from "./BaseNewsCard";

describe("@components/BaseNewsCard", () => {
	it(...isValidComponent(BaseNewsCard));

	it("Render default color", () => {
		const wrapper = mount(BaseNewsCard, {
			propsData: {
				category: "Bio",
				headline: "Bio Bio",
				createdAt: "2018-08-08",
				createdBy: "Me",
			},
		});
		expect(wrapper.find(".footer").isEmpty()).toBe(false);
	});

	it("Render set news settings", () => {
		const wrapper = mount(BaseNewsCard, {
			propsData: {
				category: "News Biologie",
				headline: "Darwin lebt",
				createdAt: "2018-08-08",
				createdBy: "Me",
				color: ["#412363", "#c63e80"],
			},
			slots: {
				default: "News news news news",
			},
		});
		expect(wrapper.find(".footer").isEmpty()).toBe(false);
	});
});
