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

const getWrapper = (
	device = "desktop",
	items: AlertPayload[] = [],
	options?: object
) => {
	const notifierModule = createModuleMocks(NotifierModule, {
		getNotifierItems: items,
	});

	const wrapper = mount(AlertContainer, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				mq: { current: device },
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

	it("should hand over notification to Alert", () => {
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			autoClose: true,
			timeout: 5000,
		};

		const { wrapper } = getWrapper("desktop", [data]);

		const notificationData = wrapper.findComponent(Alert).props("notification");
		expect(notificationData).toEqual(data);
	});

	it("should be able to render list", () => {
		const dataOne: AlertPayload = {
			text: "hello world",
			status: "success",
			autoClose: true,
			timeout: 5000,
		};

		const dataTwo: AlertPayload = {
			text: "hello bar",
			status: "success",
			autoClose: true,
			timeout: 5000,
		};

		const { wrapper } = getWrapper("desktop", [dataOne, dataTwo]);

		const notificationData = wrapper.findAllComponents(Alert);
		expect(notificationData.length).toEqual(2);
	});

	it("should set mobile position-class as default", () => {
		const { wrapper } = getWrapper("mobile");

		const result = wrapper.find(".alert-wrapper-mobile");
		expect(result.element).toBeTruthy();
	});

	it("should set desktop position-class as default", async () => {
		const { wrapper } = getWrapper("desktop");

		const result = wrapper.get(".alert-wrapper");
		expect(result.element).toBeTruthy();
	});
});
