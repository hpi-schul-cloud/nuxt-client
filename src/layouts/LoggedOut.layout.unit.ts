import LoggedOutLayout from "./LoggedOut.layout.vue";
import { SchulcloudTheme } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { THEME_KEY } from "@/utils/inject";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

const router = createRouterMock();

describe("loggedOutLayout", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		injectRouterMock(router);
	});

	const mountComponent = () => {
		createTestEnvStore({
			GHOST_BASE_URL: "https://works-like-charm.com",
			// SC_THEME must be set here because of dependency to NavigationBar
			SC_THEME: SchulcloudTheme.Default,
		});

		const wrapper = mount(LoggedOutLayout, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[THEME_KEY.valueOf()]: {
						name: "instance name",
					},
				},
			},
		});

		return wrapper;
	};

	it("should contain composed urls", () => {
		const wrapper = mountComponent();

		const links = wrapper
			.findAll('[data-testid="logged-out-top-bar"] .link-container > a')
			.map((el) => el.element as HTMLLinkElement);

		expect(links.length).toBe(3);
		expect(new URL(links[0].href).host).toEqual("works-like-charm.com");
		expect(new URL(links[1].href).host).toEqual("works-like-charm.com");
		expect(new URL(links[2].href).host).toEqual("works-like-charm.com");
	});

	it("should not routeToErrorPage without any errors", () => {
		mountComponent();
		expect(router.replace).not.toHaveBeenCalledWith("/error");
	});

	it("should execute routeToErrorPage with any errors", () => {
		useAppStore().handleApplicationError(HttpStatusCode.Unauthorized, "error.401");
		mountComponent();
		expect(router.replace).toHaveBeenCalledWith("/error");
	});
});
