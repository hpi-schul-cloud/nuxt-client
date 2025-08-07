import { mount } from "@vue/test-utils";
import AdminTableLegend from "./AdminTableLegend.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { envsFactory } from "@@/tests/test-utils/factory";
import { SchulcloudTheme } from "@/serverApi/v3";
import setupStores from "@@/tests/test-utils/setupStores";

const icons = [
	{ icon: "mdi-check", color: "green", label: "Label 1" },
	{ icon: "mdi-close", color: "red", label: "Label 2" },
];

const setup = (props = {}) => {
	const wrapper = mount(AdminTableLegend, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props: {
			icons,
			showIcons: true,
			showExternalSyncHint: false,
			...props,
		},
	});

	return { wrapper, envConfigModule };
};

describe("AdminTableLegend", () => {
	beforeAll(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	it("renders icons and labels when showIcons is true", () => {
		const { wrapper } = setup({ showIcons: true });
		const legend = wrapper.find('[data-testid="legend-icons"]');
		expect(legend.findAll(".consent-icon li").length).toBe(icons.length);
		expect(legend.text()).toContain("Label 1");
		expect(legend.text()).toContain("Label 2");
	});

	it("does not render icons when showIcons is false", () => {
		const { wrapper } = setup({ showIcons: false });
		expect(wrapper.find('[data-testid="legend-icons"]').exists()).toBe(false);
	});

	it("renders THR-specific text if isThr is true", () => {
		const envs = envsFactory.build({
			SC_THEME: SchulcloudTheme.Thr,
		});
		envConfigModule.setEnvs(envs);
		const { wrapper } = setup();

		expect(wrapper.text()).toContain(
			"components.molecules.admintablelegend.thr"
		);
	});

	it("renders external sync hint and help link if showExternalSyncHint is true and not THR", () => {
		const { wrapper } = setup({ showExternalSyncHint: true });
		const hint = wrapper.find(".external-sync-hint");
		expect(hint.text()).toContain(
			"components.molecules.admintablelegend.externalSync"
		);
		const link = wrapper.find(".external-sync-hint .link-style");
		expect(link.exists()).toBe(true);
		expect(link.attributes("href")).toContain(
			"https://docs.dbildungscloud.de/x/PgBVAw"
		);
	});

	it("renders institute title in hint text", () => {
		const { wrapper } = setup();
		expect(wrapper.text()).toContain(
			"components.molecules.admintablelegend.hint"
		);
	});
});
