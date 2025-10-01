import Alert from "./Alert.vue";
import { AlertPayload } from "@/store/types/alert-payload";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiCheckCircle } from "@icons/material";
import { mount } from "@vue/test-utils";
import { VAlert, VIcon } from "vuetify/lib/components/index";

const getWrapper = (props?: AlertPayload) => {
	const data: AlertPayload = {
		text: "hello world",
		status: "success",
	};

	const wrapper = mount(Alert, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props: {
			notification: data,
			...props,
		},
	});

	return { wrapper };
};

describe("Alert", () => {
	it("should set correct data", () => {
		const { wrapper } = getWrapper();

		expect(wrapper.find(".alert-text").text()).toBe("hello world");
		expect(wrapper.findComponent(VIcon).props("icon")).toBe(mdiCheckCircle);
		expect(wrapper.findComponent(VAlert).props("type")).toBe("success");
	});

	describe("event remove:notification", () => {
		it("should be emitted when close is clicked", async () => {
			const { wrapper } = getWrapper();

			const button = wrapper.findComponent(".v-alert__close > button");
			await button.trigger("click");

			expect(wrapper.emitted("remove:notification")).toHaveLength(1);
		});
	});
});
