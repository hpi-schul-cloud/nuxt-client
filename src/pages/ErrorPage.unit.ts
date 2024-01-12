import ErrorPage from "./Error.page.vue";
import { mount } from "@vue/test-utils";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { APPLICATION_ERROR_KEY } from "@/utils/inject";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { nextTick } from "vue";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

jest.mock("@/composables/locale-storage.composable", () => ({
	useStorage: () => ({
		set: jest.fn(),
		get: jest.fn(),
		getMultiple: jest.fn(),
		remove: jest.fn(),
	}),
}));

describe("@pages/Error.page.vue", () => {
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { assign: jest.fn() },
		});
		Object.defineProperty(window, "performance", {
			value: {
				getEntriesByType: jest.fn(), // for reload checking (see component)
				now: jest.fn(), // for vue metrics
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
		return mount(ErrorPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					// we have to provide a translation that is different from the key because
					// the component checks for translation existence
					createTestingI18n({
						messages: {
							en: { "error.401": "translated_error.401" },
						},
					}),
				],
				provide: {
					[APPLICATION_ERROR_KEY.valueOf()]: createModuleMocks(
						ApplicationErrorModule,
						{
							getStatusCode: statusCode,
							getTranslationKey: translationKey,
						}
					),
				},
			},
		});
	};

	it("should assign 'window.location' when back button is clicked", async () => {
		const wrapper = mountComponent();
		// const btnElement = await wrapper.find("[data-testid='btn-back']");
		const btnElement = wrapper.findComponent({ ref: "btn-back" });
		await btnElement.trigger("click");
		expect(window.location.assign).toHaveBeenCalledWith("/dashboard");
	});

	describe("when the '/error' route has been called", () => {
		it("should pass error-message and statuscode to content component", async () => {
			const wrapper = mountComponent(401, "error.401");
			await nextTick();
			const errorComponent = wrapper.findComponent(ErrorContent);
			expect(errorComponent.props("statusCode")).toBe(401);
			expect(errorComponent.props("errorText")).toBe("translated_error.401");
		});
	});
});
