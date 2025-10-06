import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	axiosErrorFactory,
	expectNotification,
	i18nMock,
	maintenanceStatusFactory,
	mountComposable,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useSchoolApi } from "./schoolApi.composable";
import { useSchoolYearChange } from "./schoolYearChange.composable";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

vi.mock("@data-school/schoolApi.composable");

describe("SchoolYearChange.composable", () => {
	let useSchoolApiMock: DeepMocked<ReturnType<typeof useSchoolApi>>;

	const setupComposable = () => {
		const composable = mountComposable(() => useSchoolYearChange(), {
			global: {
				plugins: [createTestingI18n()],
				mocks: i18nMock,
			},
		});

		return {
			composable,
		};
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		useSchoolApiMock = createMock<ReturnType<typeof useSchoolApi>>();

		vi.mocked(useSchoolApi).mockReturnValue(useSchoolApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchSchoolYearStatus", () => {
		describe("when fetching the current school year status", () => {
			const setup = () => {
				const maintenanceStatus = maintenanceStatusFactory.build();
				useSchoolApiMock.fetchMaintenanceStatus.mockResolvedValue(
					maintenanceStatus
				);

				const { composable } = setupComposable();

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

				useSchoolApiMock.fetchMaintenanceStatus.mockRejectedValueOnce(
					errorResponse
				);

				const { composable } = setupComposable();

				return {
					composable,
				};
			};

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.fetchSchoolYearStatus("id");

				expect(composable.isLoading.value).toBe(false);
			});

			it("should show error notification", async () => {
				const { composable } = setup();

				await composable.fetchSchoolYearStatus("id");

				expectNotification("error");
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

				const { composable } = setupComposable();

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

			it("should show success message for starting transfer phase", async () => {
				const { composable } = setup();

				await composable.setMaintenanceMode("id", true);

				expectNotification("success");
			});

			it("should show success message for finishing transfer phase", async () => {
				const { composable } = setup();

				await composable.setMaintenanceMode("id", false);

				expectNotification("success");
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

				useSchoolApiMock.setMaintenance.mockRejectedValueOnce(errorResponse);

				const { composable } = setupComposable();

				return {
					composable,
					apiError,
				};
			};

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.setMaintenanceMode("id", false);

				expect(composable.isLoading.value).toBe(false);
			});

			describe("when error is a MISSING_YEARS error", () => {
				const setupError = () => {
					const errorResponse = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(errorResponse);
					apiError.type = "MISSING_YEARS";

					useSchoolApiMock.setMaintenance.mockRejectedValueOnce(errorResponse);

					const { composable } = setupComposable();

					return {
						composable,
					};
				};

				it("should show correct error message", async () => {
					const { composable } = setupError();

					await composable.setMaintenanceMode("id", false);

					expectNotification("error");
				});
			});

			describe("when error is a SCHOOL_ALREADY_IN_NEXT_YEAR", () => {
				const setupError = () => {
					const errorResponse = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(errorResponse);
					apiError.type = "SCHOOL_ALREADY_IN_NEXT_YEAR";

					const maintenanceStatus = maintenanceStatusFactory.build({
						maintenance: {
							active: true,
							startDate: new Date(2000, 0, 1).toString(),
						},
					});

					useSchoolApiMock.setMaintenance.mockRejectedValueOnce(errorResponse);

					const { composable } = setupComposable();
					composable.maintenanceStatus.value = maintenanceStatus;

					return {
						composable,
					};
				};

				it("should show correct error message", async () => {
					const { composable } = setupError();

					await composable.setMaintenanceMode("id", false);

					expectNotification("error");
				});

				it("should set maintenanceStatus", async () => {
					const { composable } = setupError();

					await composable.setMaintenanceMode("id", false);

					expect(composable.maintenanceStatus.value).toEqual(
						maintenanceStatusFactory.build({
							maintenance: { active: false },
							currentYear: {
								id: "456",
								name: "next school year",
								startDate: new Date(2001, 0, 1).toString(),
								endDate: new Date(2001, 11, 31).toString(),
							},
						})
					);
				});
			});

			describe("when error is something else", () => {
				const setupError = () => {
					const errorResponse = axiosErrorFactory.build();

					useSchoolApiMock.setMaintenance.mockRejectedValueOnce(errorResponse);

					const { composable } = setupComposable();

					return {
						composable,
					};
				};

				it("should show correct error message", async () => {
					const { composable } = setupError();

					await composable.setMaintenanceMode("id", false);

					expectNotification("error");
				});
			});
		});
	});
});
