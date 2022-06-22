import { mount } from "@vue/test-utils";
import Snackbar from "./Snackbar.vue";
import { notifierModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import NotifierModule from "@/store/notifier";

declare var createComponentMocks: Function;

const getWrapper: any = (device = "desktop", options?: object) => {
	return mount(Snackbar, {
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

describe("Snackbar", () => {
	beforeEach(() => {
		setupStores({
			notifier: NotifierModule,
		});
	});
	it("should watch 'notifierData' and set 'show' to true", async () => {
		const wrapper = getWrapper();
		expect(wrapper.vm.show).toBe(false);
		notifierModule.setNotifier({ text: "some text" });
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.show).toBe(true);
	});

	it("should set computed properties", async () => {
		const wrapper = getWrapper();
		const data = {
			text: "hello world",
			status: "success",
			position: ["bottom", "left"],
			timeout: 3000,
			vertical: true,
			multiline: true,
			closeButtonColor: "black",
		};
		notifierModule.setNotifier(data);
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.show).toBe(true);
		expect(wrapper.vm.notifierData).toStrictEqual(data);
		expect(wrapper.vm.statusColor).toStrictEqual("var(--color-success)");
		expect(wrapper.vm.position).toStrictEqual(["bottom", "left"]);
		expect(wrapper.vm.timeout).toStrictEqual(3000);
		expect(wrapper.vm.vertical).toStrictEqual(true);
		expect(wrapper.vm.multiline).toStrictEqual(true);
		expect(wrapper.vm.closeButtonColor).toStrictEqual("black");
	});

	it("should set position 'bottom, center' as default if the device is mobile", async () => {
		const wrapper = getWrapper("mobile");
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.position).toStrictEqual(["bottom", "center"]);
	});
});
