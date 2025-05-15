import { notifierModule } from "@/store";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import {
	axiosErrorFactory,
	i18nMock,
	maintenanceStatusFactory,
	mountComposable,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { ref, Ref } from "vue";
import { useSchoolApi } from "./schoolApi.composable";
import { useSchoolYearChange } from "./schoolYearChange.composable";
import { MaintenanceStatus } from "./types";

jest.mock("@data-school/schoolApi.composable");

describe("SchoolYearChange.composable", () => {
	let useSchoolApiMock: DeepMocked<ReturnType<typeof useSchoolApi>>;

	beforeEach(() => {
		useSchoolApiMock = createMock<ReturnType<typeof useSchoolApi>>();

		jest.mocked(useSchoolApi).mockReturnValue(useSchoolApiMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("fetchSchoolYearStatus", () => {
		describe("when fetching the current school year status", () => {
			const setup = () => {
				const maintenanceStatus = maintenanceStatusFactory.build();
				useSchoolApiMock.fetchMaintenanceStatus.mockResolvedValue(
					maintenanceStatus
				);

				const composable = mountComposable(() => useSchoolYearChange(), {
					global: {
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});

				return {
					composable,
					maintenanceStatus,
				};
			};

			it("should call useSchoolApi", async () => {
				const { composable } = setup();

				await composable.fetchSchoolYearStatus("id");

				expect(useSchoolApiMock.fetchMaintenanceStatus).toHaveBeenCalledWith(
					"id"
				);
			});

			it("should set maintenance status", async () => {
				const { composable, maintenanceStatus } = setup();

				await composable.fetchSchoolYearStatus("id");

				expect(composable.maintenanceStatus.value).toStrictEqual(
					maintenanceStatus
				);
			});

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.fetchSchoolYearStatus("id");

				expect(composable.isLoading.value).toBe(false);
			});
		});

		describe("when error occur during fetch", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useSchoolApiMock.fetchMaintenanceStatus.mockRejectedValueOnce(
					errorResponse
				);

				const composable = mountComposable(() => useSchoolYearChange(), {
					global: {
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});

				return {
					composable,
					apiError,
				};
			};

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.fetchSchoolYearStatus("id");

				expect(composable.isLoading.value).toBe(false);
			});

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.fetchSchoolYearStatus("id");

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should set maintenance status undefined", async () => {
				const { composable } = setup();

				await composable.fetchSchoolYearStatus("id");

				expect(composable.maintenanceStatus.value).toStrictEqual(undefined);
			});
		});
	});

	describe("setMaintenanceMode", () => {
		describe("when set maintenance mode", () => {
			const setup = () => {
				const maintenanceStatus = maintenanceStatusFactory.build({
					maintenance: {
						active: true,
						startDate: new Date(2001, 0, 1).toString(),
					},
				});
				useSchoolApiMock.setMaintenance.mockResolvedValue(maintenanceStatus);

				const composable = mountComposable(() => useSchoolYearChange(), {
					global: {
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});

				return {
					composable,
					maintenanceStatus,
				};
			};

			it("should call useSchoolApi", async () => {
				const { composable } = setup();

				await composable.setMaintenanceMode("id", true);

				expect(useSchoolApiMock.setMaintenance).toHaveBeenCalledWith(
					"id",
					true
				);
			});

			it("should set maintenance status", async () => {
				const { composable, maintenanceStatus } = setup();

				await composable.setMaintenanceMode("id", true);

				expect(composable.maintenanceStatus.value).toStrictEqual(
					maintenanceStatus
				);
			});

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.setMaintenanceMode("id", false);

				expect(composable.isLoading.value).toBe(false);
			});
		});

		describe("when error occur during set maintenance", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);
				const emptyObj: Ref<MaintenanceStatus | undefined> = ref();

				useSchoolApiMock.fetchMaintenanceStatus.mockRejectedValueOnce(
					errorResponse
				);

				const composable = mountComposable(() => useSchoolYearChange(), {
					global: {
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});

				return {
					composable,
					apiError,
					emptyObj,
				};
			};

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.setMaintenanceMode("id", false);

				expect(composable.isLoading.value).toBe(false);
			});

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.fetchSchoolYearStatus("id");

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});
		});
	});
});
