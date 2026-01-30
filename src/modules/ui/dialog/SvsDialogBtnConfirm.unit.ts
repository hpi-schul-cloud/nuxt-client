import SvsDialogBtnConfirm from "./SvsDialogBtnConfirm.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { VBtn } from "vuetify/components";

describe("SvsDialogBtnConfirm", () => {
	const setup = (textLangKey?: string) =>
		mount(SvsDialogBtnConfirm, {
			props: {
				textLangKey,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("renders the button with custom textLangKey", () => {
		const wrapper = setup("any.other.confirm");
		expect(wrapper.findComponent(VBtn).props().text).toBe("any.other.confirm");
	});

	it("emits 'click' event when clicked", async () => {
		const wrapper = setup();
		await wrapper.trigger("click");
		expect(wrapper.emitted("click")).toHaveLength(1);
	});
});
