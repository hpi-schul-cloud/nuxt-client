import AccountPage from "./Account.page.vue";
import { createTestAppStore, createTestAppStoreWithRole } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName } from "@api-server";
import * as accountComposable from "@data-account";
import { AccountProfileData } from "@data-account";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { computed, ref } from "vue";

describe("AccountPage", () => {
	const mockLoadProfile = vi.fn();
	const mockUpdateProfile = vi.fn();
	const mockUpdateVisibility = vi.fn();
	const mockLoadConsentSessions = vi.fn();
	const mockRevokeConsentSession = vi.fn();

	const mockProfile = ref<AccountProfileData | null>({
		id: "user-1",
		firstName: "Max",
		lastName: "Mustermann",
		email: "max@example.com",
		isSSO: false,
		isStudent: false,
		discoverable: true,
	});

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
		vi.clearAllMocks();
		mockLoadProfile.mockResolvedValue(mockProfile.value);
		mockUpdateProfile.mockResolvedValue({ success: true });
		mockUpdateVisibility.mockResolvedValue(true);
		mockLoadConsentSessions.mockResolvedValue([]);
		mockRevokeConsentSession.mockResolvedValue(true);

		vi.spyOn(accountComposable, "useAccount").mockReturnValue({
			profile: mockProfile,
			consentSessions: ref([]),
			hasConsentSessionsError: ref(false),
			isLoading: computed(() => false),
			isUpdating: ref(false),
			isSSO: computed(() => false),
			loadProfile: mockLoadProfile,
			updateProfile: mockUpdateProfile,
			updateVisibility: mockUpdateVisibility,
			loadConsentSessions: mockLoadConsentSessions,
			revokeConsentSession: mockRevokeConsentSession,
		});
	});

	const getWrapper = async () => {
		const wrapper = mount(AccountPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		await flushPromises();
		return wrapper;
	};

	const alertText = (wrapper: Awaited<ReturnType<typeof getWrapper>>, testId: string) =>
		wrapper.find(`[data-testid="${testId}"]`).text();

	it("loads profile and consent sessions and renders the profile form", async () => {
		const wrapper = await getWrapper();

		expect(mockLoadProfile).toHaveBeenCalled();
		expect(mockLoadConsentSessions).toHaveBeenCalled();
		expect(wrapper.find('[data-test-id="input_email"]').exists()).toBe(true);
	});

	it("shows an error when the profile cannot be loaded", async () => {
		mockLoadProfile.mockResolvedValueOnce(null);
		const wrapper = await getWrapper();

		expect(alertText(wrapper, "error-alert")).toContain("pages.account.notifications.loadError");
	});

	describe("profile update", () => {
		it("shows the success notification", async () => {
			const wrapper = await getWrapper();

			await wrapper.findComponent({ name: "ProfileForm" }).vm.$emit("submit", { passwordOld: "secret" });
			await flushPromises();

			expect(mockUpdateProfile).toHaveBeenCalledWith({ passwordOld: "secret" });
			expect(alertText(wrapper, "notification")).toContain("pages.account.notifications.success");
		});

		it("shows the server error message", async () => {
			mockUpdateProfile.mockResolvedValueOnce({ success: false, errorMessage: "Wrong password" });
			const wrapper = await getWrapper();

			await wrapper.findComponent({ name: "ProfileForm" }).vm.$emit("submit", { passwordOld: "secret" });
			await flushPromises();

			expect(wrapper.find('[data-testid="notification"]').exists()).toBe(false);
			expect(alertText(wrapper, "error-alert")).toContain("Wrong password");
		});

		it("falls back to a generic error message", async () => {
			mockUpdateProfile.mockResolvedValueOnce({ success: false });
			const wrapper = await getWrapper();

			await wrapper.findComponent({ name: "ProfileForm" }).vm.$emit("submit", { passwordOld: "secret" });
			await flushPromises();

			expect(alertText(wrapper, "error-alert")).toContain("pages.account.notifications.error");
		});
	});

	describe("directory visibility", () => {
		it("is hidden for students", async () => {
			createTestAppStoreWithRole(RoleName.STUDENT);
			const wrapper = await getWrapper();

			expect(wrapper.findComponent({ name: "DirectoryVisibilityCard" }).exists()).toBe(false);
		});

		it.each([
			[true, "notification", "pages.account.notifications.visibilitySuccess"],
			[false, "error-alert", "pages.account.notifications.error"],
		])("shows the result when the update returns %s", async (result, testId, message) => {
			createTestAppStoreWithRole(RoleName.TEACHER);
			mockUpdateVisibility.mockResolvedValueOnce(result);
			const wrapper = await getWrapper();

			await wrapper.findComponent({ name: "DirectoryVisibilityCard" }).vm.$emit("submit", false);
			await flushPromises();

			expect(mockUpdateVisibility).toHaveBeenCalledWith(false);
			expect(alertText(wrapper, testId)).toContain(message);
		});
	});

	describe("third party logins", () => {
		it("marks the session as revoking until the request finishes", async () => {
			let resolveRevoke: (value: boolean) => void = () => undefined;
			mockRevokeConsentSession.mockReturnValueOnce(new Promise((resolve) => (resolveRevoke = resolve)));
			const wrapper = await getWrapper();

			const panel = wrapper.findComponent({ name: "OAuthConsentPanel" });
			await panel.vm.$emit("revoke", "client-1");

			expect(mockRevokeConsentSession).toHaveBeenCalledWith("client-1");
			expect(panel.props("revokingId")).toBe("client-1");

			resolveRevoke(true);
			await flushPromises();

			expect(panel.props("revokingId")).toBe("");
			expect(alertText(wrapper, "notification")).toContain("pages.account.notifications.revokeSuccess");
		});

		it("shows an error when revoking fails", async () => {
			mockRevokeConsentSession.mockResolvedValueOnce(false);
			const wrapper = await getWrapper();

			await wrapper.findComponent({ name: "OAuthConsentPanel" }).vm.$emit("revoke", "client-1");
			await flushPromises();

			expect(alertText(wrapper, "error-alert")).toContain("pages.account.notifications.revokeError");
		});
	});
});
