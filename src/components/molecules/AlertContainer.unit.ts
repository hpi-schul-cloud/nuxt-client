import { notifierModule } from "@/store";
import NotifierModule from "@/store/notifier";
import { AlertPayload } from "@/store/types/alert-payload";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import AlertContainer from "./AlertContainer.vue";
import Alert from "./Alert.vue";

const getWrapper = (device = "desktop", options?: object) => {
	return mount(AlertContainer, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				mq: { current: device },
			},
		},
		...options,
	});
};

describe("AlertContainer", () => {
	beforeEach(() => {
		setupStores({
			notifierModule: NotifierModule,
		});
	});

	it("Alert should be rendered", async () => {
		const wrapper = getWrapper();
		const alertComponent = wrapper.findComponent(Alert);
		expect(alertComponent).toBeDefined();
	});

	it("should hand over notification to Alert", async () => {
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			autoClose: true,
			timeout: 5000,
		};
		notifierModule.show(data);
		await nextTick();

		const notificationData = wrapper.findComponent(Alert).props("notification");
		expect(notificationData).toEqual(data);
	});

	it("should set mobile position-class as default if the device is mobile", async () => {
		const wrapper = getWrapper("mobile");
		await nextTick();
		const result = wrapper.find(".alert-wrapper-mobile");
		expect(result.element).toBeTruthy();
	});

	it("should set desktop position-class as default if the device is desktop or tablet", async () => {
		const wrapper = getWrapper("desktop");
		await nextTick();
		const result = wrapper.get(".alert-wrapper");
		expect(result.element).toBeTruthy();
	});
});
