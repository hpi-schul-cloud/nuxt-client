import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import TheFooter from "./TheFooter.vue";
import { THEME_KEY } from "@/utils/inject";
import { beforeAll } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

describe("@/components/legacy/TheFooter.vue", () => {
	const dummyUrl = "dummy-url.org";
	beforeAll(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({ ALERT_STATUS_URL: dummyUrl });
	});

	const setup = () => {
		const theme = {
			name: "instance name",
		};

		const wrapper = shallowMount(TheFooter, {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[THEME_KEY.valueOf()]: {
						name: theme.name,
					},
				},
				stubs: ["base-link"],
			},
		});

		return { wrapper, theme };
	};

	it.skip("Link to accessibility statement is set correctly", () => {
		// accessibility statement is now part of the theme-specific TheFooter.vue implementation
	});

	it("Env-Variable sets the status page link correctly", () => {
		const { wrapper } = setup();
		expect(wrapper.html()).toContain(dummyUrl);
	});

	it.skip("Env-Variable sets the report accessibility email correctly", () => {
		// accessibility statement is now part of the theme-specific TheFooter.vue implementation
	});

	it("check that all links are rendered in the footer", () => {
		const { wrapper, theme } = setup();
		const links = wrapper.findAllComponents("base-link-stub");

		expect(links).toHaveLength(7);
		expect(wrapper.find(".bottom-line span").text()).toBe(
			"©" + new Date().getFullYear() + " " + theme.name
		);
	});
});
