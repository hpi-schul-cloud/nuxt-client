import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import AlertContainer from "./AlertContainer.vue";
import { VAlert, VIcon } from "vuetify/lib/components/index";
import { AlertPayload, notifySuccess, useNotificationStore } from "@data-app";
import { beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { mdiInformation } from "@icons/material";

describe("AlertContainer", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	const getWrapper = () => {
		const wrapper = mount(AlertContainer, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("Alert should initially not be rendered", () => {
		const { wrapper } = getWrapper();

		const alertComponent = wrapper.findComponent(VAlert);
		expect(alertComponent.exists()).toBe(false);
	});

	it("should display Alert with correct data", () => {
		const alertPayload: AlertPayload = {
			text: "hello world",
			status: "info",
			autoClose: true,
		};
		useNotificationStore().notify(alertPayload);
		const { wrapper } = getWrapper();
		const alert = wrapper.findComponent(VAlert);

		expect(alert.props("type")).toBe("info");
		expect(alert.text()).toEqual(alertPayload.text);
		expect(alert.classes()).toContain(`bg-${alertPayload.status}`);
		expect(wrapper.findComponent(VIcon).props("icon")).toBe(mdiInformation);
	});

	it("should be able to render list", async () => {
		const { wrapper } = getWrapper();
		["hello world", "hello bar"].forEach((message) => notifySuccess(message));
		await nextTick();

		const notificationData = wrapper.findAllComponents(VAlert);
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

	it("should set desktop position-class as default", () => {
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
