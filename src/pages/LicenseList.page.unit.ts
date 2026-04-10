import LicenseListPage from "./LicenseList.page.vue";
import { createTestEnvStore, expectNotification } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import axios from "axios";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick } from "vue";
import { VExpansionPanelText, VExpansionPanelTitle } from "vuetify/lib/components/index";

vi.mock("axios");
const mockAxios = vi.mocked(axios, true);
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
	const LICENSE_SUMMARY_URL = "https://license-summary-url";

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = () => {
		createTestEnvStore({ LICENSE_SUMMARY_URL });

		const wrapper = mount(LicenseListPage, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});

		return { wrapper };
	};

	it("should render the component", async () => {
		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.exists()).toBe(true);
		["MIT-License", "Apache-2.0", "pages.licenseList.title"].forEach((license) => {
			expect(wrapper.text()).toContain(license);
		});
	});

	it("should call the license summary url", () => {
		setup();
		expect(mockAxios.get).toHaveBeenCalledWith(LICENSE_SUMMARY_URL);
	});

	it("should display error notification on error", async () => {
		mockAxios.get.mockRejectedValueOnce(new Error("Error"));
		setup();
		await flushPromises();

		expectNotification("error");
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
