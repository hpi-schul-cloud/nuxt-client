import SvsDialogBtnCancel from "./SvsDialogBtnCancel.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { VBtn } from "vuetify/components";

describe("SvsDialogBtnCancel", () => {
	const setup = (textLangKey?: string) =>
		mount(SvsDialogBtnCancel, {
			props: {
				textLangKey,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("renders the button with custom textLangKey", () => {
		const wrapper = setup("any.other.cancel");
		expect(wrapper.findComponent(VBtn).props().text).toBe("any.other.cancel");
	});

	it("emits 'click' event when clicked", async () => {
		const wrapper = setup();
		await wrapper.trigger("click");
		expect(wrapper.emitted("click")).toHaveLength(1);
	});
});
