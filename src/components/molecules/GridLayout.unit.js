import GridLayout from "./GridLayout";

describe("@components/molecules/GridLayout", () => {
	it("exports a valid component", () => {
		expect(GridLayout).toBeAComponent();
	});
	it(...rendersSlotContent(GridLayout));
});
