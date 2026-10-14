import QuickNavTrigger from "./QuickNavTrigger.vue";
import en from "@/locales/en";
import { createTestAppStoreWithPermissions, createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

vi.mock("@util-logger");

describe("QuickNavTrigger", () => {
	const setup = (platform: string) => {
		vi.spyOn(navigator, "platform", "get").mockReturnValue(platform);

		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions([], pinia);
		createTestEnvStore({ SC_THEME: SchulcloudTheme.BRB });

		return mount(QuickNavTrigger, {
			global: {
				plugins: [
					pinia,
					createTestingVuetify(),
					createTestingI18n({ locale: "en", fallbackLocale: ["en"], messages: { en } }),
				],
			},
		});
	};

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("shows ⌘K on Apple devices", () => {
		const wrapper = setup("MacIntel");

		expect(wrapper.find("kbd").text()).toBe("⌘K");
	});

	it("shows the translated Ctrl+K on other devices", () => {
		const wrapper = setup("Win32");

		expect(wrapper.find("kbd").text()).toBe("Ctrl+K");
	});
});
