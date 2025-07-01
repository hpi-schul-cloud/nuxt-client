import * as serverApi from "@/serverApi/v3/api";
import {
	UserLoginMigrationApiInterface,
	UserLoginMigrationResponse,
	UserLoginMigrationSearchListResponse,
} from "@/serverApi/v3/api";
import AuthModule from "@/store/auth";
import { authModule } from "@/store/store-accessor";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
	businessErrorFactory,
	meResponseFactory,
	mockApiResponse,
	userLoginMigrationFactory,
	userLoginMigrationResponseFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { BusinessError } from "./types/commons";
import { HttpStatusCode } from "./types/http-status-code.enum";
import { UserLoginMigration } from "./user-login-migration";
import UserLoginMigrationModule from "./user-login-migrations";

describe("UserLoginMigrationModule", () => {
	let module: UserLoginMigrationModule;

	let apiMock: DeepMocked<UserLoginMigrationApiInterface>;

	beforeEach(() => {
		module = new UserLoginMigrationModule({});

		apiMock = createMock<UserLoginMigrationApiInterface>();

		vi.spyOn(serverApi, "UserLoginMigrationApiFactory").mockReturnValue(
			apiMock
		);

		setupStores({
			authModule: AuthModule,
		});
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("getter/setter", () => {
		describe("Loading", () => {
			it("should return the default state", () => {
				const loading: boolean = module.getLoading;

				expect(loading).toEqual(false);
			});

			it("should return the changed state", () => {
				module.setLoading(true);

				expect(module.getLoading).toEqual(true);
			});
		});

		describe("getBusinessError", () => {
			describe("when the store has no error", () => {
				it("should return the default state", () => {
					const businessError: BusinessError = module.getBusinessError;

					expect(businessError).toEqual<BusinessError>({
						statusCode: "",
						message: "",
						error: undefined,
					});
				});
			});

			describe("when an error was set", () => {
				const setup = () => {
					const businessError = businessErrorFactory.build({
						message: "error message",
					});

					module.setBusinessError(businessError);

					return {
						businessError,
					};
				};

				it("should return the error", () => {
					const { businessError } = setup();

					const error: BusinessError = module.getBusinessError;

					expect(error).toEqual(businessError);
				});
			});
		});

		describe("getUserLoginMigration", () => {
			it("should return the default state", () => {
				const userLoginMigration = module.getUserLoginMigration;

				expect(userLoginMigration).toEqual(undefined);
			});

			it("should return the changed state", () => {
				const userLoginMigration: UserLoginMigration = {
					sourceSystemId: "sourceSystemId",
					targetSystemId: "targetSystemId",
					startedAt: new Date(2000, 1, 1, 0, 0),
					closedAt: new Date(2000, 1, 1),
					finishedAt: new Date(2000, 1, 14),
					mandatorySince: new Date(2000, 1, 1),
				};

				module.setUserLoginMigration(userLoginMigration);

				expect(module.getUserLoginMigration).toEqual(userLoginMigration);
			});
		});
	});

	describe("actions", () => {
		describe("getLatestUserLoginMigrationForCurrentUser", () => {
			describe("when user id is not available", () => {
				const setup = () => {
					const mockMe = meResponseFactory.build({ user: { id: undefined } });
					authModule.setMe(mockMe);
				};

				it("should not get latest user login migration ", async () => {
					setup();

					await module.fetchLatestUserLoginMigrationForCurrentUser();

					expect(
						apiMock.userLoginMigrationControllerGetMigrations
					).not.toHaveBeenCalled();
				});
			});

			describe("when user is available", () => {
				describe("when there is no migration for a user", () => {
					const setup = () => {
						const mockMe = meResponseFactory.build({ user: { id: "userId" } });
						authModule.setMe(mockMe);

						const listResponse: UserLoginMigrationSearchListResponse = {
							data: [],
							total: 0,
							skip: 0,
							limit: 1,
						};

						apiMock.userLoginMigrationControllerGetMigrations.mockResolvedValue(
							mockApiResponse({ data: listResponse })
						);

						vi.spyOn(module, "setUserLoginMigration");
					};

					it("should not set the user login migration", async () => {
						setup();

						await module.fetchLatestUserLoginMigrationForCurrentUser();

						expect(module.setUserLoginMigration).not.toHaveBeenCalled();
					});
				});

				describe("when there are more than one migration for a user", () => {
					const setup = () => {
						const mockMe = meResponseFactory.build({ user: { id: "userId" } });
						authModule.setMe(mockMe);

						const axiosError = axiosErrorFactory
							.withStatusCode(HttpStatusCode.BadRequest)
							.build();

						apiMock.userLoginMigrationControllerGetMigrations.mockRejectedValueOnce(
							axiosError
						);

						vi.spyOn(module, "setUserLoginMigration");
					};

					it("should not set user login migration", async () => {
						setup();

						await expect(
							module.fetchLatestUserLoginMigrationForCurrentUser()
						).rejects.toThrow();

						expect(module.setUserLoginMigration).not.toHaveBeenCalled();
					});

					it("should throw an error", async () => {
						setup();

						const func = () =>
							module.fetchLatestUserLoginMigrationForCurrentUser();

						await expect(func()).rejects.toEqual(
							createApplicationError(HttpStatusCode.BadRequest)
						);
					});
				});

				describe("when there is one migration for a user", () => {
					const setup = () => {
						const mockMe = meResponseFactory.build({ user: { id: "userId" } });
						authModule.setMe(mockMe);

						const userLoginMigrationResponse: UserLoginMigrationResponse =
							userLoginMigrationResponseFactory.build({
								sourceSystemId: "sourceSystemId",
								targetSystemId: "targetSystemId",
								startedAt: new Date(2000, 1, 1, 0, 0).toString(),
								closedAt: new Date(2000, 1, 1, 0, 0).toString(),
								finishedAt: new Date(2000, 1, 14, 0, 0).toString(),
								mandatorySince: new Date(2000, 1, 1, 0, 0).toString(),
							});

						const userLoginMigration: UserLoginMigration = {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2000, 1, 1, 0, 0),
							closedAt: new Date(2000, 1, 1, 0, 0),
							finishedAt: new Date(2000, 1, 14, 0, 0),
							mandatorySince: new Date(2000, 1, 1, 0, 0),
						};

						const listResponse: UserLoginMigrationSearchListResponse = {
							data: [userLoginMigrationResponse],
							total: 1,
							skip: 0,
							limit: 1,
						};

						apiMock.userLoginMigrationControllerGetMigrations.mockResolvedValue(
							mockApiResponse({ data: listResponse })
						);

						return {
							userLoginMigration,
							listResponse,
						};
					};

					it("should get latest user login migrations", async () => {
						setup();

						await module.fetchLatestUserLoginMigrationForCurrentUser();

						expect(
							apiMock.userLoginMigrationControllerGetMigrations
						).toHaveBeenCalled();
					});

					it("should set the UserLoginMigration", async () => {
						const { userLoginMigration } = setup();

						await module.fetchLatestUserLoginMigrationForCurrentUser();

						expect(module.getUserLoginMigration).toEqual(userLoginMigration);
					});
				});
			});

			describe("when the api throws an error", () => {
				const setup = () => {
					const mockMe = meResponseFactory.build({ user: { id: "userId" } });
					authModule.setMe(mockMe);

					const error = axiosErrorFactory
						.withStatusCode(HttpStatusCode.BadRequest)
						.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.userLoginMigrationControllerGetMigrations.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await expect(
						module.fetchLatestUserLoginMigrationForCurrentUser()
					).rejects.toThrow();

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});

				it("should throw application error", async () => {
					setup();

					const func = () =>
						module.fetchLatestUserLoginMigrationForCurrentUser();

					await expect(func()).rejects.toEqual(
						createApplicationError(HttpStatusCode.BadRequest)
					);
				});
			});

			describe("when the api returns a bad request", () => {
				const setup = () => {
					const mockMe = meResponseFactory.build({ user: { id: "userId" } });
					authModule.setMe(mockMe);

					const axiosError = axiosErrorFactory
						.withStatusCode(HttpStatusCode.BadRequest)
						.build();

					apiMock.userLoginMigrationControllerGetMigrations.mockRejectedValueOnce(
						axiosError
					);
				};

				it("should throw an error with status code BadRequest when an ApplicationError is thrown", async () => {
					setup();

					const func = () =>
						module.fetchLatestUserLoginMigrationForCurrentUser();

					await expect(func()).rejects.toEqual(
						createApplicationError(HttpStatusCode.BadRequest)
					);
				});
			});
		});

		describe("getLatestUserLoginMigrationForSchool", () => {
			describe("when school id is not available", () => {
				const setup = () => {
					const mockMe = meResponseFactory.build({
						school: { id: undefined },
					});
					authModule.setMe(mockMe);
				};

				it("should not get latest user login migrations", async () => {
					setup();

					await module.fetchLatestUserLoginMigrationForSchool();

					expect(
						apiMock.userLoginMigrationControllerFindUserLoginMigrationBySchool
					).not.toHaveBeenCalled();
				});
			});

			describe("when school is available", () => {
				describe("when there is no migration for a school", () => {
					const setup = () => {
						const mockMe = meResponseFactory.build();
						authModule.setMe(mockMe);

						const error = axiosErrorFactory.build({
							response: {
								data: apiResponseErrorFactory.build({
									code: HttpStatusCode.NotFound,
								}),
							},
						});

						apiMock.userLoginMigrationControllerFindUserLoginMigrationBySchool.mockRejectedValue(
							error
						);
					};

					it("should set the user login migration to undefined", async () => {
						setup();

						await module.fetchLatestUserLoginMigrationForSchool();

						expect(module.getUserLoginMigration).toBeUndefined();
					});
				});

				describe("when there is a migration for the school", () => {
					const setup = () => {
						const mockMe = meResponseFactory.build();
						authModule.setMe(mockMe);

						const userLoginMigrationResponse: UserLoginMigrationResponse =
							userLoginMigrationResponseFactory.build({
								sourceSystemId: "sourceSystemId",
								targetSystemId: "targetSystemId",
								startedAt: new Date(2000, 1, 1, 0, 0).toString(),
								closedAt: new Date(2000, 1, 1, 0, 0).toString(),
								finishedAt: new Date(2000, 1, 14, 0, 0).toString(),
								mandatorySince: new Date(2000, 1, 1, 0, 0).toString(),
							});

						const userLoginMigration: UserLoginMigration = {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2000, 1, 1, 0, 0),
							closedAt: new Date(2000, 1, 1, 0, 0),
							finishedAt: new Date(2000, 1, 14, 0, 0),
							mandatorySince: new Date(2000, 1, 1, 0, 0),
						};

						apiMock.userLoginMigrationControllerFindUserLoginMigrationBySchool.mockResolvedValue(
							mockApiResponse({ data: userLoginMigrationResponse })
						);

						return {
							userLoginMigration,
							userLoginMigrationResponse,
						};
					};

					it("should get latest user login migrations", async () => {
						setup();

						await module.fetchLatestUserLoginMigrationForSchool();

						expect(
							apiMock.userLoginMigrationControllerFindUserLoginMigrationBySchool
						).toHaveBeenCalled();
					});

					it("should set the UserLoginMigration", async () => {
						const { userLoginMigration } = setup();

						await module.fetchLatestUserLoginMigrationForSchool();

						expect(module.getUserLoginMigration).toEqual(userLoginMigration);
					});
				});
			});

			describe("when the api throws an error", () => {
				const setup = () => {
					const mockMe = meResponseFactory.build();
					authModule.setMe(mockMe);

					const error = axiosErrorFactory
						.withStatusCode(HttpStatusCode.BadRequest)
						.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.userLoginMigrationControllerFindUserLoginMigrationBySchool.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await expect(
						module.fetchLatestUserLoginMigrationForSchool()
					).rejects.toThrow();

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});

				it("should throw application error", async () => {
					setup();

					const func = () => module.fetchLatestUserLoginMigrationForSchool();

					await expect(func()).rejects.toEqual(
						createApplicationError(HttpStatusCode.BadRequest)
					);
				});
			});
		});

		describe("startUserLoginMigration", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const userLoginMigrationResponse: UserLoginMigrationResponse =
						userLoginMigrationResponseFactory.build({});
					apiMock.userLoginMigrationControllerStartMigration.mockResolvedValue(
						mockApiResponse({ data: userLoginMigrationResponse })
					);
					vi.spyOn(module, "setLoading");

					const userLoginMigration = userLoginMigrationFactory.build({
						startedAt: new Date(2000, 1, 1, 0, 0),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: undefined,
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
					});

					return {
						userLoginMigration,
					};
				};

				it("should call api to start migration", async () => {
					setup();

					await module.startUserLoginMigration();

					expect(
						apiMock.userLoginMigrationControllerStartMigration
					).toHaveBeenCalled();
				});

				it("should set loading", async () => {
					setup();

					await module.startUserLoginMigration();

					expect(module.setLoading).toHaveBeenNthCalledWith(1, true);
					expect(module.setLoading).toHaveBeenNthCalledWith(2, false);
				});

				it("should set user login migration", async () => {
					const { userLoginMigration } = setup();

					await module.startUserLoginMigration();

					expect(module.getUserLoginMigration).toStrictEqual(
						userLoginMigration
					);
					expect(module.getUserLoginMigration).toEqual(userLoginMigration);
				});
			});

			describe("when the api throws an error", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.userLoginMigrationControllerStartMigration.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await expect(module.startUserLoginMigration()).rejects.toThrow();

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});

				it("should throw application error", async () => {
					const { apiError } = setup();

					const func = () => module.startUserLoginMigration();

					await expect(func()).rejects.toEqual(
						createApplicationError(apiError.code)
					);
				});
			});
		});

		describe("setUserLoginMigrationMandatory", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const userLoginMigrationResponse: UserLoginMigrationResponse =
						userLoginMigrationResponseFactory.build({
							startedAt: new Date(2000, 1, 1, 0, 0).toString(),
							mandatorySince: new Date(2000, 1, 1).toString(),
						});

					const userLoginMigration = userLoginMigrationFactory.build({
						startedAt: new Date(2000, 1, 1, 0, 0),
						mandatorySince: new Date(2000, 1, 1),
					});
					apiMock.userLoginMigrationControllerSetMigrationMandatory.mockResolvedValue(
						mockApiResponse({ data: userLoginMigrationResponse })
					);
					vi.spyOn(module, "setLoading");

					return {
						userLoginMigration,
					};
				};

				it("should call api to set the migration mandatory", async () => {
					setup();

					await module.setUserLoginMigrationMandatory(true);

					expect(
						apiMock.userLoginMigrationControllerSetMigrationMandatory
					).toHaveBeenCalledWith({ mandatory: true });
				});

				it("should set loading", async () => {
					setup();

					await module.setUserLoginMigrationMandatory(false);

					expect(module.setLoading).toHaveBeenCalledWith(true);
					expect(module.setLoading).toHaveBeenCalledWith(false);
				});

				it("should set user login migration", async () => {
					const { userLoginMigration } = setup();

					await module.setUserLoginMigrationMandatory(false);

					expect(module.getUserLoginMigration).toEqual(userLoginMigration);
				});
			});

			describe("when the api throws an error", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.userLoginMigrationControllerSetMigrationMandatory.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await expect(
						module.setUserLoginMigrationMandatory(true)
					).rejects.toThrow();

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});

				it("should throw application error", async () => {
					const { apiError } = setup();

					const func = () => module.setUserLoginMigrationMandatory(false);

					await expect(func()).rejects.toEqual(
						createApplicationError(apiError.code)
					);
				});
			});
		});

		describe("restartUserLoginMigration", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const userLoginMigrationResponse: UserLoginMigrationResponse =
						userLoginMigrationResponseFactory.build({
							startedAt: new Date(2000, 1, 1, 0, 0).toString(),
						});

					const userLoginMigration = userLoginMigrationFactory.build({
						startedAt: new Date(2000, 1, 1, 0, 0),
					});

					apiMock.userLoginMigrationControllerRestartMigration.mockResolvedValue(
						mockApiResponse({ data: userLoginMigrationResponse })
					);
					vi.spyOn(module, "setLoading");

					return {
						userLoginMigration,
					};
				};

				it("should call api to restart migration", async () => {
					setup();

					await module.restartUserLoginMigration();

					expect(
						apiMock.userLoginMigrationControllerRestartMigration
					).toHaveBeenCalled();
				});

				it("should set loading", async () => {
					setup();

					await module.restartUserLoginMigration();

					expect(module.setLoading).toHaveBeenCalledWith(true);
					expect(module.setLoading).toHaveBeenCalledWith(false);
				});

				it("should set user login migration", async () => {
					const { userLoginMigration } = setup();

					await module.restartUserLoginMigration();

					expect(module.getUserLoginMigration).toEqual(userLoginMigration);
				});
			});

			describe("when the api throws an error", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.userLoginMigrationControllerRestartMigration.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await expect(module.restartUserLoginMigration()).rejects.toThrow();

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});

				it("should throw application error", async () => {
					const { apiError } = setup();

					const func = () => module.restartUserLoginMigration();

					await expect(func()).rejects.toEqual(
						createApplicationError(apiError.code)
					);
				});
			});
		});

		describe("closeUserLoginMigration", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const userLoginMigrationResponse: UserLoginMigrationResponse =
						userLoginMigrationResponseFactory.build({
							closedAt: new Date(2000, 1, 2).toString(),
							finishedAt: new Date(2000, 1, 14).toString(),
						});

					const userLoginMigration = userLoginMigrationFactory.build({
						closedAt: new Date(2000, 1, 2),
						finishedAt: new Date(2000, 1, 14),
					});

					apiMock.userLoginMigrationControllerCloseMigration.mockResolvedValue(
						mockApiResponse({ data: userLoginMigrationResponse })
					);
					vi.spyOn(module, "setLoading");

					return {
						userLoginMigration,
					};
				};

				it("should call api to close the migration", async () => {
					setup();

					await module.closeUserLoginMigration();

					expect(
						apiMock.userLoginMigrationControllerCloseMigration
					).toHaveBeenCalled();
				});

				it("should set loading", async () => {
					setup();

					await module.closeUserLoginMigration();

					expect(module.setLoading).toHaveBeenCalledWith(true);
					expect(module.setLoading).toHaveBeenCalledWith(false);
				});

				it("should set user login migration", async () => {
					const { userLoginMigration } = setup();

					await module.closeUserLoginMigration();

					expect(module.getUserLoginMigration).toEqual(userLoginMigration);
				});
			});

			describe("when the api throws an error", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);

					apiMock.userLoginMigrationControllerCloseMigration.mockRejectedValue(
						error
					);

					return {
						apiError,
					};
				};

				it("should set the businessError", async () => {
					const { apiError } = setup();

					await expect(module.closeUserLoginMigration()).rejects.toThrow();

					expect(module.getBusinessError).toEqual<BusinessError>({
						error: apiError,
						statusCode: apiError.code,
						message: apiError.message,
					});
				});

				it("should throw application error", async () => {
					const { apiError } = setup();

					const func = () => module.closeUserLoginMigration();

					await expect(func()).rejects.toEqual(
						createApplicationError(apiError.code)
					);
				});
			});
		});
	});
});
