import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { envsFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import TheFooter from "./TheFooter";

describe("@/components/legacy/TheFooter.vue", () => {
	beforeEach(() => {
		setupStores({
			filePathsModule: FilePathsModule,
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = () => {
		const wrapper = shallowMount(TheFooter, {
			global: {
				plugins: [createTestingI18n()],
				mocks: { $theme },
				stubs: ["base-link"],
			},
		});

		return { wrapper };
	};

	const $theme = {
		name: "test",
	};

	it.skip("Link to accessibility statement is set correctly", () => {
		// accessibility statement is now part of the theme-specific TheFooter.vue implementation
	});

	it("Env-Variable sets the status page link correctly", () => {
		const envs = envsFactory.build({ ALERT_STATUS_URL: "dummy-url.org" });
		envConfigModule.setEnvs(envs);

		const { wrapper } = setup();

		expect(wrapper.vm.links[5].href).toStrictEqual("dummy-url.org");
	});

	it.skip("Env-Variable sets the report accessibility email correctly", () => {
		// accessibility statement is now part of the theme-specific TheFooter.vue implementation
	});

	it("check that all links are rendered in the footer", () => {
		const envs = envsFactory.build({
			ACCESSIBILITY_REPORT_EMAIL: "dummy-email@org.de",
			ALERT_STATUS_URL: "dummy-url.org",
		});
		envConfigModule.setEnvs(envs);

		const { wrapper } = setup();

		expect(wrapper.vm.links).toHaveLength(7);
		expect(wrapper.find(".bottom-line span").text()).toBe(
			"©" + new Date().getFullYear() + " " + $theme.name
		);
	});
});
