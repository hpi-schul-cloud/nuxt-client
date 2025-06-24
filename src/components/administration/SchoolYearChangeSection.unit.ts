import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import { AUTH_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import {
	envsFactory,
	maintenanceStatusFactory,
	meResponseFactory,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useSharedSchoolYearChange } from "@data-school";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { VBtn, VCheckbox } from "vuetify/lib/components/index";
import SchoolYearChangeSection from "./SchoolYearChangeSection.vue";

jest.mock("@data-school");

describe("SchoolYearChangeSection", () => {
	let useSharedSchoolYearChangeApiMock: DeepMocked<
		ReturnType<typeof useSharedSchoolYearChange>
	>;

	const envConfigModule = createModuleMocks(EnvConfigModule, {
		getEnv: envsFactory.build(),
	});

	const schoolId = "schoolId";
	const mockMe = meResponseFactory.build({ school: { id: schoolId } });
	const authModule = createModuleMocks(AuthModule, {
		getSchool: mockMe.school,
	});

	const getWrapper = () => {
		const wrapper = mount(SchoolYearChangeSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useSharedSchoolYearChangeApiMock = createMock<
			ReturnType<typeof useSharedSchoolYearChange>
		>({ maintenanceStatus: ref() });

		jest
			.mocked(useSharedSchoolYearChange)
			.mockReturnValue(useSharedSchoolYearChangeApiMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when section is rendered", () => {
		describe("when no button is pushed and it is not in the school year change period", () => {
			const setup = () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(1999, 0, 1));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
					maintenanceStatusFactory.build();
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should show all buttons disabled", () => {
				const { wrapper } = setup();

				const transferStartButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="start-transfer-button"]'
				);
				const transferStartedButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="started-transfer-button"]'
				);
				const ldapButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="ldap-data-button"]'
				);
				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);
				const transferFinishButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="finish-transfer-button"]'
				);

				expect(transferStartButton.isVisible()).toBeTruthy();
				expect(transferStartButton.props().disabled).toBeTruthy();

				expect(transferStartedButton.exists()).toBeFalsy();

				expect(ldapButton.props().disabled).toBeTruthy();

				expect(checkBox.props().disabled).toBeTruthy();
				expect(checkBox.props().modelValue).toBe(false);

				expect(transferFinishButton.props().disabled).toBeTruthy();
			});
		});

		describe("when no button is pushed and it is school year change period", () => {
			const setup = () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
					maintenanceStatusFactory.build();
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should show transferStartButton button enabled", () => {
				const { wrapper } = setup();

				const transferStartButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="start-transfer-button"]'
				);
				const transferStartedButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="started-transfer-button"]'
				);
				const ldapButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="ldap-data-button"]'
				);
				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);
				const transferFinishButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="finish-transfer-button"]'
				);

				expect(transferStartButton.isVisible()).toBeTruthy();
				expect(transferStartButton.props().disabled).toBeFalsy();

				expect(transferStartedButton.exists()).toBeFalsy();

				expect(ldapButton.props().disabled).toBeTruthy();

				expect(checkBox.props().disabled).toBeTruthy();
				expect(checkBox.props().modelValue).toBe(false);

				expect(transferFinishButton.props().disabled).toBeTruthy();
			});
		});
	});

	describe("StartTransferButton", () => {
		describe("when transfer button is clicked", () => {
			const setup = () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
					maintenanceStatusFactory.build();
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should open dialog", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const title = wrapper.findComponent('[data-testid="dialog-title"]');
				const cancelBtn = wrapper.findComponent(
					'[data-testid="dialog-cancel"]'
				);
				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);

				expect(title.isVisible()).toBeTruthy();
				expect(cancelBtn.isVisible()).toBeTruthy();
				expect(confirmBtn.isVisible()).toBeTruthy();
			});
		});
	});

	describe("Start transfer Dialog", () => {
		const setup = () => {
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2000, 11, 31));

			useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
				maintenanceStatusFactory.build();

			useSharedSchoolYearChangeApiMock.setMaintenanceMode.mockImplementation(
				() => {
					useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
						maintenanceStatusFactory.build({
							maintenance: {
								active: true,
								startDate: new Date(2000, 11, 31).toString(),
							},
						});
					return Promise.resolve();
				}
			);
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

				const cancelBtn = wrapper.findComponent(
					'[data-testid="dialog-cancel"]'
				);
				await cancelBtn.trigger("click");
				expect(
					useSharedSchoolYearChangeApiMock.setMaintenanceMode
				).not.toHaveBeenCalled();
			});

			it("should not show the dialog", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const title = wrapper.findComponent('[data-testid="dialog-title"]');
				const cancelBtn = wrapper.findComponent(
					'[data-testid="dialog-cancel"]'
				);
				await cancelBtn.trigger("click");

				expect(title.isVisible()).toBeFalsy();
			});

			it("should show the start transfer button", () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');

				expect(button.isVisible()).toBeTruthy();
			});
		});

		describe("when confirm button is clicked", () => {
			it("should not show the dialog", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const title = wrapper.findComponent('[data-testid="dialog-title"]');
				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);
				await confirmBtn.trigger("click");

				expect(title.isVisible()).toBeFalsy();
			});

			it("should call setMaintenance", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);
				await confirmBtn.trigger("click");

				expect(
					useSharedSchoolYearChangeApiMock.setMaintenanceMode
				).toHaveBeenCalledWith("schoolId", true);
			});

			it("should enable the get ldap data button", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);
				await confirmBtn.trigger("click");

				const ldapButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="ldap-data-button"]'
				);

				expect(ldapButton.isVisible()).toBeTruthy();
				expect(ldapButton.props().disabled).toBeFalsy();
			});

			it("should show the transfer started button", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);
				await confirmBtn.trigger("click");

				const transferStartedButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="started-transfer-button"]'
				);

				expect(transferStartedButton.isVisible()).toBeTruthy();
				expect(transferStartedButton.props().disabled).toBeTruthy();
			});
		});
	});

	describe("ldap button", () => {
		describe("when ldap button is clicked", () => {
			const setup = () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
					maintenanceStatusFactory.build({
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

				expect(ldapButton.attributes().href).toEqual(
					"/administration/startldapschoolyear"
				);
				expect(ldapButton.attributes().target).toEqual("_blank");
			});

			it("should enable checkbox", async () => {
				const { wrapper } = setup();

				const ldapButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="ldap-data-button"]'
				);
				await ldapButton.trigger("click");

				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);

				expect(checkBox.isVisible()).toBeTruthy();
				expect(checkBox.props().disabled).toBeFalsy();
				expect(checkBox.props().modelValue).toBe(false);
			});
		});
	});

	describe("checkbox", () => {
		describe("when checkbox is checked", () => {
			const setup = async () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
					maintenanceStatusFactory.build({
						maintenance: {
							active: true,
							startDate: new Date(2000, 11, 31).toString(),
						},
					});
				const { wrapper } = getWrapper();

				const ldapButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="ldap-data-button"]'
				);
				await ldapButton.trigger("click");

				return {
					wrapper,
					ldapButton,
				};
			};

			it("should disable ldap button", async () => {
				const { wrapper, ldapButton } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);
				checkBox.vm.$emit("update:modelValue", true);
				await nextTick();

				expect(ldapButton.props().disabled).toBeTruthy();
			});

			it("should enable transfer finish button", async () => {
				const { wrapper } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);
				checkBox.vm.$emit("update:modelValue", true);
				await nextTick();

				const transferFinishButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="finish-transfer-button"]'
				);

				expect(transferFinishButton.props().disabled).toBeFalsy();
			});
		});

		describe("when checkbox is unchecked", () => {
			const setup = async () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
					maintenanceStatusFactory.build({
						maintenance: {
							active: true,
							startDate: new Date(2000, 11, 31).toString(),
						},
					});
				const { wrapper } = getWrapper();

				const ldapButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="ldap-data-button"]'
				);
				await ldapButton.trigger("click");

				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);
				checkBox.vm.$emit("update:modelValue", true);
				await nextTick();

				return {
					wrapper,
					ldapButton,
				};
			};

			it("should enable ldap button", async () => {
				const { wrapper, ldapButton } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);
				checkBox.vm.$emit("update:modelValue", false);
				await nextTick();

				expect(ldapButton.props().disabled).toBeFalsy();
			});

			it("should disable transfer finish button", async () => {
				const { wrapper } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);
				checkBox.vm.$emit("update:modelValue", false);
				await nextTick();

				const transferFinishButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="finish-transfer-button"]'
				);

				expect(transferFinishButton.props().disabled).toBeTruthy();
			});
		});
	});

	describe("transfer finish button", () => {
		describe("when transfer finish button is clicked", () => {
			const setup = async () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(2000, 11, 31));

				useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
					maintenanceStatusFactory.build({
						maintenance: {
							active: true,
							startDate: new Date(2000, 11, 31).toString(),
						},
					});

				const { wrapper } = getWrapper();

				const ldapButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="ldap-data-button"]'
				);
				await ldapButton.trigger("click");

				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);
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

				const title = wrapper.findComponent('[data-testid="dialog-title"]');
				const cancelBtn = wrapper.findComponent(
					'[data-testid="dialog-cancel"]'
				);
				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);

				expect(title.isVisible()).toBeTruthy();
				expect(cancelBtn.isVisible()).toBeTruthy();
				expect(confirmBtn.isVisible()).toBeTruthy();
			});
		});
	});

	describe("Finish transfer Dialog", () => {
		const setup = async () => {
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2000, 11, 31));

			useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
				maintenanceStatusFactory.build({
					maintenance: {
						active: true,
						startDate: new Date(2000, 11, 31).toString(),
					},
				});

			useSharedSchoolYearChangeApiMock.setMaintenanceMode.mockImplementation(
				() => {
					useSharedSchoolYearChangeApiMock.maintenanceStatus.value =
						maintenanceStatusFactory.build({
							maintenance: { active: false, startDate: undefined },
						});
					return Promise.resolve();
				}
			);

			const { wrapper } = getWrapper();

			const ldapButton = wrapper.findComponent<typeof VBtn>(
				'[data-testid="ldap-data-button"]'
			);
			await ldapButton.trigger("click");

			const checkBox = wrapper.findComponent<typeof VCheckbox>(
				'[data-testid="checkbox-update-data"]'
			);
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

				const cancelBtn = wrapper.findComponent(
					'[data-testid="dialog-cancel"]'
				);
				await cancelBtn.trigger("click");
				expect(
					useSharedSchoolYearChangeApiMock.setMaintenanceMode
				).not.toHaveBeenCalled();
			});

			it("should not show the dialog", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const title = wrapper.findComponent('[data-testid="dialog-title"]');
				const cancelBtn = wrapper.findComponent(
					'[data-testid="dialog-cancel"]'
				);
				await cancelBtn.trigger("click");

				expect(title.isVisible()).toBeFalsy();
			});

			it("should show the start transfer button", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');

				expect(button.isVisible()).toBeTruthy();
			});
		});

		describe("when confirm button is clicked", () => {
			it("should not show the dialog", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const title = wrapper.findComponent('[data-testid="dialog-title"]');
				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);
				await confirmBtn.trigger("click");

				expect(title.isVisible()).toBeFalsy();
			});

			it("should call setMaintenance", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);
				await confirmBtn.trigger("click");

				expect(
					useSharedSchoolYearChangeApiMock.setMaintenanceMode
				).toHaveBeenCalledWith("schoolId", false);
			});

			it("should finish transfer phase", async () => {
				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);
				await confirmBtn.trigger("click");

				expect(
					useSharedSchoolYearChangeApiMock.setMaintenanceMode
				).toHaveBeenCalledWith("schoolId", false);
			});

			it("should show all buttons disabled, but checkbox enabled", async () => {
				const { wrapper } = await setup();

				const transferStartButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="start-transfer-button"]'
				);
				const transferStartedButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="started-transfer-button"]'
				);
				const ldapButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="ldap-data-button"]'
				);
				const checkBox = wrapper.findComponent<typeof VCheckbox>(
					'[data-testid="checkbox-update-data"]'
				);

				const transferFinishButton = wrapper.findComponent<typeof VBtn>(
					'[data-testid="finish-transfer-button"]'
				);

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				const confirmBtn = wrapper.findComponent(
					'[data-testid="dialog-confirm"]'
				);
				await confirmBtn.trigger("click");

				expect(transferStartButton.exists()).toBeFalsy();

				expect(transferStartedButton.isVisible()).toBeTruthy();
				expect(transferStartedButton.props().disabled).toBeTruthy();

				expect(ldapButton.props().disabled).toBeTruthy();

				expect(checkBox.props().disabled).toBeTruthy();
				expect(checkBox.props().modelValue).toBe(true);

				expect(transferFinishButton.props().disabled).toBeTruthy();
			});
		});
	});
});
