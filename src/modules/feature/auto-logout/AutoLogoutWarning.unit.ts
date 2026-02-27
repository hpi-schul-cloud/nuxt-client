import { useAutoLogout } from "./autoLogout.composable";
import AutoLogoutWarning from "./AutoLogoutWarning.vue";
import { SessionStatus } from "./types";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { setActivePinia } from "pinia";
import { computed, ref } from "vue";
import { createRouterMock, injectRouterMock, type RouterMock } from "vue-router-mock";

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

describe("AutoLogoutWarning", () => {
	let router: RouterMock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		router = createRouterMock();
		injectRouterMock(router);
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	const mockedUseAutoLogout = vi.mocked(useAutoLogout);

	const defaultVars = {
		showDialog: ref(true),
		errorOnExtend: ref(false),
		isTTLUpdated: ref(false),
		remainingTimeInMinutes: computed(() => 0),
		remainingTimeInSeconds: 0,
		showWarningOnRemainingSeconds: 0,
		sessionStatus: ref<SessionStatus | null>(null),
		createSession: vi.fn(),
		extendSession: vi.fn(),
	};

	const setup = (options?: { autoLogoutVariables?: Partial<typeof defaultVars> }) => {
		mockedUseAutoLogout.mockReturnValue({
			...defaultVars,
			...(options?.autoLogoutVariables ?? {}),
		});

		const wrapper = mount(AutoLogoutWarning, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
		});
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
	});

	describe("confirm button", () => {
		describe("when sessionStatus is 'ended'", () => {
			it("should set the correct title", () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Ended),
					},
				});

				expect(dialog.props().confirmBtnLangKey).toEqual("feature-autoLogout.button.confirm.returnToLogin");
			});

			it("should call router.push when clicked", async () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Ended),
					},
				});

				dialog.vm.$emit("confirm");
				expect(router.push).toHaveBeenCalledWith("/login");
			});
		});

		describe("when sessionStatus is 'continued'", () => {
			it("should set the correct title", () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Continued),
					},
				});

				expect(dialog.props().confirmBtnLangKey).toEqual("feature-autoLogout.button.confirm");
			});

			it("should call the extendSession method when clicked", async () => {
				const { dialog } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Continued),
					},
				});
				dialog.vm.$emit("confirm");

				expect(mockedUseAutoLogout().extendSession).toHaveBeenCalled();
			});
		});
	});
});
