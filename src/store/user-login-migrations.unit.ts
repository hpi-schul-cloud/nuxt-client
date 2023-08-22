import * as serverApi from "@/serverApi/v3/api";
import {
	UserLoginMigrationApiInterface,
	UserLoginMigrationResponse,
	UserLoginMigrationSearchListResponse,
} from "@/serverApi/v3/api";
import {
	MigrationLinkRequest,
	MigrationLinks,
	MigrationPageOrigin,
	UserLoginMigration,
} from "./user-login-migration";
import UserLoginMigrationModule from "./user-login-migrations";
import { mockApiResponse, mockUser } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import { authModule } from "@/store/store-accessor";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { HttpStatusCode } from "./types/http-status-code.enum";

describe("UserLoginMigrationModule", () => {
	let module: UserLoginMigrationModule;

	let apiMock: DeepMocked<UserLoginMigrationApiInterface>;

	beforeEach(() => {
		module = new UserLoginMigrationModule({});

		apiMock = createMock<UserLoginMigrationApiInterface>();

		jest
			.spyOn(serverApi, "UserLoginMigrationApiFactory")
			.mockReturnValue(apiMock);

		setupStores({
			authModule: AuthModule,
		});
	});

	afterEach(() => {
		jest.resetAllMocks();
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

		describe("MigrationLinks", () => {
			it("should return the default state", () => {
				const migrationLinks: MigrationLinks = module.getMigrationLinks;

				expect(migrationLinks).toEqual<MigrationLinks>({
					proceedLink: "",
					cancelLink: "",
				});
			});

			it("should return the changed state", () => {
				const migrationLinks: MigrationLinks = {
					proceedLink: "proceedLink",
					cancelLink: "cancelLink",
				};

				module.setMigrationLinks(migrationLinks);

				expect(module.getMigrationLinks).toEqual(migrationLinks);
			});
		});

		describe("Error", () => {
			it("should return the default state", () => {
				const error: object | null = module.getError;

				expect(error).toEqual(null);
			});

			it("should return the changed state", () => {
				const error: object | null = new Error();

				module.setError(error);

				expect(module.getError).toEqual(error);
			});
		});

		describe("getUserLoginMigration", () => {
			it("should return the default state", () => {
				const userLoginMigration = module.getUserLoginMigration;

				expect(userLoginMigration).toEqual<UserLoginMigration>({
					sourceSystemId: undefined,
					targetSystemId: "",
					startedAt: "",
					closedAt: undefined,
					finishedAt: undefined,
					mandatorySince: undefined,
				});
			});

			it("should return the changed state", () => {
				const userLoginMigration = {
					sourceSystemId: "sourceSystemId",
					targetSystemId: "targetSystemId",
					startedAt: "startedAt",
					closedAt: "closedAt",
					finishedAt: "finishedAt",
					mandatorySince: "mandatorySince",
				};

				module.setUserLoginMigration(userLoginMigration);

				expect(module.getUserLoginMigration).toEqual(userLoginMigration);
			});
		});
	});

	describe("actions", () => {
		describe("fetchMigrationLinks", () => {
			const setup = () => {
				const migrationLinkRequest: MigrationLinkRequest = {
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM,
					targetSystem: "targetSystemId",
					sourceSystem: "sourceSystemId",
				};

				const response = {
					proceedButtonUrl: "proceedLink",
					cancelButtonUrl: "cancelLink",
				};

				const mockApi = {
					userMigrationControllerGetMigrationPageDetails: jest
						.fn()
						.mockResolvedValue({
							data: response,
						}),
				};

				jest
					.spyOn(serverApi, "UserMigrationApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.UserMigrationApiInterface
					);

				return {
					apiMock: mockApi,
					migrationLinkRequest,
					response,
				};
			};

			it("should call the userMigrationApi.userMigrationControllerGetMigrationPageDetails", async () => {
				const { apiMock, migrationLinkRequest } = setup();

				await module.fetchMigrationLinks(migrationLinkRequest);

				expect(
					apiMock.userMigrationControllerGetMigrationPageDetails
				).toHaveBeenCalledWith(
					MigrationPageOrigin.START_FROM_SOURCE_SYSTEM,
					"sourceSystemId",
					"targetSystemId"
				);
			});

			it("should set the MigrationLinks", async () => {
				const { migrationLinkRequest, response } = setup();

				await module.fetchMigrationLinks(migrationLinkRequest);

				expect(module.getMigrationLinks).toEqual<MigrationLinks>({
					proceedLink: response.proceedButtonUrl,
					cancelLink: response.cancelButtonUrl,
				});
			});

			it("should set an error", async () => {
				const { apiMock, migrationLinkRequest } = setup();
				const error: Error = new Error();
				apiMock.userMigrationControllerGetMigrationPageDetails.mockRejectedValue(
					error
				);

				await module.fetchMigrationLinks(migrationLinkRequest);

				expect(module.getError).toEqual(error);
			});
		});

		describe("getLatestUserLoginMigrationForCurrentUser", () => {
			describe("when user id is not available", () => {
				const setup = () => {
					authModule.setUser({ ...mockUser, id: "" });
				};

				it("should not call the userMigrationApi.userMigrationControllerGetLatestUserLoginMigrationForCurrentUser", async () => {
					setup();

					await module.fetchLatestUserLoginMigrationForCurrentUser();

					expect(
						apiMock.userLoginMigrationControllerGetMigrations
					).not.toHaveBeenCalled();
				});
			});

			describe("when user is available", () => {
				const setup = () => {
					authModule.setUser({ ...mockUser, id: "userId" });

					const migrationResponse: UserLoginMigrationResponse = {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: "startedAt",
						closedAt: "closedAt",
						finishedAt: "finishedAt",
						mandatorySince: "mandatorySince",
					};

					const listResponse: UserLoginMigrationSearchListResponse = {
						data: [migrationResponse],
						total: 1,
						skip: 0,
						limit: 1,
					};

					apiMock.userLoginMigrationControllerGetMigrations.mockResolvedValue(
						mockApiResponse({ data: listResponse })
					);

					return {
						migrationResponse,
						listResponse,
					};
				};

				it("should call the userMigrationApi.userMigrationControllerGetLatestUserLoginMigrationForCurrentUser", async () => {
					setup();

					await module.fetchLatestUserLoginMigrationForCurrentUser();

					expect(
						apiMock.userLoginMigrationControllerGetMigrations
					).toHaveBeenCalled();
				});

				it("should set the UserLoginMigration", async () => {
					const { migrationResponse } = setup();

					await module.fetchLatestUserLoginMigrationForCurrentUser();

					expect(module.getUserLoginMigration).toEqual<UserLoginMigration>({
						sourceSystemId: migrationResponse.sourceSystemId,
						targetSystemId: migrationResponse.targetSystemId,
						startedAt: migrationResponse.startedAt,
						closedAt: migrationResponse.closedAt,
						finishedAt: migrationResponse.finishedAt,
						mandatorySince: migrationResponse.mandatorySince,
					});
				});
			});

			describe("when the api throws an error", () => {
				const setup = () => {
					authModule.setUser({ ...mockUser, id: "userId" });

					apiMock.userLoginMigrationControllerGetMigrations.mockRejectedValue(
						new Error()
					);
				};

				it("should throw an error", async () => {
					setup();

					const func = () =>
						module.fetchLatestUserLoginMigrationForCurrentUser();

					await expect(func()).rejects.toEqual(
						createApplicationError(HttpStatusCode.InternalServerError)
					);
				});
			});

			describe("when there are more than one migration for a user", () => {
				const setup = () => {
					authModule.setUser({ ...mockUser, id: "userId" });

					const migrationResponse: UserLoginMigrationResponse = {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: "startedAt",
						closedAt: "closedAt",
						finishedAt: "finishedAt",
						mandatorySince: "mandatorySince",
					};

					const listResponse: UserLoginMigrationSearchListResponse = {
						data: [migrationResponse, migrationResponse],
						total: 2,
						skip: 0,
						limit: 2,
					};

					apiMock.userLoginMigrationControllerGetMigrations.mockResolvedValue(
						mockApiResponse({ data: listResponse })
					);

					return {
						migrationResponse,
						listResponse,
					};
				};

				it("should throw an error", async () => {
					setup();

					const func = () =>
						module.fetchLatestUserLoginMigrationForCurrentUser();

					await expect(func()).rejects.toEqual(
						createApplicationError(HttpStatusCode.BadRequest)
					);
				});
			});
		});
	});
});
