import AutoLogoutWarning from "./AutoLogoutWarning.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

vi.mock("@data-app");

vi.mock("@data-env", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@data-env")>();
	return {
		...actual,
		useEnvConfig: vi.fn(() => ref({ JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600 })),
		useEnvStore: vi.fn(() => ({ fallBackLanguage: "en" })),
	};
});

describe("AutoLogoutWarning", () => {
	let currentWrapper: ReturnType<typeof mount> | undefined;

	const mockExtendSession = vi.fn();
	const mockAutoLogout = vi.fn();
	const mockStopTimer = vi.fn();

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		injectRouterMock(createRouterMock());

		vi.mocked(useAppStore).mockReturnValue({
			extendSession: mockExtendSession,
			autoLogout: mockAutoLogout,
			stopTimer: mockStopTimer,
			locale: "en",
		} as unknown as ReturnType<typeof useAppStore>);

		vi.mocked(useAppStoreRefs).mockReturnValue({
			sessionTimeoutTimestamp: ref(null),
		} as unknown as ReturnType<typeof useAppStoreRefs>);
	});

	afterEach(() => {
		currentWrapper?.unmount();
		currentWrapper = undefined;
		vi.clearAllMocks();
	});

	const setup = (options?: { sessionTimeoutTimestamp?: number | null }) => {
		if (options?.sessionTimeoutTimestamp !== undefined) {
			vi.mocked(useAppStoreRefs).mockReturnValue({
				sessionTimeoutTimestamp: ref(options.sessionTimeoutTimestamp),
			} as unknown as ReturnType<typeof useAppStoreRefs>);
		}

		const wrapper = mount(AutoLogoutWarning, {
			attachTo: document.body,
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});
		currentWrapper = wrapper;
		const dialog = wrapper.findComponent(SvsDialog);
		return { wrapper, dialog };
	};

	it("should render the component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	describe("showDialog", () => {
		describe("when sessionTimeoutTimestamp is null", () => {
			it("should not show the dialog", () => {
				const { dialog } = setup({ sessionTimeoutTimestamp: null });

				vi.advanceTimersByTime(1000);

				expect(dialog.props("modelValue")).toBe(false);
			});
		});

		describe("when session timeout is within warning threshold", () => {
			it("should show the dialog", async () => {
				const futureTimestamp = Date.now() + 60 * 1000; // 60 seconds from now
				const { dialog } = setup({ sessionTimeoutTimestamp: futureTimestamp });

				vi.advanceTimersByTime(1000);
				await currentWrapper?.vm.$nextTick();

				expect(dialog.props("modelValue")).toBe(true);
			});
		});

		describe("when session timeout is beyond warning threshold", () => {
			it("should not show the dialog", async () => {
				const futureTimestamp = Date.now() + 2 * 60 * 60 * 1000; // 2 hours from now
				const { dialog } = setup({ sessionTimeoutTimestamp: futureTimestamp });

				vi.advanceTimersByTime(1000);
				await currentWrapper?.vm.$nextTick();

				expect(dialog.props("modelValue")).toBe(false);
			});
		});
	});

	describe("confirm button", () => {
		it("should have the correct confirm button language key", () => {
			const { dialog } = setup();

			expect(dialog.props("confirmBtnLangKey")).toEqual("feature-autoLogout.button.confirm");
		});

		it("should call extendSession when confirm is clicked", async () => {
			const { dialog } = setup();

			await dialog.vm.$emit("confirm");

			expect(mockExtendSession).toHaveBeenCalled();
		});
	});

	describe("session timeout", () => {
		describe("when session has expired", () => {
			it("should call autoLogout", async () => {
				const pastTimestamp = Date.now() - 1000; // 1 second in the past
				setup({ sessionTimeoutTimestamp: pastTimestamp });

				vi.advanceTimersByTime(1000);
				await currentWrapper?.vm.$nextTick();

				expect(mockAutoLogout).toHaveBeenCalled();
				expect(mockStopTimer).toHaveBeenCalled();
			});
		});
	});

	describe("dialog content", () => {
		it("should display the warning message", async () => {
			const futureTimestamp = Date.now() + 60 * 1000; // 60 seconds from now
			setup({ sessionTimeoutTimestamp: futureTimestamp });

			vi.advanceTimersByTime(1000);
			await currentWrapper?.vm.$nextTick();

			expect(document.body.textContent).toContain("feature-autoLogout.warning");
		});

		it("should render the WarningAlert component", async () => {
			const futureTimestamp = Date.now() + 60 * 1000;
			const { wrapper } = setup({ sessionTimeoutTimestamp: futureTimestamp });

			vi.advanceTimersByTime(1000);
			await currentWrapper?.vm.$nextTick();

			const warningAlert = wrapper.findComponent(WarningAlert);
			expect(warningAlert.exists()).toBe(true);
		});
	});
});
