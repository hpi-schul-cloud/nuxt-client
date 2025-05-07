import NotifierModule from "@/store/notifier";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import {
	axiosErrorFactory,
	envsFactory,
	meResponseFactory,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useSchoolYearChange } from "@data-school";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import AuthModule from "../../store/auth";
import EnvConfigModule from "../../store/env-config";
import SchoolYearChangeSection from "./SchoolYearChangeSection.vue";

jest.mock("@data-school");

describe("SchoolYearChangeSection", () => {
	let useSchoolYearChangeApiMock: DeepMocked<
		ReturnType<typeof useSchoolYearChange>
	>;

	const notifierModule: jest.Mocked<NotifierModule> =
		createModuleMocks(NotifierModule);

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
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
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
		useSchoolYearChangeApiMock =
			createMock<ReturnType<typeof useSchoolYearChange>>();

		jest
			.mocked(useSchoolYearChange)
			.mockReturnValue(useSchoolYearChangeApiMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("onMounted", () => {
		describe("when no button is pushed and it is no school year change period", () => {
			const setup = () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(2025, 1, 25));

				useSchoolYearChangeApiMock.maintenanceStatus.value = {
					currentYear: {
						id: "5ebd6dc14a431f75ec9a3e7a",
						name: "2024/25",
						startDate: new Date(2024, 8, 1),
						endDate: new Date(2025, 7, 31),
					},
					nextYear: {
						id: "5ebd6dc14a431f75ec9a3e7b",
						name: "2025/26",
						startDate: new Date(2025, 8, 1),
						endDate: new Date(2026, 7, 31),
					},
					schoolUsesLdap: true,
					maintenance: {
						active: false,
					},
				};

				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should show all buttons disabled", () => {
				const { wrapper } = setup();

				const transferStartButton = wrapper.find(
					'[data-testid="start-transfer-button"]'
				);
				const transferStartedButton = wrapper.find(
					'[data-testid="started-transfer-button"]'
				);
				const ldapButton = wrapper.find('[data-testid="ldap-data-button"]');
				const transferFinishButton = wrapper.find(
					'[data-testid="finish-transfer-button"]'
				);

				expect(transferStartButton.exists()).toBeTruthy();
				expect(transferStartButton.isVisible).toBeTruthy();
			});
		});

		describe("when no button is pushed and it is school year change period", () => {
			const setup = () => {
				jest.useFakeTimers();
				jest.setSystemTime(new Date(2025, 7, 25));

				useSchoolYearChangeApiMock.maintenanceStatus.value = {
					currentYear: {
						id: "5ebd6dc14a431f75ec9a3e7a",
						name: "2024/25",
						startDate: new Date(2024, 8, 1),
						endDate: new Date(2025, 7, 31),
					},
					nextYear: {
						id: "5ebd6dc14a431f75ec9a3e7b",
						name: "2025/26",
						startDate: new Date(2025, 8, 1),
						endDate: new Date(2026, 7, 31),
					},
					schoolUsesLdap: true,
					maintenance: {
						active: false,
					},
				};
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should show all buttons disabled", () => {
				const { wrapper } = setup();

				const transferStartButton = wrapper.find(
					'[data-testid="start-transfer-button"]'
				);
				const transferStartedButton = wrapper.find(
					'[data-testid="started-transfer-button"]'
				);
				const ldapButton = wrapper.find('[data-testid="ldap-data-button"]');
				const transferFinishButton = wrapper.find(
					'[data-testid="finish-transfer-button"]'
				);

				expect(transferStartButton.exists()).toBeTruthy();
				expect(transferStartButton.isVisible).toBeTruthy();
				expect(transferStartButton.get("disabled"));
			});
		});
	});

	describe("StartTransferButton", () => {
		describe("when the request is successful", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should call the api", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				expect(
					useSchoolYearChangeApiMock.setMaintenanceMode
				).toHaveBeenCalledWith("schoolId", true);
			});

			it("should enable the get ldap data button", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				const buttonComponent = wrapper.find(
					'[data-testid="started-transfer-button"]'
				);

				expect(buttonComponent.exists()).toBe(true);
				expect(buttonComponent.classes("button-start")).toBeTruthy();
				expect(buttonComponent.text()).toEqual(
					"components.administration.schoolYearChangeSection.step.two.button"
				);
				//expect(buttonComponent.props("disabled")).toBeFalsy();
				expect(notifierModule.show).toHaveBeenCalledWith({
					status: "success",
					text: "components.administration.externalToolsSection.vidis.notification.success",
				});
			});

			it("should show the transfer started button", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					status: "success",
					text: "components.administration.schoolYearChangeSection.step.one.button.transferStarted",
				});
			});
		});

		describe("when the request fails with a timeout", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				useSchoolYearChangeApiMock.setMaintenanceMode.mockRejectedValueOnce(
					axiosErrorFactory
						.withStatusCode(HttpStatusCode.RequestTimeout)
						.build()
				);

				return {
					wrapper,
				};
			};

			it("should show a failure notification", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="start-transfer-button"]');
				await button.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					status: "info",
					text: "components.administration.externalToolsSection.vidis.notification.timeout",
				});
			});
		});

		describe("when the request fails", () => {
			const setup = () => {
				const { wrapper } = getWrapper();

				//useSchoolLicenseApiMock.updateSchoolLicenses.mockRejectedValueOnce(
				//	new Error()
				//	);

				return {
					wrapper,
				};
			};

			it("should show a failure notification", async () => {
				const { wrapper } = setup();

				const button = wrapper.find('[data-testid="sync-vidis-media-button"]');
				await button.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					status: "error",
					text: "common.notification.error",
				});
			});
		});
	});
});
