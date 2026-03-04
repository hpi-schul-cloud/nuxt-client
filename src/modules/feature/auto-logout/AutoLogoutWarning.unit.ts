import { useAutoLogout } from "./autoLogout.composable";
import AutoLogoutWarning from "./AutoLogoutWarning.vue";
import { SessionState } from "./types";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { computed, ref } from "vue";
import { Router, useRouter } from "vue-router";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

vi.mock("./autoLogout.composable", () => ({
	useAutoLogout: vi.fn(),
}));

vi.mock("vue-router", () => ({
	useRoute: vi.fn(),
	useRouter: vi.fn(),
}));

describe("AutoLogoutWarning", () => {
	let currentWrapper: ReturnType<typeof mount> | undefined;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		currentWrapper?.unmount();
		currentWrapper = undefined;
		vi.clearAllMocks();
	});

	const mockedUseAutoLogout = vi.mocked(useAutoLogout);
	const router = createMock<Router>({
		currentRoute: ref({ path: "/" }),
	});
	const useRouterMock = <Mock>useRouter;
	useRouterMock.mockReturnValue(router);

	const defaultVars = {
		showDialog: ref(true),
		errorOnExtend: ref(false),
		remainingTimeInMinutes: computed(() => 0),
		remainingTimeInSeconds: ref(0),
		showWarningOnRemainingSeconds: 0,
		sessionState: ref<SessionState | null>(null),
		createSession: vi.fn(),
		extendSession: vi.fn(),
	};

	const setup = (options?: { autoLogoutVariables?: Partial<typeof defaultVars> }) => {
		mockedUseAutoLogout.mockReturnValue({
			...defaultVars,
			...options?.autoLogoutVariables,
		});

		const wrapper = mount(AutoLogoutWarning, {
			attachTo: document.body,
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});
		currentWrapper = wrapper;
		const dialog = wrapper.findComponent(SvsDialog);
		return { wrapper, dialog, useAutoLogout: mockedUseAutoLogout() };
	};

	it("should render the component", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should call the createSession method on load", () => {
		setup();
		const mockedCreateSession = mockedUseAutoLogout().createSession;
		expect(mockedCreateSession).toHaveBeenCalled();
	});

	describe("when route changes", () => {
		it("should call createSession when route changes to a valid value", async () => {
			const { useAutoLogout } = setup();
			const createSessionMock = vi.mocked(useAutoLogout.createSession);

			// Reset mock after initial call from immediate watch
			createSessionMock.mockClear();

			// Trigger route change to a new valid value
			(router.currentRoute as ReturnType<typeof ref>).value = { path: "/new-route" };
			await Promise.resolve();

			expect(createSessionMock).toHaveBeenCalledTimes(1);
		});

		it("should not call createSession when route becomes undefined", async () => {
			const { useAutoLogout } = setup();
			const createSessionMock = vi.mocked(useAutoLogout.createSession);

			// Reset mock after initial call from immediate watch
			createSessionMock.mockClear();

			// Trigger route change to undefined
			(router.currentRoute as ReturnType<typeof ref>).value = undefined;
			await Promise.resolve();

			expect(createSessionMock).not.toHaveBeenCalled();
		});
	});

	describe("showDialog", () => {
		describe("when showDialog is set true", () => {
			it("should show the dialog", () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						showDialog: ref(true),
					},
				});

				expect(dialog.props("modelValue")).toBe(true);
			});
		});

		describe("when showDialog is set false", () => {
			it("should not show the dialog", () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						showDialog: ref(false),
					},
				});

				expect(dialog.props("modelValue")).toBe(false);
			});
		});

		describe("when dialog emits update:modelValue", () => {
			it("should update showDialog value", async () => {
				const showDialogRef = ref(true);
				const { dialog } = setup({
					autoLogoutVariables: {
						showDialog: showDialogRef,
					},
				});

				await dialog.vm.$emit("update:modelValue", false);

				expect(showDialogRef.value).toBe(false);
			});
		});
	});

	describe("confirm button", () => {
		describe("when sessionState is 'ended'", () => {
			it("should set the correct title", () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						sessionState: ref(SessionState.Expired),
					},
				});

				expect(dialog.props().confirmBtnLangKey).toEqual("feature-autoLogout.button.confirm.returnToLogin");
			});

			it("should call router.push when clicked", async () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						sessionState: ref(SessionState.Expired),
					},
				});

				dialog.vm.$emit("confirm");
				expect(router.push).toHaveBeenCalledWith("/login");
			});
		});

		describe("when sessionState is 'continued'", () => {
			it("should set the correct title", () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						sessionState: ref(SessionState.Extended),
					},
				});

				expect(dialog.props().confirmBtnLangKey).toEqual("feature-autoLogout.button.confirm");
			});

			it("should call the extendSession method when clicked", async () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						sessionState: ref(SessionState.Extended),
					},
				});
				dialog.vm.$emit("confirm");

				expect(mockedUseAutoLogout().extendSession).toHaveBeenCalled();
			});
		});
	});

	describe("image", () => {
		describe("when errorOnExtend is true", () => {
			it("should display the error image", () => {
				setup({
					autoLogoutVariables: {
						errorOnExtend: ref(true),
					},
				});

				const img = document.body.querySelector("img");
				expect(img?.getAttribute("src")).toContain("Sloth_error");
			});
		});

		describe("when errorOnExtend is false", () => {
			it("should display the default image", () => {
				setup({
					autoLogoutVariables: {
						errorOnExtend: ref(false),
					},
				});

				const img = document.body.querySelector("img");
				expect(img?.getAttribute("src")).not.toContain("Sloth_error");
			});
		});
	});

	describe("dialog content", () => {
		describe("when session is ended", () => {
			it("should display the error message", () => {
				setup({
					autoLogoutVariables: {
						sessionState: ref(SessionState.Expired),
					},
				});

				expect(document.body.textContent).toContain("feature-autoLogout.message.error.401");
			});
		});

		describe("when session is continued", () => {
			it("should display the warning instead of the error message", () => {
				const remainingTime = 5;
				setup({
					autoLogoutVariables: {
						sessionState: ref(SessionState.Extended),
						remainingTimeInMinutes: computed(() => remainingTime),
					},
				});

				expect(document.body.textContent).toContain("feature-autoLogout.warning");
				expect(document.body.textContent).not.toContain("feature-autoLogout.message.error.401");
			});
		});

		it("should render the WarningAlert component", () => {
			const { wrapper } = setup();

			const warningAlert = wrapper.findComponent(WarningAlert);
			expect(warningAlert.exists()).toBe(true);
		});
	});
});
