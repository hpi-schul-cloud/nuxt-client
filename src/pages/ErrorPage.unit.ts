import ErrorPage from "./Error.page.vue";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import ApplicationErrorModule from "@/store/application-error";
import { createModuleMocks } from "@/utils/mock-store-module";
import i18n from "vue-i18n";

describe("@pages/Error.page.vue", () => {
	let navigationType = 'navigate';
	beforeEach(() => {
		Object.defineProperty(window, "location", {
			configurable: true,
			value: { assign: jest.fn() },
		});
		Object.defineProperty(window, "performance", {
			value: {
				getEntriesByType: jest.fn().mockReturnValue([{ type: navigationType }]),
				measure: jest.fn(),
			}
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

	it("should assign 'window.location' when back button is clicked", async () => {
		applicationErrorModuleMock = createModuleMocks(
			ApplicationErrorModule,
			errorModuleMocks
		);
		const wrapper = mountComponent();
		const btnElement = wrapper.find("[data-testid='btn-back']");
		await btnElement.trigger("click");
		expect(window.location.assign).toHaveBeenCalledWith("/dashboard");
	});

	describe("when the '/error' route has been called", () => {
		navigationType = 'reload';

		it("should set 'is-permission-error' prop to 'true'", async () => {
			applicationErrorModuleMock = createModuleMocks(
				ApplicationErrorModule,
				errorModuleMocks
			);
			const wrapper = mountComponent();
			const errorComponent = wrapper.find("[data-testid='error-content']");
			expect(errorComponent.vm.$props.isPermissionError).toBe(true);
		});

		it("should set 'is-generic-error' prop to 'true'", async () => {
			applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
				...errorModuleMocks,
				getStatusCode: 500,
				getTranslationKey: "generic error",
			});
			const wrapper = mountComponent();
			const errorComponent = wrapper.find("[data-testid='error-content']");
			expect(errorComponent.vm.$props.isGenericError).toBe(true);
		});

		it("should set 'is-generic-error' prop to 'true' even if there is no error in the store", async () => {
			applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
				...errorModuleMocks,
				getStatusCode: null,
				getTranslationKey: "",
			});
			const wrapper = mountComponent();
			const errorComponent = wrapper.find("[data-testid='error-content']");
			expect(errorComponent.vm.$props.isGenericError).toBe(true);
		});
	});

	describe("when the '/error' route has been reloaded", () => {
		const localStore : {[key:string] : any } = {
			"applicationErrorStatusCode": 401,
			"applicationErrorTranslationKey": "error.401",
		}
		navigationType = 'reload';

		beforeEach(() => {
			spyOn(window.localStorage, 'getItem').and.callFake((key) =>
				key in localStore ? localStore[key] : null
			);
		});

		it("should get errorModule from localStorage", async () => {
			applicationErrorModuleMock = createModuleMocks(ApplicationErrorModule, {
				...errorModuleMocks,
				getStatusCode: null,
				getTranslationKey: "",
			});
			const wrapper = mountComponent();
			const errorComponent = wrapper.find("[data-testid='error-content']");
			expect(errorComponent.vm.$props.isPermissionError).toBe(true);
		});
	});
});
