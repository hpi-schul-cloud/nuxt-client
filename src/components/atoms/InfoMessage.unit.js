import InfoMessage from "./InfoMessage";

describe("@components/atoms/InfoMessage", () => {
	it("shows the message", async () => {
		const expectedMessage = "This is some useful information";
		const wrapper = mount(InfoMessage, {
			propsData: {
				message: expectedMessage,
			},
		});
		expect(wrapper.find("div").element.textContent.trim()).toBe(
			expectedMessage
		);
	});

	it("has correct styling class", async () => {
		const expectedClass = "error";
		const wrapper = mount(InfoMessage, {
			propsData: {
				message: "Lorem ipsum und so weiter",
				type: expectedClass,
			},
		});
		expect(wrapper.element.className).toContain(expectedClass);
	});
});
