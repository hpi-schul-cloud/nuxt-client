import ErrorPage from "./ErrorPage";

describe("@components/templates/ErrorPage", () => {
	it(...isValidComponent(ErrorPage));

	it("Show error-message if defined", () => {
		const testMessage = "testmessage";
		const wrapper = shallowMount(ErrorPage, {
			propsData: {
				error: {
					statusCode: "500",
					message: testMessage,
				},
			},
		});
		expect(wrapper.text()).toContain(testMessage);
	});
});
