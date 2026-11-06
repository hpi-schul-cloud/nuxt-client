import AccountPage from "./Account.page.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as accountComposable from "@data-account";
import { AccountProfileData } from "@data-account";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { computed, ref } from "vue";

describe("AccountPage", () => {
	const mockLoadProfile = vi.fn();
	const mockUpdateProfile = vi.fn().mockResolvedValue(true);
	const mockUpdateVisibility = vi.fn().mockResolvedValue(true);
	const mockLoadConsentSessions = vi.fn().mockResolvedValue([]);
	const mockRevokeConsentSession = vi.fn().mockResolvedValue(true);

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

		vi.spyOn(accountComposable, "useAccount").mockReturnValue({
			profile: mockProfile,
			consentSessions: ref([]),
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

	const getWrapper = () =>
		mount(AccountPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

	it("renders wireframe with profile form", async () => {
		const wrapper = getWrapper();
		await flushPromises();

		expect(mockLoadProfile).toHaveBeenCalled();
		expect(mockLoadConsentSessions).toHaveBeenCalled();
		expect(wrapper.find('[data-test-id="input_email"]').exists()).toBe(true);
	});

	it("shows success notification when profile update succeeds", async () => {
		const wrapper = getWrapper();
		await flushPromises();

		const profileForm = wrapper.findComponent({ name: "ProfileForm" });
		await profileForm.vm.$emit("submit", { passwordOld: "secret" });
		await flushPromises();

		expect(mockUpdateProfile).toHaveBeenCalledWith({ passwordOld: "secret" });
		const alert = wrapper.find('[data-testid="notification"]');
		expect(alert.exists()).toBe(true);
		expect(alert.text()).toContain("pages.account.notifications.success");
	});
});
