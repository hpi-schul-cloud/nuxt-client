import { shallowMount } from "@vue/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import CloudLogo from "./CloudLogo.vue";
import { ConfigResponse } from "@/serverApi/v3";

describe("CloudLogo", () => {
	const setup = () => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: { SC_TITLE: "dBildungscloud" } as ConfigResponse,
		});
		const wrapper = shallowMount(CloudLogo, {
			global: {
				plugins: [createTestingI18n()],
				provide: { [ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule },
			},
		});

		return {
			wrapper,
		};
	};

	it("should render correctly", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find("img").exists()).toBe(true);
	});
});
