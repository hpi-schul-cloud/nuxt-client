import ErrorPage from "./Error.page.vue";
import { shallowMount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { APPLICATION_ERROR_KEY, I18N_KEY } from "@/utils/inject";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("@pages/Error.page.vue", () => {
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { assign: jest.fn() },
		});
		Object.defineProperty(window, "performance", {
			value: {
				getEntriesByType: jest.fn(),
				measure: jest.fn(),
			},
		});
		(window.performance.getEntriesByType as jest.Mock).mockReturnValue([
			{ type: "navigate" },
		]);
	});

	const mountComponent = (
		statusCode: HttpStatusCode | null = 400,
		translationKey = "error.400"
	) => {
		return shallowMount(ErrorPage, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[APPLICATION_ERROR_KEY.valueOf()]: createModuleMocks(
					ApplicationErrorModule,
					{
						getStatusCode: statusCode,
						getTranslationKey: translationKey,
					}
				),
				[I18N_KEY.valueOf()]: {
					t: (key: string) => "translated_" + key,
					tc: (key: string) => "translated_" + key,
				},
			},
		});
	};

	it("should assign 'window.location' when back button is clicked", async () => {
		const wrapper = mountComponent();
		// const btnElement = await wrapper.find("[data-testid='btn-back']");
		const btnElement = await wrapper.findComponent({ ref: "btn-back" });
		await btnElement.vm.$emit("click");
		expect(window.location.assign).toHaveBeenCalledWith("/dashboard");
	});

	describe("when the '/error' route has been called", () => {
		it("should pass error-message and statuscode to content component", async () => {
			const wrapper = mountComponent(401, "error.401");
			const errorComponent = await wrapper.findComponent(ErrorContent);
			expect(errorComponent.attributes("statuscode")).toBe("401");
			expect(errorComponent.attributes("errortext")).toBe(
				"translated_error.401"
			);
		});
	});
});
