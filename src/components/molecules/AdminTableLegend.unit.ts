import { mount } from "@vue/test-utils";
import AdminTableLegend from "./AdminTableLegend.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { SchulcloudTheme } from "@/serverApi/v3";
import setupStores from "@@/tests/test-utils/setupStores";
import { nextTick } from "vue";
import { createTestEnvStore } from "@@/tests/test-utils";

const icons = [
	{ icon: "mdi-check", color: "green", label: "Label 1" },
	{ icon: "mdi-close", color: "red", label: "Label 2" },
];

describe("AdminTableLegend", () => {
	beforeAll(() => {
		createTestEnvStore();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (props = {}) => {
		const wrapper = mount(AdminTableLegend, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$t: (key: string, placeholders: Record<string, string> = {}) => {
						return `${key}|${Object.values(placeholders || {}).join("|")}`;
					},
				},
			},
			props: {
				icons,
				showIcons: true,
				showExternalSyncHint: false,
				...props,
			},
		});

		return { wrapper };
	};

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
		createTestEnvStore({ SC_THEME: SchulcloudTheme.Thr });
		const { wrapper } = setup();

		expect(wrapper.text()).toContain(
			"components.molecules.admintablelegend.thr"
		);
	});

	it.each([
		[SchulcloudTheme.Default, "Dataport"],
		[
			SchulcloudTheme.Brb,
			"Ministerium für Bildung, Jugend und Sport des Landes Brandenburg",
		],
		[
			SchulcloudTheme.N21,
			"Niedersächsisches Landesinstitut für schulische Qualitätsentwicklung (NLQ)",
		],
	])("uses %s-instance specific text placeholders", async (theme, expected) => {
		createTestEnvStore({ SC_THEME: theme });
		const { wrapper } = setup();

		await nextTick();

		expect(wrapper.text()).toContain(expected);
	});
});
