import ApplicationErrorRouting from "./ApplicationErrorRouting.vue";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, Mock } from "vitest";
import { ref } from "vue";
import { Router, useRouter } from "vue-router";

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));

describe("@/components/molecules/ApplicationErrorRouting.vue", () => {
	const router = createMock<Router>({
		currentRoute: ref({ path: "/" }),
	});
	const useRouterMock = <Mock>useRouter;

	useRouterMock.mockReturnValue(router);

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	const mountComponent = () =>
		mount(ApplicationErrorRouting, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			router,
		});

	it("should routeToErrorPage has not been called when no error in the store", () => {
		mountComponent();
		expect(router.replace).not.toHaveBeenCalledWith("/error");
	});

	it("should routeToErrorPage has been called when an error set in the store", () => {
		useAppStore().handleApplicationError(HttpStatusCode.Unauthorized, "error.401");
		mountComponent();
		expect(router.replace).toHaveBeenCalledWith("/error");
	});
});
