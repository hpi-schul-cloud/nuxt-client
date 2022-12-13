import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { createModuleMocks } from "@/utils/mock-store-module";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount, Wrapper } from "@vue/test-utils";
import loggedOut from "./loggedOut.layout.vue";

declare let createComponentMocks: Function;

describe("loggedOutLayout", () => {
	let envConfigModuleMock: EnvConfigModule;
	let wrapper: Wrapper<Vue>;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(loggedOut, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			provide: {
				envConfigModule: envConfigModuleMock,
			},
			...attrs,
			stubs: {
				Nuxt: true,
				NuxtLink: true,
				TheFooter: true,
				RouterLink: true,
			},
		});

		return wrapper;
	};

	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
			filePathsModule: FilePathsModule,
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
