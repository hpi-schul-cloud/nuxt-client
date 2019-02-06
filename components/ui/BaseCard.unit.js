import BaseCard from "./BaseCard";

describe("@components/BaseCard", () => {
	it("exports a valid component", () => {
		expect(BaseCard).toBeAComponent();
	});

	it("renders its content", () => {
		const slotContent = "<p>Hello!</p>";
		const { element } = shallowMount(BaseCard, {
			slots: {
				default: slotContent,
			},
		});
		expect(element.innerHTML).toContain(slotContent);
	});
});
