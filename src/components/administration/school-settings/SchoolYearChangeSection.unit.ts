import SchoolYearChangeSection from "./SchoolYearChangeSection.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import {
	createTestAppStoreWithSchool,
	createTestEnvStore,
	maintenanceStatusFactory,
	mockComposable,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useSharedSchoolYearChange } from "@data-school";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, Mocked } from "vitest";
import { nextTick, ref } from "vue";
import { VBtn, VCheckbox } from "vuetify/components";

vi.mock("@data-school");

describe("SchoolYearChangeSection", () => {
	const schoolId = "schoolId";
	let useSharedSchoolYearChangeApiMock: Mocked<ReturnType<typeof useSharedSchoolYearChange>>;

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
		useSharedSchoolYearChangeApiMock = mockComposable(useSharedSchoolYearChange, {
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

	describe("Start transfer", () => {
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

		describe("when transfer is confirmed", () => {
			it("should call setMaintenance", async () => {
				vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);

				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				expect(useSharedSchoolYearChangeApiMock.setMaintenanceMode).toHaveBeenCalledWith("schoolId", true);
			});

			it("should enable the get ldap data button", async () => {
				vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');

				expect(ldapButton.isVisible()).toBeTruthy();
				expect(ldapButton.props().disabled).toBeFalsy();
			});

			it("should show the transfer started button", async () => {
				vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const transferStartedButton = wrapper.findComponent<typeof VBtn>('[data-testid="started-transfer-button"]');

				expect(transferStartedButton.isVisible()).toBeTruthy();
				expect(transferStartedButton.props().disabled).toBeTruthy();
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

				expect(checkBox.isVisible()).toBeTruthy();
				expect(checkBox.props().disabled).toBeFalsy();
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

				expect(ldapButton.props().disabled).toBeTruthy();
			});

			it("should enable transfer finish button", async () => {
				const { wrapper } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				checkBox.vm.$emit("update:modelValue", true);
				await nextTick();

				const transferFinishButton = wrapper.findComponent<typeof VBtn>('[data-testid="finish-transfer-button"]');

				expect(transferFinishButton.props().disabled).toBeFalsy();
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

				expect(ldapButton.props().disabled).toBeFalsy();
			});

			it("should disable transfer finish button", async () => {
				const { wrapper } = await setup();

				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');
				checkBox.vm.$emit("update:modelValue", false);
				await nextTick();

				const transferFinishButton = wrapper.findComponent<typeof VBtn>('[data-testid="finish-transfer-button"]');

				expect(transferFinishButton.props().disabled).toBeTruthy();
			});
		});
	});

	describe("Finish transfer", () => {
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

		describe("when confirm button is clicked", () => {
			it("should call setMaintenance", async () => {
				vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);

				const { wrapper } = await setup();

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

				expect(useSharedSchoolYearChangeApiMock.setMaintenanceMode).toHaveBeenCalledWith("schoolId", false);
			});

			it("should show all buttons disabled, but checkbox enabled", async () => {
				vi.spyOn(confirmDialogUtils, "askConfirmation").mockResolvedValue(true);
				const { wrapper } = await setup();

				const transferStartButton = wrapper.findComponent<typeof VBtn>('[data-testid="start-transfer-button"]');
				const transferStartedButton = wrapper.findComponent<typeof VBtn>('[data-testid="started-transfer-button"]');
				const ldapButton = wrapper.findComponent<typeof VBtn>('[data-testid="ldap-data-button"]');
				const checkBox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox-update-data"]');

				const transferFinishButton = wrapper.findComponent<typeof VBtn>('[data-testid="finish-transfer-button"]');

				const button = wrapper.find('[data-testid="finish-transfer-button"]');
				await button.trigger("click");

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
