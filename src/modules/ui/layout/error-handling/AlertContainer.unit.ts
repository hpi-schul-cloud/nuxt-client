import AlertContainer from "./AlertContainer.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { AlertPayload, notifySuccess, useNotificationStore } from "@data-app";
import { mdiInformation } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick } from "vue";
import { I18nT } from "vue-i18n";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VAlert, VIcon } from "vuetify/components";

describe("AlertContainer", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	const getWrapper = () => {
		injectRouterMock(createRouterMock({}));
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

	describe("when a notification has an action", () => {
		it("should render the action button with the action text", () => {
			useNotificationStore().notify({
				text: "hello world",
				status: "success",
				action: { text: "Undo", handler: vi.fn() },
			});
			const { wrapper } = getWrapper();

			const actionButton = wrapper.find("[data-testId='alert-action']");
			expect(actionButton.exists()).toBe(true);
			expect(actionButton.text()).toBe("Undo");
		});

		it("should call the handler and remove the notification when clicked", async () => {
			const handler = vi.fn();
			useNotificationStore().notify({
				text: "hello world",
				status: "success",
				action: { text: "Undo", handler },
			});
			const { wrapper } = getWrapper();

			await wrapper.find("[data-testId='alert-action']").trigger("click");

			expect(handler).toHaveBeenCalled();
			expect(wrapper.findComponent(VAlert).exists()).toBe(false);
		});
	});

	it("should not render an action button when the notification has none", () => {
		useNotificationStore().notify({ text: "hello world", status: "info" });
		const { wrapper } = getWrapper();

		expect(wrapper.find("[data-testId='alert-action']").exists()).toBe(false);
	});

	describe("i18n-t component with links and replacements", () => {
		it("should render i18n-t with link slot when notification contains link", async () => {
			const { wrapper } = getWrapper();
			useNotificationStore().notify({
				text: "notification.with.{link}",
				status: "info",
				link: {
					to: "/test-route",
					text: "Click here",
				},
			});
			await nextTick();

			const i18n = wrapper.findComponent(I18nT);
			expect(i18n.exists()).toBe(true);
		});

		it("should render i18n-t with replace slots when notification contains replacements", async () => {
			const { wrapper } = getWrapper();

			useNotificationStore().notify({
				text: "notification.user.{userName}.{action}",
				status: "info",
				replace: {
					userName: "TestUser",
					action: "deleted",
				},
			});
			await nextTick();

			const i18n = wrapper.findComponent(I18nT);
			expect(i18n.exists()).toBe(true);
		});
	});
});
