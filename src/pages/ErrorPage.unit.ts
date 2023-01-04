import ErrorPage from "./Error.page.vue";
import { shallowMount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

describe("@pages/Error.page.vue", () => {
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { assign: jest.fn() },
		});
	});

	const mountComponent = (
		statusCode: HttpStatusCode | null = 400,
		translationKey = "error.400"
	) => {
		return shallowMount(ErrorPage, {
			...createComponentMocks({ i18n: true }),
			provide: {
				applicationErrorModule: createModuleMocks(ApplicationErrorModule, {
					getStatusCode: statusCode,
					getTranslationKey: translationKey,
				}),
				i18n: { t: (key: string) => key, tc: (key: string) => key },
			},
		});
	};

	it("should assign 'window.location' when back button is clicked", async () => {
		const wrapper = mountComponent();
		const btnElement = await wrapper.find("[data-testid='btn-back']");
		await btnElement.trigger("click");
		expect(window.location.assign).toHaveBeenCalledWith("/dashboard");
	});

	describe("when the '/error' route has been called", () => {
		// NUXT_REMOVAL TODO Olli will fix this tomorrow
		// it("should set 'is-permission-error' prop to 'true' on unauthorized", async () => {
		// 	const wrapper = mountComponent(401, "error.401");
		// 	const errorComponent = await wrapper.find(
		// 		"[data-testid='error-content']"
		// 	);
		// 	expect(errorComponent.vm.$props.isPermissionError).toBe(true);
		// });
		//
		// it("should set 'is-generic-error' prop to 'true' on generic error", async () => {
		// 	const wrapper = mountComponent(500, "generic.error");
		// 	const errorComponent = await wrapper.findComponent(ErrorContent);
		// 	// console.log(errorComponent.element.attributes.getNamedItem('isgenericerror')?.value);
		// 	// expect(errorComponent.vm.$props.isGenericError).toBe(true);
		// 	expect(false).toBeTruthy();
		// });
		//
		// it("should set 'is-generic-error' prop to 'true' even if there is no error in the store", async () => {
		// 	const wrapper = mountComponent(null, "");
		// 	const errorComponent = await wrapper.find(
		// 		"[data-testid='error-content']"
		// 	);
		// 	expect(errorComponent.vm.$props.isGenericError).toBe(true);
		// });
	});
});
