import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import Alert from "./Alert.vue";
import { mdiCheckCircle } from "@icons/material";
import { VAlert, VIcon } from "vuetify/lib/components/index";
import { beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { useNotificationStore } from "@data-app";

const getWrapper = () => {
	const wrapper = mount(Alert, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props: {
			notification: { text: "hello world", status: "success" },
		},
	});

	return { wrapper };
};

describe("Alert", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("should set correct data", () => {
		const { wrapper } = getWrapper();

		expect(wrapper.find(".alert-text").text()).toBe("hello world");
		expect(wrapper.findComponent(VIcon).props("icon")).toBe(mdiCheckCircle);
		expect(wrapper.findComponent(VAlert).props("type")).toBe("success");
	});

	it("should remove the alert, when user clicks the close button.", async () => {
		const { wrapper } = getWrapper();

		const button = wrapper.findComponent(".v-alert__close > button");
		await button.trigger("click");

		expect(useNotificationStore().notifierItems.length).toBe(0);
	});
});
