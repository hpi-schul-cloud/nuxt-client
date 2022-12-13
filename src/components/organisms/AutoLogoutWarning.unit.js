import { autoLogoutModule, envConfigModule, notifierModule } from "@/store";
import AutoLogoutModule from "@/store/autoLogout";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import AutoLogoutWarning from "./AutoLogoutWarning";
import NotifierModule from "@/store/notifier";

const toast = {
	error401: -1,
	error: 0,
	success: 1,
};

const state = {
	active: false,
	error: false,
	remainingTimeInSeconds: 120,
	showToast: null,
};

const getters = {
	getActive: () => state.active,
	getError: () => state.error,
	getRemainingTimeInSeconds: () => state.remainingTimeInSeconds,
};

const getMockActions = () => ({
	init: jest.fn().mockReturnValue(Promise.resolve()),
	extendSession: jest.fn().mockReturnValue(Promise.resolve()),
});

const getMocks = ({ actions = getMockActions() } = {}) =>
	createComponentMocks({
		i18n: true,
		store: {
			autoLogout: {
				actions,
				state,
				getters,
			},
		},
	});

describe("@/components/organisms/AutoLogoutWarning", () => {
	let actions;
	let wrapper;

	const showModal = () => {
		autoLogoutModule.context.state.active = true;
	};

	const setShowToast = (value) => {
		autoLogoutModule.context.state.toastValue = value;
	};

	beforeAll(() => {
		setupStores({
			autoLogoutModule: AutoLogoutModule,
			envConfigModule: EnvConfigModule,
			notifierModule: NotifierModule,
		});

		actions = getMockActions();
		const mock = getMocks({ actions });
		wrapper = mount(AutoLogoutWarning, {
			...mock,
		});
	});

	it("should call init on store", async () => {
		const { showWarningOnRemainingSeconds, defaultRemainingTimeInSeconds } =
			autoLogoutModule.context.state;
		const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } =
			envConfigModule.getEnv;
		expect(showWarningOnRemainingSeconds).toBe(
			JWT_SHOW_TIMEOUT_WARNING_SECONDS
		);
		expect(defaultRemainingTimeInSeconds).toBe(JWT_TIMEOUT_SECONDS);
	});

	it("changing the error property should toggle content of the modal", async () => {
		showModal();
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".sloth").html()).toContain("Sloth.svg");
		autoLogoutModule.context.state.error = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".sloth").html()).toContain("Sloth_error.svg");
	});

	it("calculate remaining time in minutes correctly", async () => {
		autoLogoutModule.context.state.remainingTimeInSeconds = 120;
		expect(autoLogoutModule.context.state.remainingTimeInSeconds).toBe(120);
		expect(wrapper.vm.remainingTimeInMinutes).toBe(2);
		autoLogoutModule.context.state.remainingTimeInSeconds = 100;
		expect(wrapper.vm.remainingTimeInMinutes).toBe(1);
		autoLogoutModule.context.state.remainingTimeInSeconds = -999;
		expect(wrapper.vm.remainingTimeInMinutes).toBe(0);
	});

	describe("Extend secession", () => {
		beforeEach(() => {
			jest.resetAllMocks();
		});
		it("extend secession over modal", async () => {
			const extendSpy = jest.fn();
			autoLogoutModule.extendSessionAction = extendSpy;

			showModal();
			await wrapper.vm.$nextTick();

			expect(wrapper.find("button")).toBeDefined();
			wrapper.find("button").trigger("click");
			await wrapper.vm.$nextTick();
			expect(extendSpy.mock.calls).toHaveLength(1);
		});

		it("show success toast on showToast change", async () => {
			const notifierMock = jest.spyOn(notifierModule, "show");
			setShowToast(toast.success);
			await wrapper.vm.$nextTick();

			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("success");
		});

		it("show retry error toast on showToast change", async () => {
			const notifierMock = jest.spyOn(notifierModule, "show");
			setShowToast(toast.error);
			await wrapper.vm.$nextTick();

			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});

		it("show 401 error toast on showToast change", async () => {
			const notifierMock = jest.spyOn(notifierModule, "show");

			setShowToast(toast.error401);
			await wrapper.vm.$nextTick();

			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});
	});
});
