import OAuthConsentPanel from "./OAuthConsentPanel.vue";
import { askConfirmation } from "@/utils/confirmation-dialog.utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConsentSessionResponse } from "@data-account";
import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/utils/confirmation-dialog.utils");

describe("OAuthConsentPanel.vue", () => {
	const session: ConsentSessionResponse = { client_id: "c1", client_name: "App One", challenge: "ch1" };

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const setup = (sessions: ConsentSessionResponse[] = [], hasLoadError = false) =>
		mount(OAuthConsentPanel, {
			props: { sessions, hasLoadError },
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("renders the empty state when no sessions exist", () => {
		const wrapper = setup([]);

		expect(wrapper.find('[data-testid="third-party-logins-empty"]').text()).toBe("pages.account.thirdParty.empty");
	});

	it("shows a load error instead of the empty state when loading failed", () => {
		const wrapper = setup([], true);

		expect(wrapper.find('[data-testid="third-party-logins-error"]').text()).toContain(
			"pages.account.thirdParty.loadError"
		);
		expect(wrapper.find('[data-testid="third-party-logins-empty"]').exists()).toBe(false);
	});

	it("lists provider names without the technical client id", () => {
		const wrapper = setup([session]);
		const item = wrapper.find('[data-testid="third-party-login"]');

		expect(item.text()).toContain("App One");
		expect(item.text()).not.toContain("c1");
	});

	it.each([
		[true, [["c1"]]],
		[false, undefined],
	])("emits revoke only after confirmation (confirmed: %s)", async (confirmed, expected) => {
		vi.mocked(askConfirmation).mockResolvedValueOnce(confirmed);
		const wrapper = setup([session]);

		await wrapper.find('[data-testid="revoke-third-party-login"]').trigger("click");
		await flushPromises();

		expect(askConfirmation).toHaveBeenCalledWith(
			expect.objectContaining({ confirmBtnKey: "pages.account.thirdParty.revoke" })
		);
		expect(wrapper.emitted("revoke")).toEqual(expected);
	});
});
