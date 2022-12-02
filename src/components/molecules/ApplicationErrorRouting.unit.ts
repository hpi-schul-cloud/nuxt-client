import ApplicationErrorRouting from "./ApplicationErrorRouting.vue";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("@components/molecules/ApplicationErrorRouting.vue", () => {
	const $router = { replace: jest.fn() };
	let applicationErrorModuleMock: ApplicationErrorModule;
	const useApplicationErrorMock = jest.mock(
		"@/composables/application-error.composable"
	);
	const errorModuleMocks: Partial<ApplicationErrorModule> = {
		getStatusCode: 401,
		getTranslationKey: "error.401",
	};

	const mountComponent: any = () => {
		return mount(ApplicationErrorRouting, {
			...createComponentMocks({ i18n: true, $router }),
			setup() {
				provide("applicationErrorModule", applicationErrorModuleMock);
				provide("useApplicationError", useApplicationErrorMock);
			},
		});
	};

	it("should routeToErrorPage has not been called when no error in the store", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			getStatusCode: null,
			getTranslationKey: "",
		});
		mountComponent();

		expect($router.replace).not.toHaveBeenCalledWith("/error");
	});

	it("should routeToErrorPage has been called when an error set in the store", () => {
		applicationErrorModuleMock = createModuleMocks(
			ApplicationErrorModule,
			errorModuleMocks
		);
		mountComponent();

		expect($router.replace).toHaveBeenCalledWith("/error");
	});
});
