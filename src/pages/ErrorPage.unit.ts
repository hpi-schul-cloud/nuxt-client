import ErrorPage from "./Error.page.vue";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("@pages/Error.page.vue", () => {
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { assign: jest.fn() },
		});
	});
	let applicationErrorModuleMock: ApplicationErrorModule;
	const errorModuleMocks: Partial<ApplicationErrorModule> = {
		getError: { statusCode: 401, message: "Error message" },
		resetError: jest.fn(),
	};

	const mountComponent = () => {
		return mount(ErrorPage, {
			...createComponentMocks({ i18n: true }),
			setup() {
				provide("application-error", applicationErrorModuleMock);
			},
		});
	};

	it("should show generic error-message no error in store", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getError: null,
		});
		const wrapper = mountComponent();
		const errorElement = wrapper.find(".error-msg");
		expect(errorElement.element.innerHTML).toContain(
			wrapper.vm.$i18n.t("error.generic")
		);
	});

	it("should show error-message which comes from the store", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getError: { statusCode: 401, message: "401 Error" },
		});
		const wrapper = mountComponent();
		const errorElement = wrapper.find(".error-msg");
		expect(errorElement.element.innerHTML).toContain("401 Error");
	});

	it("should assign 'window.location' when back button is clicked", async () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getError: { statusCode: 401, message: "401 Error" },
		});
		const wrapper = mountComponent();
		const btnElement = wrapper.find("[data-testid='btn-back']");
		await btnElement.trigger("click");
		expect(window.location.assign).toHaveBeenCalledWith("/dashboard");
	});
});
