import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { envsFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { flushPromises } from "@vue/test-utils";
import axios from "axios";
import { nextTick } from "vue";
import {
	VExpansionPanelText,
	VExpansionPanelTitle,
} from "vuetify/lib/components/index";
import LicenseListPage from "./LicenseList.page.vue";

vi.mock("axios");
const mockAxios = vi.mocked(axios);
mockAxios.get.mockResolvedValue({
	data: {
		"MIT-License": {
			components: ["ComponentA@2.0.0", "ComponentB@1.2.3"],
			licenseText: "MIT License Text",
		},
		"Apache-2.0": {
			components: ["ComponentC@1.0.0"],
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
		["MIT-License", "Apache-2.0", "pages.licenseList.title"].forEach(
			(license) => {
				expect(wrapper.text()).toContain(license);
			}
		);
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

			const panelTitles = wrapper.findAllComponents(VExpansionPanelTitle);
			const panelTexts = wrapper.findAllComponents(VExpansionPanelText);
			expect(panelTitles).toHaveLength(2);
			const [panelTitle1, panelTitle2] = panelTitles;
			const [panelText1, panelText2] = panelTexts;

			await panelTitle1.trigger("click");
			await nextTick();
			expect(panelText1.text()).toContain("MIT License Text");
			expect(panelText1.text()).not.toContain("Apache License Text");

			await panelTitle2.trigger("click");
			await nextTick();
			expect(panelText2.text()).not.toContain("MIT License Text");
			expect(panelText2.text()).toContain("Apache License Text");
		});
	});
});
