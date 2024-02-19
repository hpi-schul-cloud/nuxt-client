import InfoMessage from "./InfoMessage";

describe("@/components/atoms/InfoMessage", () => {
	it("shows the message", async () => {
		const expectedMessage = "This is some useful information";
		const wrapper = mount(InfoMessage, {
			...createComponentMocks({
				vuetify: true,
			}),
			propsData: {
				message: expectedMessage,
			},
		});
		expect(wrapper.find("div.message").element.textContent.trim()).toBe(
			expectedMessage
		);
	});

	it("has correct styling class", async () => {
		const expectedClass = "bc-error";
		const wrapper = mount(InfoMessage, {
			...createComponentMocks({
				vuetify: true,
			}),
			propsData: {
				message: "Lorem ipsum und so weiter",
				type: expectedClass,
			},
		});
		expect(wrapper.element.className).toContain(expectedClass);
	});
});