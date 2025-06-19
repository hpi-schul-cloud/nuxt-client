import ApplicationErrorModule from "@/store/application-error";
import { APPLICATION_ERROR_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { Router, useRouter } from "vue-router";
import ApplicationErrorRouting from "./ApplicationErrorRouting.vue";

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));

describe("@/components/molecules/ApplicationErrorRouting.vue", () => {
	const router = createMock<Router>({
		currentRoute: ref({ path: "/" }),
	});
	const useRouterMock = <vi.Mock>useRouter;

	useRouterMock.mockReturnValue(router);
	let applicationErrorModuleMock: ApplicationErrorModule;

	const mountComponent = () => {
		return mount(ApplicationErrorRouting, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[APPLICATION_ERROR_KEY.valueOf()]: applicationErrorModuleMock,
				},
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
