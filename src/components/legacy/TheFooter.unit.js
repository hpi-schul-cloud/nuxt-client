import TheFooter from "./TheFooter";
import FilePathsModule from "@/store/filePaths";
import EnvConfigModule from "@/store/env-config";

describe("@components/legacy/TheFooter", () => {
	it(...isValidComponent(TheFooter));

	const $theme = {
		name: "test",
	};

	it("Terms of use link is set correctly", () => {
		FilePathsModule.setSpecificFiles("https://dummy-url.org/");
		const wrapper = shallowMount(TheFooter, {
			...createComponentMocks({
				mocks: {
					$theme,
				},
				i18n: true,
			}),
		});
		expect(wrapper.vm.links[1].href).toStrictEqual(
			"https://dummy-url.org/Willkommensordner/Datenschutz/Nutzungsordnung_Schueler-innen.pdf"
		);
	});
	it("Env-Variable sets the status page link correctly", () => {
		EnvConfigModule.setEnvs({ ALERT_STATUS_URL: "dummy-url.org" });
		const wrapper = shallowMount(TheFooter, {
			...createComponentMocks({
				mocks: {
					$theme,
				},
				i18n: true,
			}),
		});
		expect(wrapper.vm.links[5].href).toStrictEqual("dummy-url.org");
	});
	it("check that all links are rendered in the footer", () => {
		const wrapper = shallowMount(TheFooter, {
			...createComponentMocks({
				mocks: {
					$theme,
				},
				i18n: true,
			}),
		});
		expect(wrapper.findAll("base-link-stub")).toHaveLength(7);
		expect(wrapper.find(".bottom-line span").text()).toBe(
			"©" + new Date().getFullYear() + " " + $theme.name
		);
	});
});
