import ApplicationErrorModule from "@/store/application-error";
import EnvConfigModule from "@/store/env-config";
import FilePathsModule from "@/store/filePaths";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount, Wrapper } from "@vue/test-utils";
import VueRouter from "vue-router";
import loggedOut from "./loggedOut.layout.vue";
import Vue from "vue";

describe("loggedOutLayout", () => {
	const mountComponent = (attrs = {}) => {
		setupStores({
			envConfigModule: EnvConfigModule,
			filePathsModule: FilePathsModule,
		});
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getGhostBaseUrl: "https://works-like-charm.com",
		});
		const applicationErrorModuleMock = createModuleMocks(
			ApplicationErrorModule
		);

		const componentOptions = createComponentMocks({ i18n: true });
		const { localVue } = componentOptions;
		localVue.use(VueRouter);
		const router = new VueRouter({ routes: [{ path: "home" }] });

		const wrapper = mount(loggedOut, {
			...componentOptions,
			mocks: {
				$theme: {
					short_name: "instance name",
				},
			},
			provide: {
				envConfigModule: envConfigModuleMock,
				applicationErrorModule: applicationErrorModuleMock,
			},
			router,
			...attrs,
		});

		return wrapper;
	};

	it("should contain composed urls", () => {
		const wrapper = mountComponent();

		const links = wrapper
			.findAll('[data-testid="logged-out-top-bar"] .link-container > a')
			.wrappers.map((el: Wrapper<Vue>) => el.element as HTMLLinkElement);

		expect(links.length).toBe(3);
		expect(new URL(links[0].href).host).toEqual("works-like-charm.com");
		expect(new URL(links[1].href).host).toEqual("works-like-charm.com");
		expect(new URL(links[2].href).host).toEqual("works-like-charm.com");
	});
});
