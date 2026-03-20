import { useUserLoginMigration } from "./userLoginMigration.composable";
import { UserLoginMigrationMapper } from "@/store/user-login-migration";
import {
	axiosErrorFactory,
	createTestAppStore,
	mockApi,
	mockApiResponse,
	userLoginMigrationResponseFactory,
} from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import { UserLoginMigrationSearchListResponse } from "@api-server";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { HttpStatusCode } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("userLoginMigration.composable", () => {
	let userLoginMigrationApi: Mocked<serverApi.UserLoginMigrationApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		userLoginMigrationApi = mockApi<serverApi.UserLoginMigrationApiInterface>();
		vi.spyOn(serverApi, "UserLoginMigrationApiFactory").mockReturnValue(userLoginMigrationApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("initial state", () => {
		it("should have undefined userLoginMigration", () => {
			const { userLoginMigration } = useUserLoginMigration();

			expect(userLoginMigration.value).toBeUndefined();
		});

		it("should have isLoading as false", () => {
			const { isLoading } = useUserLoginMigration();

			expect(isLoading.value).toBe(false);
		});

		it("should have empty businessError", () => {
			const { businessError } = useUserLoginMigration();

			expect(businessError.value).toEqual({
				statusCode: "",
				message: "",
				error: undefined,
			});
		});
	});

	describe("resetBusinessError", () => {
		it("should reset businessError to initial state", () => {
			const { businessError, resetBusinessError } = useUserLoginMigration();

			businessError.value = {
				statusCode: "500",
				message: "Some error",
				error: { code: 500, message: "Some error", title: "Error" },
			};

			resetBusinessError();

			expect(businessError.value).toEqual({
				statusCode: "",
				message: "",
				error: undefined,
			});
		});
	});

	describe("fetchLatestUserLoginMigrationForCurrentUser", () => {
		describe("when user is available", () => {
			const setup = () => {
				const userId = "user-id";
				createTestAppStore({ me: { user: { id: userId } } });

				const migrationResponse = userLoginMigrationResponseFactory.build();
				const searchListResponse: UserLoginMigrationSearchListResponse = {
					data: [migrationResponse],
					total: 1,
					skip: 0,
					limit: 1,
				};

				userLoginMigrationApi.userLoginMigrationControllerGetMigrations.mockResolvedValue(
					mockApiResponse({ data: searchListResponse })
				);

				return { userId, migrationResponse };
			};

			it("should call the api with userId", async () => {
				const { userId } = setup();

				const { fetchLatestUserLoginMigrationForCurrentUser } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForCurrentUser();

				expect(userLoginMigrationApi.userLoginMigrationControllerGetMigrations).toHaveBeenCalledWith(userId);
			});

			it("should set userLoginMigration with mapped data", async () => {
				const { migrationResponse } = setup();

				const { fetchLatestUserLoginMigrationForCurrentUser, userLoginMigration } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForCurrentUser();

				const expectedMigration = UserLoginMigrationMapper.mapToUserLoginMigration(migrationResponse);
				expect(userLoginMigration.value).toEqual(expectedMigration);
			});

			it("should set isLoading to false after completion", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForCurrentUser, isLoading } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForCurrentUser();

				expect(isLoading.value).toBe(false);
			});
		});

		describe("when no migration exists", () => {
			const setup = () => {
				const userId = "user-id";
				createTestAppStore({ me: { user: { id: userId } } });

				const searchListResponse: UserLoginMigrationSearchListResponse = {
					data: [],
					total: 0,
					skip: 0,
					limit: 1,
				};

				userLoginMigrationApi.userLoginMigrationControllerGetMigrations.mockResolvedValue(
					mockApiResponse({ data: searchListResponse })
				);
			};

			it("should set userLoginMigration to undefined", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForCurrentUser, userLoginMigration } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForCurrentUser();

				expect(userLoginMigration.value).toBeUndefined();
			});
		});

		describe("when more than one migration is found", () => {
			const setup = () => {
				const userId = "user-id";
				createTestAppStore({ me: { user: { id: userId } } });

				const migrationResponse1 = userLoginMigrationResponseFactory.build();
				const migrationResponse2 = userLoginMigrationResponseFactory.build();
				const searchListResponse: UserLoginMigrationSearchListResponse = {
					data: [migrationResponse1, migrationResponse2],
					total: 2,
					skip: 0,
					limit: 2,
				};

				userLoginMigrationApi.userLoginMigrationControllerGetMigrations.mockResolvedValue(
					mockApiResponse({ data: searchListResponse })
				);
			};

			it("should set businessError", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForCurrentUser, businessError } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForCurrentUser();

				expect(businessError.value.error).toBeDefined();
			});

			it("should not set userLoginMigration", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForCurrentUser, userLoginMigration } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForCurrentUser();

				expect(userLoginMigration.value).toBeUndefined();
			});
		});

		describe("when api returns error", () => {
			const setup = () => {
				const userId = "user-id";
				createTestAppStore({ me: { user: { id: userId } } });

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.InternalServerError).build();
				userLoginMigrationApi.userLoginMigrationControllerGetMigrations.mockRejectedValue(axiosError);
			};

			it("should set businessError", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForCurrentUser, businessError } = useUserLoginMigration();

				await fetchLatestUserLoginMigrationForCurrentUser();

				expect(businessError.value.statusCode).toBe(HttpStatusCode.InternalServerError);
			});

			it("should call handleApplicationError", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForCurrentUser } = useUserLoginMigration();

				await fetchLatestUserLoginMigrationForCurrentUser();

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
			});
		});

		describe("when user is not available", () => {
			const setup = () => {
				createTestAppStore({ me: { user: { id: undefined } } });
			};

			it("should not call the api", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForCurrentUser } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForCurrentUser();

				expect(userLoginMigrationApi.userLoginMigrationControllerGetMigrations).not.toHaveBeenCalled();
			});
		});
	});

	describe("fetchLatestUserLoginMigrationForSchool", () => {
		describe("when school is available", () => {
			const setup = () => {
				const schoolId = "school-id";
				createTestAppStore({ me: { school: { id: schoolId } } });

				const migrationResponse = userLoginMigrationResponseFactory.build();

				userLoginMigrationApi.userLoginMigrationControllerFindUserLoginMigrationBySchool.mockResolvedValue(
					mockApiResponse({ data: migrationResponse })
				);

				return { schoolId, migrationResponse };
			};

			it("should call the api with schoolId", async () => {
				const { schoolId } = setup();

				const { fetchLatestUserLoginMigrationForSchool } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForSchool();

				expect(userLoginMigrationApi.userLoginMigrationControllerFindUserLoginMigrationBySchool).toHaveBeenCalledWith(
					schoolId
				);
			});

			it("should set userLoginMigration with mapped data", async () => {
				const { migrationResponse } = setup();

				const { fetchLatestUserLoginMigrationForSchool, userLoginMigration } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForSchool();

				const expectedMigration = UserLoginMigrationMapper.mapToUserLoginMigration(migrationResponse);
				expect(userLoginMigration.value).toEqual(expectedMigration);
			});
		});

		describe("when api returns 404", () => {
			const setup = () => {
				const schoolId = "school-id";
				createTestAppStore({ me: { school: { id: schoolId } } });

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.NotFound).build();
				userLoginMigrationApi.userLoginMigrationControllerFindUserLoginMigrationBySchool.mockRejectedValue(axiosError);
			};

			it("should set userLoginMigration to undefined", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForSchool, userLoginMigration } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForSchool();

				expect(userLoginMigration.value).toBeUndefined();
			});
		});

		describe("when api returns other error", () => {
			const setup = () => {
				const schoolId = "school-id";
				createTestAppStore({ me: { school: { id: schoolId } } });

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.InternalServerError).build();
				userLoginMigrationApi.userLoginMigrationControllerFindUserLoginMigrationBySchool.mockRejectedValue(axiosError);
			};

			it("should call handleApplicationError", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForSchool } = useUserLoginMigration();

				await fetchLatestUserLoginMigrationForSchool();

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
			});
		});

		describe("when school is not available", () => {
			const setup = () => {
				createTestAppStore({ me: { school: { id: undefined } } });
			};

			it("should not call the api", async () => {
				setup();

				const { fetchLatestUserLoginMigrationForSchool } = useUserLoginMigration();
				await fetchLatestUserLoginMigrationForSchool();

				expect(userLoginMigrationApi.userLoginMigrationControllerFindUserLoginMigrationBySchool).not.toHaveBeenCalled();
			});
		});
	});

	describe("startUserLoginMigration", () => {
		const setup = () => {
			createTestAppStore();

			const migrationResponse = userLoginMigrationResponseFactory.build();

			userLoginMigrationApi.userLoginMigrationControllerStartMigration.mockResolvedValue(
				mockApiResponse({ data: migrationResponse })
			);

			return { migrationResponse };
		};

		it("should call the api", async () => {
			setup();

			const { startUserLoginMigration } = useUserLoginMigration();
			await startUserLoginMigration();

			expect(userLoginMigrationApi.userLoginMigrationControllerStartMigration).toHaveBeenCalled();
		});

		it("should set userLoginMigration with mapped data", async () => {
			const { migrationResponse } = setup();

			const { startUserLoginMigration, userLoginMigration } = useUserLoginMigration();
			await startUserLoginMigration();

			const expectedMigration = UserLoginMigrationMapper.mapToUserLoginMigration(migrationResponse);
			expect(userLoginMigration.value).toEqual(expectedMigration);
		});

		describe("when api returns error", () => {
			const setupWithError = () => {
				createTestAppStore();

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.InternalServerError).build();
				userLoginMigrationApi.userLoginMigrationControllerStartMigration.mockRejectedValue(axiosError);
			};

			it("should call handleApplicationError", async () => {
				setupWithError();

				const { startUserLoginMigration } = useUserLoginMigration();

				await startUserLoginMigration();

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
			});
		});
	});

	describe("setUserLoginMigrationMandatory", () => {
		const setup = () => {
			createTestAppStore();

			const migrationResponse = userLoginMigrationResponseFactory.build({
				mandatorySince: "2024-01-01T00:00:00.000Z",
			});

			userLoginMigrationApi.userLoginMigrationControllerSetMigrationMandatory.mockResolvedValue(
				mockApiResponse({ data: migrationResponse })
			);

			return { migrationResponse };
		};

		it("should call the api with mandatory true", async () => {
			setup();

			const { setUserLoginMigrationMandatory } = useUserLoginMigration();
			await setUserLoginMigrationMandatory(true);

			expect(userLoginMigrationApi.userLoginMigrationControllerSetMigrationMandatory).toHaveBeenCalledWith({
				mandatory: true,
			});
		});

		it("should call the api with mandatory false", async () => {
			setup();

			const { setUserLoginMigrationMandatory } = useUserLoginMigration();
			await setUserLoginMigrationMandatory(false);

			expect(userLoginMigrationApi.userLoginMigrationControllerSetMigrationMandatory).toHaveBeenCalledWith({
				mandatory: false,
			});
		});

		it("should set userLoginMigration with mapped data", async () => {
			const { migrationResponse } = setup();

			const { setUserLoginMigrationMandatory, userLoginMigration } = useUserLoginMigration();
			await setUserLoginMigrationMandatory(true);

			const expectedMigration = UserLoginMigrationMapper.mapToUserLoginMigration(migrationResponse);
			expect(userLoginMigration.value).toEqual(expectedMigration);
		});

		describe("when api returns error", () => {
			const setupWithError = () => {
				createTestAppStore();

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.InternalServerError).build();
				userLoginMigrationApi.userLoginMigrationControllerSetMigrationMandatory.mockRejectedValue(axiosError);
			};

			it("should call handleApplicationError", async () => {
				setupWithError();

				const { setUserLoginMigrationMandatory } = useUserLoginMigration();

				await setUserLoginMigrationMandatory(true);

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
			});
		});
	});

	describe("restartUserLoginMigration", () => {
		const setup = () => {
			createTestAppStore();

			const migrationResponse = userLoginMigrationResponseFactory.build();

			userLoginMigrationApi.userLoginMigrationControllerRestartMigration.mockResolvedValue(
				mockApiResponse({ data: migrationResponse })
			);

			return { migrationResponse };
		};

		it("should call the api", async () => {
			setup();

			const { restartUserLoginMigration } = useUserLoginMigration();
			await restartUserLoginMigration();

			expect(userLoginMigrationApi.userLoginMigrationControllerRestartMigration).toHaveBeenCalled();
		});

		it("should set userLoginMigration with mapped data", async () => {
			const { migrationResponse } = setup();

			const { restartUserLoginMigration, userLoginMigration } = useUserLoginMigration();
			await restartUserLoginMigration();

			const expectedMigration = UserLoginMigrationMapper.mapToUserLoginMigration(migrationResponse);
			expect(userLoginMigration.value).toEqual(expectedMigration);
		});

		describe("when api returns error", () => {
			const setupWithError = () => {
				createTestAppStore();

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.InternalServerError).build();
				userLoginMigrationApi.userLoginMigrationControllerRestartMigration.mockRejectedValue(axiosError);
			};

			it("should call handleApplicationError", async () => {
				setupWithError();

				const { restartUserLoginMigration } = useUserLoginMigration();

				await restartUserLoginMigration();

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
			});
		});
	});

	describe("closeUserLoginMigration", () => {
		describe("when migration is closed successfully", () => {
			const setup = () => {
				createTestAppStore();

				const migrationResponse = userLoginMigrationResponseFactory.build({
					closedAt: "2024-02-01T00:00:00.000Z",
				});

				userLoginMigrationApi.userLoginMigrationControllerCloseMigration.mockResolvedValue(
					mockApiResponse({ data: migrationResponse })
				);

				return { migrationResponse };
			};

			it("should call the api", async () => {
				setup();

				const { closeUserLoginMigration } = useUserLoginMigration();
				await closeUserLoginMigration();

				expect(userLoginMigrationApi.userLoginMigrationControllerCloseMigration).toHaveBeenCalled();
			});

			it("should set userLoginMigration with mapped data", async () => {
				const { migrationResponse } = setup();

				const { closeUserLoginMigration, userLoginMigration } = useUserLoginMigration();
				await closeUserLoginMigration();

				const expectedMigration = UserLoginMigrationMapper.mapToUserLoginMigration(migrationResponse);
				expect(userLoginMigration.value).toEqual(expectedMigration);
			});
		});

		describe("when closedAt is not set", () => {
			const setup = () => {
				createTestAppStore();

				const migrationResponse = userLoginMigrationResponseFactory.build({
					closedAt: undefined,
				});

				userLoginMigrationApi.userLoginMigrationControllerCloseMigration.mockResolvedValue(
					mockApiResponse({ data: migrationResponse })
				);
			};

			it("should set userLoginMigration to undefined", async () => {
				setup();

				const { closeUserLoginMigration, userLoginMigration } = useUserLoginMigration();
				await closeUserLoginMigration();

				expect(userLoginMigration.value).toBeUndefined();
			});
		});

		describe("when api returns error", () => {
			const setupWithError = () => {
				createTestAppStore();

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.InternalServerError).build();
				userLoginMigrationApi.userLoginMigrationControllerCloseMigration.mockRejectedValue(axiosError);
			};

			it("should call handleApplicationError", async () => {
				setupWithError();

				const { closeUserLoginMigration } = useUserLoginMigration();

				await closeUserLoginMigration();

				expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
			});
		});
	});
});
