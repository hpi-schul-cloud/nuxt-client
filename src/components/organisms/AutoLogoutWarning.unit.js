import AutoLogoutWarning from "./AutoLogoutWarning";

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

describe("@components/organisms/AutoLogoutWarning", () => {
	let actions;
	let wrapper;

	const showModal = () => {
		wrapper.vm.$store.state.autoLogout.active = true;
	};

	const setShowToast = (value) => {
		wrapper.vm.$eventBus.$emit("showToast@autologout", value);
	};

	beforeAll(() => {
		actions = getMockActions();
		const mock = getMocks({ actions });
		wrapper = mount(AutoLogoutWarning, {
			...mock,
		});
	});

	it(...isValidComponent(AutoLogoutWarning));

	it("should call init on store", async () => {
		expect(actions.init.mock.calls).toHaveLength(1);
	});

	it("changing the error property should toggle content of the modal", async () => {
		showModal();
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".sloth").html()).toContain("Sloth.svg");
		wrapper.vm.$store.state.autoLogout.error = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".sloth").html()).toContain("Sloth_error.svg");
	});

	it("calculate remaining time in minutes correctly", async () => {
		expect(wrapper.vm.$store.state.autoLogout.remainingTimeInSeconds).toBe(120);
		expect(wrapper.vm.remainingTimeInMinutes).toBe(2);
		wrapper.vm.$store.state.autoLogout.remainingTimeInSeconds = 100;
		expect(wrapper.vm.remainingTimeInMinutes).toBe(1);
		wrapper.vm.$store.state.autoLogout.remainingTimeInSeconds = -999;
		expect(wrapper.vm.remainingTimeInMinutes).toBe(0);
	});

	describe("Extend secession", () => {
		it("extend secession over modal", async () => {
			showModal();
			await wrapper.vm.$nextTick();

			wrapper.find("button").trigger("click");
			await wrapper.vm.$nextTick();
			expect(actions.extendSession.mock.calls).toHaveLength(1);
		});

		it("show success toast on showToast change", async () => {
			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			setShowToast(toast.success);
			await wrapper.vm.$nextTick();

			expect(toastStubs.success.mock.calls).toHaveLength(1);
			expect(toastStubs.error.mock.calls).toHaveLength(0);
		});

		it("show retry error toast on showToast change", async () => {
			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			setShowToast(toast.error);
			await wrapper.vm.$nextTick();

			expect(toastStubs.success.mock.calls).toHaveLength(0);
			expect(toastStubs.error.mock.calls).toHaveLength(1);
		});

		it("show 401 error toast on showToast change", async () => {
			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			setShowToast(toast.error401);
			await wrapper.vm.$nextTick();

			expect(toastStubs.success.mock.calls).toHaveLength(0);
			expect(toastStubs.error.mock.calls).toHaveLength(1);
		});
	});
});
