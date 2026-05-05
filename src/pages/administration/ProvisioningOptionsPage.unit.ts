import ProvisioningOptionsPage from "./ProvisioningOptionsPage.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import {
	AxiosResponseFactory,
	createTestEnvStore,
	mockedPiniaStoreTyping,
	provisioningOptionsResponseFactory,
} from "@@/tests/test-utils";
import { createTestSchoolStore } from "@@/tests/test-utils/factory/school-test.utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConfigResponse, SchulConneXProvisioningOptionsResponse } from "@api-server";
import { useSchoolStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { createRouterMock, getRouter, injectRouterMock } from "vue-router-mock";
import { VCheckboxBtn } from "vuetify/components";

describe("ProvisioningOptionsPage", () => {
	const getWrapper = (
		props: ComponentProps<typeof ProvisioningOptionsPage> = { systemId: "systemId" },
		envConfig: Partial<ConfigResponse> = { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: false },
		provisioningOptions: SchulConneXProvisioningOptionsResponse = provisioningOptionsResponseFactory.build()
	) => {
		const pinia = createTestingPinia({ stubActions: false });
		createTestEnvStore(envConfig);
		createTestSchoolStore();
		injectRouterMock(createRouterMock());

		const schoolStore = mockedPiniaStoreTyping(useSchoolStore);
		schoolStore.fetchProvisioningOptions.mockResolvedValue({
			result: AxiosResponseFactory.create(provisioningOptions),
			success: true,
			error: undefined,
		});
		schoolStore.setProvisioningOptions.mockResolvedValue({
			result: AxiosResponseFactory.create(provisioningOptions),
			success: true,
			error: undefined,
		});

		const wrapper = mount(ProvisioningOptionsPage, {
			global: {
				plugins: [pinia, createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return { wrapper, schoolStore };
	};

	const redirectPath = {
		path: "/administration/school-settings",
		query: { openPanels: "authentication" },
	};

	describe("onMounted", () => {
		it("should load provisioning options", async () => {
			const { schoolStore } = getWrapper({ systemId: "testSystemId" });
			await flushPromises();

			expect(schoolStore.fetchProvisioningOptions).toHaveBeenCalledWith("testSystemId");
		});
	});

	describe("checkboxes", () => {
		describe("when media licensing is disabled", () => {
			it("should render 3 checkboxes", async () => {
				const { wrapper } = getWrapper({ systemId: "systemId" }, { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: false });
				await flushPromises();

				expect(wrapper.find("[data-testid=checkbox-option-class]").exists()).toBe(true);
				expect(wrapper.find("[data-testid=checkbox-option-course]").exists()).toBe(true);
				expect(wrapper.find("[data-testid=checkbox-option-others]").exists()).toBe(true);
				expect(wrapper.find("[data-testid=checkbox-option-school-external-tools]").exists()).toBe(false);
			});
		});

		describe("when media licensing is enabled", () => {
			it("should render 4 checkboxes", async () => {
				const { wrapper } = getWrapper({ systemId: "systemId" }, { FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true });
				await flushPromises();

				expect(wrapper.find("[data-testid=checkbox-option-class]").exists()).toBe(true);
				expect(wrapper.find("[data-testid=checkbox-option-course]").exists()).toBe(true);
				expect(wrapper.find("[data-testid=checkbox-option-others]").exists()).toBe(true);
				expect(wrapper.find("[data-testid=checkbox-option-school-external-tools]").exists()).toBe(true);
			});
		});
	});

	describe("cancel button", () => {
		it("should not call update function", async () => {
			const { wrapper, schoolStore } = getWrapper();
			await flushPromises();

			const cancelButton = wrapper.find('[data-testid="provisioning-options-cancel-button"]');
			await cancelButton.trigger("click");

			expect(schoolStore.setProvisioningOptions).not.toHaveBeenCalled();
		});

		it("should redirect to school settings page", async () => {
			const { wrapper } = getWrapper();
			await flushPromises();

			const cancelButton = wrapper.find('[data-testid="provisioning-options-cancel-button"]');
			await cancelButton.trigger("click");

			expect(getRouter().push).toHaveBeenCalledWith(redirectPath);
		});
	});

	describe("save button", () => {
		describe("when enabling options", () => {
			it("should call the update function with current options", async () => {
				const options = provisioningOptionsResponseFactory.build();
				const { wrapper, schoolStore } = getWrapper({ systemId: "systemId" }, {}, options);
				await flushPromises();

				const saveButton = wrapper.find('[data-testid="provisioning-options-save-button"]');
				await saveButton.trigger("click");
				await flushPromises();

				expect(schoolStore.setProvisioningOptions).toHaveBeenCalledWith("systemId", options);
			});

			it("should redirect to school settings page on success", async () => {
				const { wrapper } = getWrapper();
				await flushPromises();

				const saveButton = wrapper.find('[data-testid="provisioning-options-save-button"]');
				await saveButton.trigger("click");
				await flushPromises();

				expect(getRouter().push).toHaveBeenCalledWith(redirectPath);
			});
		});

		describe("when disabling group options", () => {
			it("should show confirmation dialog", async () => {
				const askConfirmationSpy = vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(false);
				const options = provisioningOptionsResponseFactory.build({
					groupProvisioningClassesEnabled: true,
				});
				const { wrapper } = getWrapper({ systemId: "systemId" }, {}, options);
				await flushPromises();

				const checkboxes = wrapper.findAllComponents(VCheckboxBtn);
				const classCheckbox = checkboxes[0];
				classCheckbox.vm.$emit("update:modelValue", false);
				await nextTick();

				const saveButton = wrapper.find('[data-testid="provisioning-options-save-button"]');
				await saveButton.trigger("click");
				await flushPromises();

				expect(askConfirmationSpy).toHaveBeenCalledWith(
					expect.objectContaining({
						title: "components.administration.provisioningOptions.warning.title",
						messageType: "warning",
					})
				);
			});

			it("should not call update function when confirmation is declined", async () => {
				vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(false);
				const options = provisioningOptionsResponseFactory.build({
					groupProvisioningClassesEnabled: true,
				});
				const { wrapper, schoolStore } = getWrapper({ systemId: "systemId" }, {}, options);
				await flushPromises();

				const checkboxes = wrapper.findAllComponents(VCheckboxBtn);
				checkboxes[0].vm.$emit("update:modelValue", false);
				await nextTick();

				const saveButton = wrapper.find('[data-testid="provisioning-options-save-button"]');
				await saveButton.trigger("click");
				await flushPromises();

				expect(schoolStore.setProvisioningOptions).not.toHaveBeenCalled();
			});

			it("should call update function when confirmation is accepted", async () => {
				vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
				const options = provisioningOptionsResponseFactory.build({
					groupProvisioningClassesEnabled: true,
				});
				const { wrapper, schoolStore } = getWrapper({ systemId: "systemId" }, {}, options);
				await flushPromises();

				const checkboxes = wrapper.findAllComponents(VCheckboxBtn);
				checkboxes[0].vm.$emit("update:modelValue", false);
				await nextTick();

				const saveButton = wrapper.find('[data-testid="provisioning-options-save-button"]');
				await saveButton.trigger("click");
				await flushPromises();

				expect(schoolStore.setProvisioningOptions).toHaveBeenCalled();
			});
		});
	});
});
