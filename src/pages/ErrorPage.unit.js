import ErrorPage from "./Error.page";

describe("@pages/Error.page.vue", () => {
	it(...isValidComponent(ErrorPage));

	it("Show error-message if defined", () => {
		const testMessage = "testmessage";
		const wrapper = shallowMount(ErrorPage, {
			...createComponentMocks({ i18n: true }),
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
			...createComponentMocks({ i18n: true }),
			propsData: {
				error: {
					statusCode: "500",
				},
			},
		});
		expect(wrapper.text()).toContain("Ein Fehler ist aufgetreten");
	});
});
