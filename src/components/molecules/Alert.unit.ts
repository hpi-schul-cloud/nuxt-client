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
import { VAlert } from "vuetify/lib/components/index.mjs";
import Alert from "./Alert.vue";

const getWrapper = (device = "desktop", options?: object) => {
	return mount(Alert, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			provide: {
				mq: { current: device },
			},
		},
		...options,
	});
};

describe("Alert", () => {
	beforeEach(() => {
		setupStores({
			notifierModule: NotifierModule,
		});
	});

	it("should observe the store and set 'showNotifier' to true", async () => {
		const wrapper = getWrapper();
		expect(wrapper.vm.showNotifier).toBe(false);
		notifierModule.setNotifier({ text: "some text", status: "success" });
		await nextTick();

		expect(wrapper.vm.showNotifier).toBe(true);
	});

	it("should be visible when set with text", async () => {
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
		};
		notifierModule.show(data);
		await nextTick();

		expect(wrapper.vm.showNotifier).toBe(true);
	});

	it("should be visible when set with message array", async () => {
		const wrapper = getWrapper();
		const data: AlertPayload = {
			messages: [{ title: "hello world", text: "Lorem ipsum" }],
			status: "success",
		};
		notifierModule.show(data);
		await nextTick();

		expect(wrapper.vm.showNotifier).toBe(true);
	});

	it("should disappear after default timeout when no timeout is given", async () => {
		jest.useFakeTimers();
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
		};
		notifierModule.show(data);

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);
		jest.advanceTimersByTime(5000);
		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(false);
	});

	it("should not disappear after default timeout when autoClose is false", async () => {
		jest.useFakeTimers();
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			autoClose: false,
		};
		notifierModule.show(data);

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);
		jest.advanceTimersByTime(5000);
		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);
	});

	it("should disappear after default timeout when autoClose is set", async () => {
		jest.useFakeTimers();

		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			autoClose: true,
			timeout: 5000,
		};
		notifierModule.show(data);

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);
		jest.advanceTimersByTime(5000);
		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(false);
	});

	it("should disappear after specific timeout when autoClose is not set", async () => {
		jest.useFakeTimers();
		const testTimeout = 1000;

		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			timeout: testTimeout,
		};
		notifierModule.show(data);

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);
		jest.advanceTimersByTime(testTimeout);
		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(false);
	});

	it("should not disappear after any time when autoClose is false", async () => {
		jest.useFakeTimers();
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			autoClose: false,
		};
		notifierModule.show(data);

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);

		jest.runAllTimers();

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);
	});

	it("should set store 'undefined' when close button clicked", async () => {
		jest.useFakeTimers();
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			autoClose: false,
		};
		notifierModule.show(data);

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);

		jest.runAllTimers();

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(true);

		const alertComponent = wrapper.findComponent(VAlert);
		await alertComponent.vm.$emit("update:modelValue");

		await nextTick();
		expect(wrapper.vm.showNotifier).toBe(false);
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
