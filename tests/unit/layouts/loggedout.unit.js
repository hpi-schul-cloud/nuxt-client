import loggedout from "@layouts/loggedout";

describe("@layouts/loggedout", () => {
	it("renders its content", () => {
		const slotContent = "<p>Hello!</p>";
		const { element } = shallowMount(loggedout, {
			slots: {
				default: slotContent,
			},
		});
		expect(element.innerHTML).toContain(slotContent);
	});
});
