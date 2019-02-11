import BaseLink from "./BaseLink";

describe("@components/BaseLink", () => {
	it("exports a valid component", () => {
		expect(BaseLink).toBeAComponent();
	});

	it("renders its content", () => {
		const slotContent = "<p>Hello!</p>";
		const { element } = shallowMount(BaseLink, {
			propsData: {
				href: "https://schul-cloud.org",
			},
			slots: {
				default: slotContent,
			},
		});
		expect(element.innerHTML).toContain(slotContent);
	});
});
