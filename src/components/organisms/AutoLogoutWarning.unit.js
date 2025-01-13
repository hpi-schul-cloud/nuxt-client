import AutoLogoutModule from "@/store/autoLogout";
import EnvConfigModule from "@/store/env-config";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";

import setupStores from "@@/tests/test-utils/setupStores";
import AutoLogoutWarning from "./AutoLogoutWarning";
import NotifierModule from "@/store/notifier";
import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import BaseModal from "@/components/base/BaseModal";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";

const toast = {
	error401: -1,
	error: 0,
	success: 1,
};

describe("@/components/organisms/AutoLogoutWarning", () => {
	beforeAll(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (autoLogoutModuleGetters = {}) => {
		const autoLogoutModuleMock = createModuleMocks(
			AutoLogoutModule,
			autoLogoutModuleGetters
		);

		const notifierModuleMock = createModuleMocks(NotifierModule);

		const wrapper = mount(AutoLogoutWarning, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				components: {
					"base-modal": BaseModal,
				},
				provide: {
					autoLogoutModule: autoLogoutModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				},
			},
		});

		return {
			wrapper,
			autoLogoutModule: autoLogoutModuleMock,
			notifierModule: notifierModuleMock,
		};
	};

	it("should call init on store", () => {
		const { autoLogoutModule } = setup();

		expect(autoLogoutModule.init).toHaveBeenCalled();
	});

	describe("modal error state", () => {
		describe("when error is false", () => {
			it("should display a non-error image", () => {
				const { wrapper } = setup({
					getActive: true,
					getError: false,
				});

				const slothImage = wrapper
					.findComponent({ name: "v-card" })
					.get("img.sloth");

				expect(slothImage.attributes("src")).toContain("Sloth.svg");
			});
		});

		describe("when error is true", () => {
			it("should display an error image", () => {
				const { wrapper } = setup({
					getActive: true,
					getError: true,
				});

				const slothImage = wrapper
					.findComponent({ name: "v-card" })
					.get("img.sloth");

				expect(slothImage.attributes("src")).toContain("Sloth_error.svg");
			});
		});
	});

	describe("calculate remaining time in minutes correctly", () => {
		it("120 seconds", () => {
			const { wrapper } = setup({
				getRemainingTimeInSeconds: 120,
			});
			expect(wrapper.vm.remainingTimeInMinutes).toBe(2);
		});

		it("100 seconds", () => {
			const { wrapper } = setup({
				getRemainingTimeInSeconds: 100,
			});
			expect(wrapper.vm.remainingTimeInMinutes).toBe(1);
		});

		it("-999 seconds", () => {
			const { wrapper } = setup({
				getRemainingTimeInSeconds: -999,
			});
			expect(wrapper.vm.remainingTimeInMinutes).toBe(0);
		});
	});

	describe("Extend session", () => {
		it("extend session over modal", async () => {
			const { wrapper, autoLogoutModule } = setup({
				getActive: true,
				getError: false,
			});

			const button = wrapper.findComponent({ name: "v-btn" });
			await button.trigger("click");

			expect(autoLogoutModule.extendSessionAction).toHaveBeenCalled();
		});

		it("show success toast on showToast change", () => {
			const { wrapper, notifierModule } = setup();

			wrapper.vm.$options.watch.toastValue.call(wrapper.vm, toast.success);

			expect(notifierModule.show).toHaveBeenCalledWith(
				expect.objectContaining({ status: "success" })
			);
		});

		it("show retry error toast on showToast change", async () => {
			const { wrapper, notifierModule } = setup();

			wrapper.vm.$options.watch.toastValue.call(wrapper.vm, toast.error);

			expect(notifierModule.show).toHaveBeenCalledWith(
				expect.objectContaining({ status: "error" })
			);
		});

		it("show 401 error toast on showToast change", async () => {
			const { wrapper, notifierModule } = setup();

			wrapper.vm.$options.watch.toastValue.call(wrapper.vm, toast.error401);

			expect(notifierModule.show).toHaveBeenCalledWith(
				expect.objectContaining({ status: "error" })
			);
		});
	});
});
