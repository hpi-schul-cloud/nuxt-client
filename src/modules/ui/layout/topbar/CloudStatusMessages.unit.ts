import CloudStatusMessages from "./CloudStatusMessages.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { mockStatusAlerts } from "@@/tests/test-utils/mockStatusAlerts";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

const testProps = {
	statusAlerts: mockStatusAlerts,
};

describe("@ui-layout/CloudStatusMessages", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	const setup = () => {
		const wrapper = mount(CloudStatusMessages, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: testProps,
		});

		return { wrapper };
	};

	it("should not render status alert items, when none are given", () => {
		const { wrapper } = setup();

		expect(wrapper.findAll("v-list-item")).toHaveLength(0);
	});

	it("should show alert title", () => {
		const { wrapper } = setup();
		const title = wrapper.find("[data-testid='alert-title-0']");
		expect(title.element.textContent).toContain(mockStatusAlerts[0].title);
	});

	it("should show alert text", () => {
		const { wrapper } = setup();

		const title = wrapper.find("[data-testid='alert-text-0']");

		expect(title.element.textContent).toContain(mockStatusAlerts[0].text);
	});

	it("should show multiple alerts", () => {
		const { wrapper } = setup();

		const title0 = wrapper.find("[data-testid='alert-title-0']");
		expect(title0.element.textContent).toContain(mockStatusAlerts[0].title);

		const title1 = wrapper.find("[data-testid='alert-title-1']");
		expect(title1.element.textContent).toContain(mockStatusAlerts[1].title);

		const title2 = wrapper.find("[data-testid='alert-title-2']");
		expect(title2.element.textContent).toContain(mockStatusAlerts[2].title);
	});

	it("should show formatted timestamp", () => {
		const { wrapper } = setup();

		const updatedText = wrapper
			.findAllComponents({
				name: "VListItemSubtitle",
			})[1]
			.html();

		expect(updatedText).toMatch("05.05.2023");
	});
});
