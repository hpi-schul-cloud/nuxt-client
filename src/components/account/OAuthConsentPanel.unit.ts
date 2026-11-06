import OAuthConsentPanel from "./OAuthConsentPanel.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConsentSessionResponse } from "@data-account";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("OAuthConsentPanel.vue", () => {
	const setup = (sessions: ConsentSessionResponse[] = []) =>
		mount(OAuthConsentPanel, {
			props: {
				sessions,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("renders empty state message when no sessions exist", () => {
		const wrapper = setup([]);
		expect(wrapper.text()).toContain("pages.account.thirdParty.empty");
	});

	it("renders connected sessions and opens dialog on revoke click", async () => {
		const wrapper = setup([{ client_id: "c1", client_name: "App One", challenge: "ch1" }]);
		expect(wrapper.text()).toContain("App One");

		const revokeBtn = wrapper.find("button.text-error");
		await revokeBtn.trigger("click");

		expect(document.body.textContent).toContain("pages.account.thirdParty.dialogTitle");
	});
});
