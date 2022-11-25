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

	it("should hasError property be false", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getStatusCode: null,
			getTranslationKey: "",
		});
		const wrapper = mountComponent();

		expect(wrapper.vm.hasError).toBe(false);
	});

	it("should hasError property be true", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getStatusCode: 401,
			getTranslationKey: "",
		});
		const wrapper = mountComponent();

		expect(wrapper.vm.hasError).toBe(true);
	});

	it("should routeToErrorPage has been called when the 'hasError' property true", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getStatusCode: 500,
			getTranslationKey: "",
		});
		const wrapper = mountComponent();

		expect(wrapper.vm.hasError).toBe(true);
		expect($router.replace).toHaveBeenCalledWith("/error");
	});
});
