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
import Alert from "./Alert.vue";
import { VAlert } from "vuetify/lib/components/index.mjs";

const getWrapper = (props?: AlertPayload) => {
	const data: AlertPayload = {
		text: "hello world",
		status: "success",
	};
	return mount(Alert, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props: {
			notification: data,
			...props,
		},
	});
};

describe("AlertContainer", () => {
	beforeEach(() => {
		setupStores({
			notifierModule: NotifierModule,
		});
	});

	it("should observe the store and set 'showNotifier' to true when rendered and data set", async () => {
		const wrapper = getWrapper();
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
		jest.advanceTimersByTime(50000);
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

	it("should emit 'remove:notification' when close button clicked", async () => {
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
		expect(wrapper.emitted("remove:notification")).toHaveLength(1);
	});
});
