import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { urlValidationRegex } from "@/utils/ldapConstants";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { provide } from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import loggedOut from "./loggedOut.vue";

describe("loggedOutLayout", () => {
	let envConfigModuleMock: EnvConfigModule;
	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(loggedOut, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("envConfigModule", envConfigModuleMock);
			},
			...attrs,
			stubs: {
				Nuxt: true,
				NuxtLink: true,
				TheFooter: true,
			},
		});

		return wrapper;
	};

	beforeEach(() => {
		setupStores({
			"env-config": EnvConfigModule,
			filePaths: FilePathsModule,
		});
		envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getGhostBaseUrl: "https://works-like-charm.com",
		});
	});

	it("should contain composed urls", () => {
		wrapper = mountComponent();
		const links = wrapper
			.findAll('[data-testid="logged-out-top-bar"] .link-container > a')
			.wrappers.map((el: Wrapper<Vue>) => el.element as HTMLLinkElement);

		expect(links.length).toBe(3);
		expect(new URL(links[0].href).host).toEqual("works-like-charm.com");
		expect(new URL(links[1].href).host).toEqual("works-like-charm.com");
		expect(new URL(links[2].href).host).toEqual("works-like-charm.com");
	});
});
