import SchoolYearChangeSection from "./SchoolYearChangeSection.vue";
import { createTestAppStoreWithSchool, createTestEnvStore, maintenanceStatusFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useSharedSchoolYearChange } from "@data-school";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { Dialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick, ref } from "vue";
import { VBtn, VCard, VCheckbox } from "vuetify/components";

vi.mock("@data-school");

describe("SchoolYearChangeSection", () => {
	const schoolId = "schoolId";
	let useSharedSchoolYearChangeApiMock: DeepMocked<ReturnType<typeof useSharedSchoolYearChange>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
		createTestAppStoreWithSchool(schoolId);
	});

	const getWrapper = () => {
		const wrapper = mount(SchoolYearChangeSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSharedSchoolYearChangeApiMock = createMock<ReturnType<typeof useSharedSchoolYearChange>>({
			maintenanceStatus: ref(),
		});

		vi.mocked(useSharedSchoolYearChange).mockReturnValue(useSharedSchoolYearChangeApiMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when section is rendered", () => {
		describe("when no button is pushed and it is not in the school year change period", () => {
			const setup = () => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date(1999, 0, 1));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build();
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should show all buttons disabled", () => {
				const { wrapper } = setup();

				const transferStartButton = wrapper.findComponent<typeof VBtn>('[data-testid="start-transfer-button"]');
				const transferStartedButton = wrapper.findComponent<typeof VBtn>('[data-testid="started-transfer-button"]');
				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				const transferFinishButton = wrapper.findComponent<typeof VBtn>('[data-testid="finish-transfer-button"]');

				expect(transferStartButton.isVisible()).toBe(true);
				expect(transferStartButton.props().disabled).toBe(true);

				expect(transferStartedButton.exists()).toBe(false);

				expect(ldapButton.props().disabled).toBe(true);

				expect(checkBox.props().disabled).toBe(true);
				expect(checkBox.props().modelValue).toBe(false);

				expect(transferFinishButton.props().disabled).toBe(true);
			});
		});

		describe("when no button is pushed and it is school year change period", () => {
			const setup = () => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build();
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should show transferStartButton button enabled", () => {
				const { wrapper } = setup();

				const transferStartButton = wrapper.findComponent<typeof VBtn>('[data-testid="start-transfer-button"]');
				const transferStartedButton = wrapper.findComponent<typeof VBtn>('[data-testid="started-transfer-button"]');
				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				const transferFinishButton = wrapper.findComponent<typeof VBtn>('[data-testid="finish-transfer-button"]');

				expect(transferStartButton.isVisible()).toBe(true);
				expect(transferStartButton.props().disabled).toBe(false);

				expect(transferStartedButton.exists()).toBe(false);

				expect(ldapButton.props().disabled).toBe(true);

				expect(checkBox.props().disabled).toBe(true);
				expect(checkBox.props().modelValue).toBe(false);

				expect(transferFinishButton.props().disabled).toBe(true);
			});
		});
	});

	describe("StartTransferButton", () => {
		describe("when transfer button is clicked", () => {
			const setup = () => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build();
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should open dialog", async () => {
				const { wrapper } = setup();

				const button = wrapper.findComponent('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const dialogs = wrapper.findAllComponents(Dialog);
				expect(dialogs[0].exists()).toBe(true);
				expect(dialogs[0].props().modelValue).toBe(true);
				expect(dialogs[0].props().title).toBe("components.administration.schoolYearChangeSection.dialog.start.title");
			});
		});
	});

	describe("Start transfer Dialog", () => {
		const setup = () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2000, 11, 31));

			useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build();

			useSharedSchoolYearChangeApiMock.setMaintenanceMode.mockImplementation(() => {
				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
					maintenance: {
						active: true,
						startDate: new Date(2000, 11, 31).toString(),
					},
				});
				return Promise.resolve();
			});
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		describe("when cancel button is clicked", () => {
			it("should not call setMaintenance", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const cancelBtn = wrapper.findComponent('[data-testid="dialog-cancel"]');
				await cancelBtn.trigger("click");
				expect(useSharedSchoolYearChangeApiMock.setMaintenanceMode).not.toHaveBeenCalled();
			});

			it("should close dialog", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const dialogs = wrapper.findAllComponents(Dialog);
				const startTransferDialog = dialogs[0];

				const cancelBtn = startTransferDialog.findComponent('[data-testid="dialog-cancel"]');
				await cancelBtn.trigger("click");

				expect(startTransferDialog.props().modelValue).toBe(false);
			});

			it("should show the start transfer button", () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');

				expect(button.isVisible()).toBe(true);
			});
		});

		describe("when confirm button is clicked", () => {
			it("should close dialog", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const dialogs = wrapper.findAllComponents(Dialog);
				const startTransferDialog = dialogs[0];

				const confirmBtn = startTransferDialog.findComponent('[data-testid="dialog-confirm"]');
				await confirmBtn.trigger("click");

				expect(startTransferDialog.props().modelValue).toBe(false);
			});

			it("should call setMaintenance", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent('[data-testid="dialog-confirm"]');
				await confirmBtn.trigger("click");

				expect(useSharedSchoolYearChangeApiMock.setMaintenanceMode).toHaveBeenCalledWith("schoolId", true);
			});

			it("should enable the get ldap data button", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent('[data-testid="dialog-confirm"]');
				await confirmBtn.trigger("click");

				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');

				expect(ldapButton.isVisible()).toBe(true);
				expect(ldapButton.props().disabled).toBe(false);
			});

			it("should show the transfer started button", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent('[data-testid="dialog-confirm"]');
				await confirmBtn.trigger("click");

				const transferStartedButton = wrapper.findComponent<typeof VBtn>('[data-testid="started-transfer-button"]');

				expect(transferStartedButton.isVisible()).toBe(true);
				expect(transferStartedButton.props().disabled).toBe(true);
			});
		});
	});

	describe("ldap button", () => {
		describe("when ldap button is clicked", () => {
			const setup = () => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
					maintenance: {
						active: true,
						startDate: new Date(2000, 11, 31).toString(),
					},
				});
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should open new tab for the result of ldap sync", async () => {
				const { wrapper } = setup();

				const ldapButton = wrapper.find('[data-testid="ldap-data-button"]');

				expect(ldapButton.attributes().href).toEqual("/administration/startldapschoolyear");
				expect(ldapButton.attributes().target).toEqual("_blank");
			});

			it("should enable checkbox", async () => {
				const { wrapper } = setup();

				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
				await ldapButton.trigger("click");

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');

				expect(checkBox.isVisible()).toBe(true);
				expect(checkBox.props().disabled).toBe(false);
				expect(checkBox.props().modelValue).toBe(false);
			});
		});
	});

	describe("checkbox", () => {
		describe("when checkbox is checked", () => {
			const setup = async () => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
					maintenance: {
						active: true,
						startDate: new Date(2000, 11, 31).toString(),
					},
				});
				const { wrapper } = getWrapper();

				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
				await ldapButton.trigger("click");

				return {
					wrapper,
					ldapButton,
				};
			};

			it("should disable ldap button", async () => {
				const { wrapper, ldapButton } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				checkBox.vm.$emit("update:modelValue", true);
				await nextTick();

				expect(ldapButton.props().disabled).toBe(true);
			});

			it("should enable transfer finish button", async () => {
				const { wrapper } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				checkBox.vm.$emit("update:modelValue", true);
				await nextTick();

				const transferFinishButton = wrapper.findComponent<typeof VBtn>('[data-testid="finish-transfer-button"]');

				expect(transferFinishButton.props().disabled).toBe(false);
			});
		});

		describe("when checkbox is unchecked", () => {
			const setup = async () => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
					maintenance: {
						active: true,
						startDate: new Date(2000, 11, 31).toString(),
					},
				});
				const { wrapper } = getWrapper();

				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
				await ldapButton.trigger("click");

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				checkBox.vm.$emit("update:modelValue", true);
				await nextTick();

				return {
					wrapper,
					ldapButton,
				};
			};

			it("should enable ldap button", async () => {
				const { wrapper, ldapButton } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				checkBox.vm.$emit("update:modelValue", false);
				await nextTick();

				expect(ldapButton.props().disabled).toBe(false);
			});

			it("should disable transfer finish button", async () => {
				const { wrapper } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				checkBox.vm.$emit("update:modelValue", false);
				await nextTick();

				const transferFinishButton = wrapper.findComponent<typeof VBtn>('[data-testid="finish-transfer-button"]');

				expect(transferFinishButton.props().disabled).toBe(true);
			});
		});
	});

	describe("transfer finish button", () => {
		describe("when transfer finish button is clicked", () => {
			const setup = async () => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
					maintenance: {
						active: true,
						startDate: new Date(2000, 11, 31).toString(),
					},
				});

				const { wrapper } = getWrapper();

				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
				await ldapButton.trigger("click");

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				checkBox.vm.$emit("update:modelValue", true);
				await nextTick();

				return {
					wrapper,
				};
			};

			it("should open dialog", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const dialogs = wrapper.findAllComponents(Dialog);
				expect(dialogs[1].props().title).toBe("components.administration.schoolYearChangeSection.dialog.finish.title");
				const finishTransferDialog = dialogs[1].findComponent(VCard);

				const title = finishTransferDialog.find('[data-testid="dialog-title"]');
				const cancelBtn = finishTransferDialog.findComponent('[data-testid="dialog-cancel"]');
				const confirmBtn = finishTransferDialog.findComponent('[data-testid="dialog-confirm"]');

				expect(title.exists()).toBe(true);
				expect(cancelBtn.exists()).toBe(true);
				expect(confirmBtn.exists()).toBe(true);
			});
		});
	});

	describe("Finish transfer Dialog", () => {
		const setup = async () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2000, 11, 31));

			useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
				maintenance: {
					active: true,
					startDate: new Date(2000, 11, 31).toString(),
				},
			});

			useSharedSchoolYearChangeApiMock.setMaintenanceMode.mockImplementation(() => {
				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
					maintenance: { active: false, startDate: undefined },
				});
				return Promise.resolve();
			});

			const { wrapper } = getWrapper();

			const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
			await ldapButton.trigger("click");

			const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
			checkBox.vm.$emit("update:modelValue", true);
			await nextTick();

			return {
				wrapper,
			};
		};

		describe("when cancel button is clicked", () => {
			it("should not call setMaintenance", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const cancelBtn = wrapper.findComponent('[data-testid="dialog-cancel"]');
				await cancelBtn.trigger("click");
				expect(useSharedSchoolYearChangeApiMock.setMaintenanceMode).not.toHaveBeenCalled();
			});

			it("should close dialog", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const dialogs = wrapper.findAllComponents(Dialog);
				const finishTransferDialog = dialogs[1];

				const cancelBtn = finishTransferDialog.findComponent('[data-testid="dialog-cancel"]');
				await cancelBtn.trigger("click");

				expect(finishTransferDialog.props().modelValue).toBe(false);
			});

			it("should show the finish transfer button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');

				expect(button.isVisible()).toBe(true);
			});
		});

		describe("when confirm button is clicked", () => {
			it("should close dialog", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const dialogs = wrapper.findAllComponents(Dialog);
				const finishTransferDialog = dialogs[1];

				const confirmBtn = finishTransferDialog.findComponent('[data-testid="dialog-confirm"]');
				await confirmBtn.trigger("click");

				expect(finishTransferDialog.props().modelValue).toBe(false);
			});

			it("should call setMaintenance", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent('[data-testid="dialog-confirm"]');
				await confirmBtn.trigger("click");

				expect(useSharedSchoolYearChangeApiMock.setMaintenanceMode).toHaveBeenCalledWith("schoolId", false);
			});

			it("should show all buttons disabled, but checkbox enabled", async () => {
				const { wrapper } = await setup();

				const transferStartButton = wrapper.findComponent<typeof VBtn>('[data-testid="start-transfer-button"]');
				const transferStartedButton = wrapper.findComponent<typeof VBtn>('[data-testid="started-transfer-button"]');
				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');

				const transferFinishButton = wrapper.findComponent<typeof VBtn>('[data-testid="finish-transfer-button"]');

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent('[data-testid="dialog-confirm"]');
				await confirmBtn.trigger("click");

				expect(transferStartButton.exists()).toBe(false);

				expect(transferStartedButton.isVisible()).toBe(true);
				expect(transferStartedButton.props().disabled).toBe(true);

				expect(ldapButton.props().disabled).toBe(true);

				expect(checkBox.props().disabled).toBe(true);
				expect(checkBox.props().modelValue).toBe(true);

				expect(transferFinishButton.props().disabled).toBe(true);
			});
		});
	});
});
