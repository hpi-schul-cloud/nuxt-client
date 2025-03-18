import { shallowMount } from "@vue/test-utils";
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

		const wrapper = shallowMount(LicenseListPage, {
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

	it("should render the component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should call the license summary url", () => {
		setup();
		expect(mockAxios.get).toHaveBeenCalledWith(envs.LICENSE_SUMMARY_URL);
	});

	it("should pass the response to component", async () => {
		const { wrapper } = setup();
		await nextTick();

		const treeViewComponent = wrapper.findComponent({ name: "VTreeview" });

		expect(treeViewComponent.exists()).toBe(true);
		expect(treeViewComponent.vm.items).toHaveLength(2);
		expect(JSON.stringify(treeViewComponent.vm.items)).toContain("MIT-License");
		expect(JSON.stringify(treeViewComponent.vm.items)).toContain("Apache-2.0");
	});
});
