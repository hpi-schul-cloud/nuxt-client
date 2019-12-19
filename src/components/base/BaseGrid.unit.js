import BaseGrid from "./BaseGrid";

describe("@components/base/BaseGrid", () => {
	it("exports a valid component", () => {
		expect(BaseGrid).toBeAComponent();
	});
	it(...rendersSlotContent(BaseGrid));
});
