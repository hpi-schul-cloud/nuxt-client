import NotifierModule from "@/store/notifier";
import { AlertPayload } from "@/store/types/alert-payload";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mount } from "@vue/test-utils";
import AlertContainer from "./AlertContainer.vue";
import Alert from "./Alert.vue";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";

const getWrapper = (items: AlertPayload[] = [], options?: object) => {
	const notifierModule = createModuleMocks(NotifierModule, {
		getNotifierItems: items,
	});

	const wrapper = mount(AlertContainer, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
		},
		...options,
	});

	return { wrapper, notifierModule };
};

describe("AlertContainer", () => {
	it("Alert should initially not be rendered", () => {
		const { wrapper } = getWrapper();

		const alertComponent = wrapper.findComponent(Alert);
		expect(alertComponent.exists()).toBe(false);
	});

	it("should display Alert with correct data", () => {
		const alertPayload: AlertPayload = {
			text: "hello world",
			status: "info",
			autoClose: true,
			timeout: 5000,
		};
		const { wrapper } = getWrapper([alertPayload]);

		const alert = wrapper.findComponent(Alert);
		expect(alert.text()).toEqual(alertPayload.text);
		expect(alert.classes()).toContain(`bg-${alertPayload.status}`);
	});

	it("should be able to render list", () => {
		const data: AlertPayload[] = [
			{
				text: "hello world",
				status: "success",
				autoClose: true,
				timeout: 5000,
			},
			{
				text: "hello bar",
				status: "success",
				autoClose: true,
				timeout: 5000,
			},
		];

		const { wrapper } = getWrapper(data);

		const notificationData = wrapper.findAllComponents(Alert);
		expect(notificationData.length).toEqual(2);
	});

	it("should set mobile position-class as default", () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 560,
		});
		window.dispatchEvent(new Event("resize"));

		const { wrapper } = getWrapper();

		const result = wrapper.find(".alert-wrapper-mobile");
		expect(result.exists()).toBe(true);
	});

	it("should set desktop position-class as default", async () => {
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 750,
		});
		window.dispatchEvent(new Event("resize"));

		const { wrapper } = getWrapper();

		const result = wrapper.find(".alert-wrapper");
		expect(result.exists()).toBe(true);
	});
});
