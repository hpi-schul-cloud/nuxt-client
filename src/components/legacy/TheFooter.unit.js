import TheFooter from "./TheFooter";

describe("@components/legacy/TheFooter", () => {
	it(...isValidComponent(TheFooter));

	const $theme = { name: "test" };
	it("check that all links are rendered in the footer", () => {
		const wrapper = shallowMount(TheFooter, {
			...createComponentMocks({
				store: {
					auth: {
						state: () => ({
							school: {
								documentBaseDir:
									"https://s3.hidrive.strato.com/schul-cloud-hpi/default/",
							},
						}),
					},
				},
				mocks: {
					$theme,
				},
				i18n: true,
			}),
		});
		expect(wrapper.findAll("base-link-stub")).toHaveLength(11);
		expect(wrapper.find("span").text()).toBe(
			"© " + new Date().getFullYear() + " " + $theme.name
		);
		expect(wrapper.findAll("base-link-stub").at(3).props("href")).toBe(
			"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf"
		);
	});
});
