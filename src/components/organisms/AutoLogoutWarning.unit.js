import AutoLogoutWarning from "./AutoLogoutWarning";

const validData = {
	ttl: 7200,
};

const getMockActions = () => ({
	getTTL: jest.fn().mockReturnValue(Promise.resolve(validData)),
	resetJwtTimer: jest.fn().mockReturnValue(Promise.resolve()),
});

const getMocks = ({ actions = getMockActions() } = {}) =>
	createComponentMocks({
		i18n: true,
		store: {
			accounts: {
				actions,
			},
		},
	});

describe("@components/organisms/AutoLogoutWarning", () => {
	it(...isValidComponent(AutoLogoutWarning));

	it("changing the error property should toggle content of the modal", async () => {
		const wrapper = mount(AutoLogoutWarning, {
			...getMocks(),
		});

		wrapper.vm.active = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".sloth").html()).toContain("Sloth.svg");
		wrapper.vm.error = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".sloth").html()).toContain("Sloth_error.svg");
	});

	describe("POST (extend secession)", () => {
		it("extend secession over modal", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(AutoLogoutWarning, {
				...mock,
			});

			wrapper.vm.active = true;
			wrapper.vm.remainingTimeInSeconds = 399;
			await wrapper.vm.$nextTick();

			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			wrapper.find("button").trigger("click");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.active).toBe(false);
			expect(actions.getTTL.mock.calls).toHaveLength(0);
			expect(actions.resetJwtTimer.mock.calls).toHaveLength(1);
			expect(toastStubs.error.mock.calls).toHaveLength(0);
			expect(toastStubs.success.mock.calls).toHaveLength(1);
			expect(wrapper.vm.remainingTimeInSeconds).toBe(7200);
		});
		it("show retry and final error when extend secession failed", async () => {
			const error = {
				response: {
					status: 500,
				},
			};
			const remainingTime = 399;

			const mock = getMocks({
				actions: {
					resetJwtTimer: () => {
						throw error;
					},
				},
			});
			const wrapper = mount(AutoLogoutWarning, {
				...mock,
			});

			wrapper.vm.active = true;
			wrapper.vm.remainingTimeInSeconds = remainingTime;
			wrapper.vm.retry = 4; //skip retries for testing
			await wrapper.vm.$nextTick();

			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			wrapper.find("button").trigger("click");
			await wrapper.vm.$nextTick();
			expect(toastStubs.success.mock.calls).toHaveLength(0);
			expect(toastStubs.error.mock.calls).toHaveLength(0);
			expect(wrapper.vm.remainingTimeInSeconds).toBe(remainingTime);
			expect(wrapper.vm.error).toBe(true);
			expect(wrapper.vm.active).toBe(true);

			wrapper.vm.retry = 4; //skip retries for testing
			wrapper.find("button").trigger("click");
			await wrapper.vm.$nextTick();
			expect(toastStubs.success.mock.calls).toHaveLength(0);
			expect(toastStubs.error.mock.calls).toHaveLength(1);
			expect(wrapper.vm.remainingTimeInSeconds).toBe(remainingTime);
			expect(wrapper.vm.error).toBe(true);
			expect(wrapper.vm.active).toBe(false);
		});
	});
});
