import ApplicationErrorRouting from "./ApplicationErrorRouting.vue";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";
import VueRouter from "vue-router";
import { APPLICATION_ERROR_KEY } from "@/utils/inject";

describe("@/components/molecules/ApplicationErrorRouting.vue", () => {
	let router: VueRouter;
	let applicationErrorModuleMock: ApplicationErrorModule;

	const mountComponent: any = () => {
		const componentOptions = createComponentMocks({ i18n: true });
		const { localVue } = componentOptions;
		localVue.use(VueRouter);
		router = new VueRouter({ routes: [{ path: "home" }] });
		jest.spyOn(router, "replace");

		return mount(ApplicationErrorRouting, {
			...componentOptions,
			provide: {
				[APPLICATION_ERROR_KEY.valueOf()]: applicationErrorModuleMock,
			},
			router,
		});
	};

	it("should routeToErrorPage has not been called when no error in the store", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			getStatusCode: null,
			getTranslationKey: "",
		});
		mountComponent();

		expect(router.replace).not.toHaveBeenCalledWith("/error");
	});

	it("should routeToErrorPage has been called when an error set in the store", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			getStatusCode: 401,
			getTranslationKey: "error.401",
		});
		mountComponent();

		expect(router.replace).toHaveBeenCalledWith("/error");
	});
});
