import LicenseListPage from "./LicenseList.page.vue";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import EnvConfigModule from "@/store/env-config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { envsFactory } from "@@/tests/test-utils";
import axios from "axios";
import NotifierModule from "@/store/notifier";
import { nextTick } from "vue";
import { flushPromises } from "@vue/test-utils";

jest.mock("axios");
const mockAxios = jest.mocked(axios);
mockAxios.get.mockResolvedValue({
	data: {
		"MIT-License": {
			components: ["ComponentA", "ComponentB"],
			licenseText: "MIT License Text",
		},
		"Apache-2.0": {
			components: ["ComponentC"],
			licenseText: "Apache License Text",
		},
	},
});

describe("LicenseList Page", () => {
	const envs = envsFactory.build({
		LICENSE_SUMMARY_URL: "https://license-summary-url",
	});
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = () => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { ...envs },
		});

		const wrapper = mount(LicenseListPage, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		return { wrapper };
	};

	it("should render the component", async () => {
		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.exists()).toBe(true);
		[
			"MIT-License",
			"Apache-2.0",
			"pages.licenseList.title",
			"pages.licenseList.name",
			"pages.licenseList.componentCount",
		].forEach((license) => {
			expect(wrapper.text()).toContain(license);
		});
	});

	it("should call the license summary url", () => {
		setup();
		expect(mockAxios.get).toHaveBeenCalledWith(envs.LICENSE_SUMMARY_URL);
	});

	it("should display error notification on error", async () => {
		mockAxios.get.mockRejectedValueOnce(new Error("Error"));
		setup();
		await flushPromises();

		expect(notifierModule.show).toHaveBeenCalled();
	});

	describe("when the license item is clicked", () => {
		it("should display the component list", async () => {
			const { wrapper } = setup();
			await flushPromises();

			expect(wrapper.text()).not.toContain("ComponentA");
			expect(wrapper.text()).not.toContain("ComponentB");

			const licenseItemTitle = wrapper.find('[data-testid="license-title"]');
			await licenseItemTitle.trigger("click");
			await nextTick();
			expect(wrapper.text()).toContain("ComponentA");
			expect(wrapper.text()).toContain("ComponentB");
		});
	});
});
