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

	it("Show generic error message if no message is defined", () => {
		const wrapper = shallowMount(ErrorPage, {
			propsData: {
				error: {
					statusCode: "500",
				},
			},
		});
		expect(wrapper.text()).toContain("Ein Fehler ist aufgetreten");
	});
});
