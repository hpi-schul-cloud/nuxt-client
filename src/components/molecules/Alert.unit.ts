import { mount, Wrapper } from "@vue/test-utils";
import Alert from "./Alert.vue";
import { notifierModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import NotifierModule from "@/store/notifier";
import Vue from "vue";
import { AlertPayload } from "@store/types/alert-payload";

declare var createComponentMocks: Function;

const getWrapper: any = (device = "desktop", options?: object) => {
	return mount(Alert, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		computed: {
			$mq: () => device,
		},
		...options,
	});
};

describe("Alert", () => {
	beforeEach(() => {
		setupStores({
			notifier: NotifierModule,
		});
	});

	it("should watch 'notifierData' and set 'show' to true", async () => {
		const wrapper = getWrapper();
		expect(wrapper.vm.show).toBe(false);
		notifierModule.setNotifier({ text: "some text", status: "success" });
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.show).toBe(true);
	});

	it("should be visible when set", async () => {
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			timeout: 3000,
		};
		notifierModule.show(data);
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.show).toBe(true);
		expect(wrapper.vm.notifierData).toStrictEqual(data);
	});

	it("should disappear after some time when no timeout is given", async () => {
		jest.useFakeTimers();
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
		};
		notifierModule.show(data);

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.show).toBe(true);
		jest.advanceTimersByTime(5000);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.show).toBe(false);
	});

	it("should not disappear after any time when timeout is 0", async () => {
		jest.useFakeTimers();
		const wrapper = getWrapper();
		const data: AlertPayload = {
			text: "hello world",
			status: "success",
			timeout: 0,
		};
		notifierModule.show(data);

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.show).toBe(true);

		jest.runAllTimers();

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.show).toBe(true);
	});

	it("should set position-class 'alert_wrapper-mobile' as default if the device is mobile", async () => {
		const wrapper: Wrapper<Vue> = getWrapper("mobile");
		await wrapper.vm.$nextTick();
		const result = wrapper.find(".alert_wrapper-mobile");
		expect(result.element).toBeTruthy();
	});

	it("should set position-class 'alert_wrapper' as default if the device is desktop or tablet", async () => {
		const wrapper: Wrapper<Vue> = getWrapper("desktop");
		await wrapper.vm.$nextTick();
		const result = wrapper.get(".alert_wrapper");
		expect(result.element).toBeTruthy();
	});
});
