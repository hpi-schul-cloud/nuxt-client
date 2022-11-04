import { envConfigModule, filePathsModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import setupStores from "@@/tests/test-utils/setupStores";
import TheFooter from "./TheFooter";

describe("@/components/legacy/TheFooter", () => {
	beforeEach(() => {
		setupStores({
			filePathsModule: FilePathsModule,
			envConfigModule: EnvConfigModule,
		});
	});

	const $theme = {
		name: "test",
	};

	it("Terms of use link is set correctly", () => {
		filePathsModule.setSpecificFiles("https://dummy-url.org/");
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

	it.skip("Link to accessibility statement is set correctly", () => {
		// accessibility statement is now part of the theme-specific TheFooter.vue implementation
	});

	it("Env-Variable sets the status page link correctly", () => {
		envConfigModule.setEnvs({ ALERT_STATUS_URL: "dummy-url.org" });
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

	it.skip("Env-Variable sets the report accessibility email correctly", () => {
		// accessibility statement is now part of the theme-specific TheFooter.vue implementation
	});

	it("check that all links are rendered in the footer", () => {
		envConfigModule.setEnvs({
			ACCESSIBILITY_REPORT_EMAIL: "dummy-email@org.de",
			ALERT_STATUS_URL: "dummy-url.org",
		});
		const wrapper = shallowMount(TheFooter, {
			...createComponentMocks({
				mocks: {
					$theme,
				},
				i18n: true,
			}),
		});
		expect(wrapper.vm.links).toHaveLength(7);
		expect(wrapper.find(".bottom-line span").text()).toBe(
			"©" + new Date().getFullYear() + " " + $theme.name
		);
	});
});
