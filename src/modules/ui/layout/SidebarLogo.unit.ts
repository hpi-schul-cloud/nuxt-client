import { shallowMount } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createModuleMocks } from "@/utils/mock-store-module";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import SidebarLogo from "./SidebarLogo.vue";
import { ConfigResponse } from "@/serverApi/v3";

describe("SidebarLogo", () => {
	const setup = () => {
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: { SC_TITLE: "dBildungscloud" } as ConfigResponse,
		});
		const wrapper = shallowMount(SidebarLogo, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: { [ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule },
			},
		});

		return {
			wrapper,
		};
	};

	it("should pass correct color to filealert", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});
});
