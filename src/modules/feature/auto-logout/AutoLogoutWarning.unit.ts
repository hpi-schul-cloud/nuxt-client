import { useAutoLogout } from "./autoLogout.composable";
import AutoLogoutWarning from "./AutoLogoutWarning.vue";
import { SessionStatus } from "./types";
import BaseModal from "@/components/base/BaseModal.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
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
	afterEach(() => {
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
		isTTLUpdated: ref(false),
		remainingTimeInMinutes: computed(() => 0),
		remainingTimeInSeconds: 0,
		showWarningOnRemainingSeconds: 0,
		sessionStatus: ref<SessionStatus | null>(null),
		createSession: vi.fn(),
		extendSession: vi.fn(),
	};

	const setup = (options?: { autoLogoutVariables?: Partial<typeof defaultVars> }) => {
		options = {
			autoLogoutVariables: { ...defaultVars },
			...options,
		};

		mockedUseAutoLogout.mockReturnValue({
			...defaultVars,
			...options.autoLogoutVariables,
		});

		const wrapper = mount(AutoLogoutWarning, {
			attachTo: document.body,
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				components: {
					"base-modal": BaseModal,
				},
			},
		});
		return { wrapper, useAutoLogout: mockedUseAutoLogout() };
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
				const { wrapper } = setup({
					autoLogoutVariables: {
						showDialog: ref(true),
					},
				});

				const dialog = wrapper.findComponent(BaseModal);

				expect(dialog.props("active")).toBe(true);
			});
		});

		describe("when showDialog is set false", () => {
			it("should not show the dialog", () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						showDialog: ref(false),
					},
				});

				const dialog = wrapper.findComponent(BaseModal);
				expect(dialog.props("active")).toBe(false);
			});
		});
	});

	describe("confirm button", () => {
		describe("when sessionStatus is 'ended'", () => {
			it("should set the correct title", () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Ended),
					},
				});

				const button = wrapper.findComponent({ name: "v-btn" });
				expect(button.exists()).toBe(true);
				expect(button.text()).toContain("feature-autoLogout.button.confirm.returnToLogin");
			});

			it("should call router.push when clicked", async () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Ended),
					},
				});

				const button = wrapper.findComponent({ name: "v-btn" });
				await button.trigger("click");

				expect(router.push).toHaveBeenCalledWith("/login");
			});
		});

		describe("when sessionStatus is 'continued'", () => {
			it("should set the correct title", () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Continued),
					},
				});
				const button = wrapper.findComponent({ name: "v-btn" });

				expect(button.exists()).toBe(true);
				expect(button.text()).toContain("feature-autoLogout.button.confirm");
			});

			it("should call the extendSession method when clicked", async () => {
				const { wrapper } = setup({
					autoLogoutVariables: {
						sessionStatus: ref(SessionStatus.Continued),
					},
				});

				const button = wrapper.findComponent({ name: "v-btn" });
				await button.trigger("click");

				expect(mockedUseAutoLogout().extendSession).toHaveBeenCalled();
			});
		});
	});
});
