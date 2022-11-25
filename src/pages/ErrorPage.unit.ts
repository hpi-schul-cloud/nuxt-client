import ErrorPage from "./Error.page.vue";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";
import i18n from "vue-i18n";

describe("@pages/Error.page.vue", () => {
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { assign: jest.fn() },
		});
	});
	let applicationErrorModuleMock: ApplicationErrorModule;
	const errorModuleMocks: Partial<ApplicationErrorModule> = {
		getStatusCode: 401,
		getTranslationKey: "error.401",
		resetError: jest.fn(),
	};

	const mountComponent = () => {
		return mount(ErrorPage, {
			...createComponentMocks({ i18n: true }),
			setup() {
				provide("applicationErrorModule", applicationErrorModuleMock);
				provide("i18n", { t: (key: string) => new i18n().t(key) });
			},
		});
	};

	it("should show generic error-message no error in store", () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getStatusCode: null,
			getTranslationKey: "",
		});
		const wrapper = mountComponent();
		const errorElement = wrapper.find(".error-msg");
		expect(errorElement.element.innerHTML).toContain(
			wrapper.vm.$i18n.t("error.generic")
		);
	});

	it.skip("should show error-message which comes from the store", async () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getStatusCode: 401,
			getTranslationKey: "error.401",
		});
		const wrapper = mountComponent();

		const errorElement = wrapper.find(".error-msg");
		// TODO: investigate why this is not working properly
		expect(errorElement.element.innerHTML).toContain(
			wrapper.vm.$i18n.t("error.401")
		);
	});

	it("should assign 'window.location' when back button is clicked", async () => {
		applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
			...errorModuleMocks,
			getStatusCode: null,
			getTranslationKey: "",
		});
		const wrapper = mountComponent();
		const btnElement = wrapper.find("[data-testid='btn-back']");
		await btnElement.trigger("click");
		expect(window.location.assign).toHaveBeenCalledWith("/dashboard");
	});
});
