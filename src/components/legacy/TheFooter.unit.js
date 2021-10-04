import TheFooter from "./TheFooter";

const specificFilesMock = {
	privacyExemplary:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	privacy:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Onlineeinwilligung.pdf",
	termsOfUseExemplary:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Nutzungsordnung-HPI-Schule-Schueler-Onlineeinwilligung.pdf",
	termsOfUse:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Nutzungsordnung-Onlineeinwilligung.pdf",
	termsOfUseSchool:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Willkommensordner/Datenschutz/Nutzungsordnung-HPI-Schule-Schueler.pdf",
	analogConsent:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Dokumente/Einwilligungserklaerung_analog.pdf",
};

describe("@components/legacy/TheFooter", () => {
	it(...isValidComponent(TheFooter));

	const $theme = {
		name: "test",
	};
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
					filePaths: {
						getters: {
							getSpecificFiles: () => specificFilesMock,
						},
					},
				},
				mocks: {
					$theme,
				},
				i18n: true,
			}),
		});
		expect(wrapper.findAll("base-link-stub")).toHaveLength(8);
		expect(wrapper.find("span").text()).toBe(
			"© " + new Date().getFullYear() + " " + $theme.name
		);
	});
});
