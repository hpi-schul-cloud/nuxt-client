import NavigationBar from "./NavigationBar.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("NavigationBar", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const getWrapper = () => {
		const img = "@/assets/img/logo/nav-cloud-logo.svg";
		const wrapper = mount(NavigationBar, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				img,
			},
		});

		return { wrapper, img };
	};

	it("should render the given logo", () => {
		createTestEnvStore({ SC_THEME: SchulcloudTheme.DEFAULT });
		const { wrapper, img } = getWrapper();

		expect(wrapper.find(".logo.logo-full").exists()).toBe(true);
		expect(wrapper.find(".logo.logo-full").attributes("src")).toBe(img);
	});
});
