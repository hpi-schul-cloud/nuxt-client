import BaseButton from "./BaseButton";

describe("@components/BaseButton", () => {
	it("exports a valid component", () => {
		expect(BaseButton).toBeAComponent();
	});

	it("renders its content", () => {
		const slotContent = "<p>Hello!</p>";
		const { element } = shallowMount(BaseButton, {
			slots: {
				default: slotContent,
			},
		});
		expect(element.innerHTML).toContain(slotContent);
	});
});
