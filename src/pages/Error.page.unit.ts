import ErrorPage from "./Error.page.vue";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick } from "vue";

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

vi.mock("@/composables/locale-storage.composable", () => ({
	useStorage: () => ({
		set: vi.fn(),
		get: vi.fn(),
		getMultiple: vi.fn().mockReturnValue([401, "de.unauthorized", false]),
		remove: vi.fn(),
	}),
}));

describe("@pages/Error.page.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	const mountComponent = () => {
		vi.spyOn(window.performance, "getEntriesByType").mockReturnValue([
			{
				entryType: "navigate",
				duration: 0,
				name: "",
				startTime: 0,
				toJSON: function () {
					throw new Error("Function not implemented.");
				},
			},
		]);

		Object.defineProperty(window, "location", {
			configurable: true,
			value: {
				...window.location,
				assign: vi.fn(),
			},
		});

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
			},
		});
	};
	describe("@/components/error-handling/ErrorPage.vue", () => {
		it("should assign 'window.location' when back button is clicked", async () => {
			const wrapper = mountComponent();
			const btnElement = wrapper.findComponent({ ref: "btn-back" });
			await btnElement.trigger("click");
			expect(window.location.assign).toHaveBeenCalledWith("/dashboard");
		});

		it("should pass error-message and statuscode to content component", async () => {
			useAppStore().handleApplicationError(HttpStatusCode.Unauthorized, "error.401");
			const wrapper = mountComponent();
			await nextTick();
			const errorComponent = wrapper.findComponent(ErrorContent);
			expect(errorComponent.props("statusCode")).toBe(401);
			expect(errorComponent.props("errorText")).toBe("translated_error.401");
		});
	});
});
