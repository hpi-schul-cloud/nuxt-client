import * as serverApi from "@/serverApi/v3/api";
import {
	ImportUserResponseRoleNamesEnum,
	UserMatchResponseMatchedByEnum,
	UserMatchResponseRoleNamesEnum,
} from "@/serverApi/v3/api";
import ImportUsersModule, { MatchedBy } from "@/store/import-users";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { axiosErrorFactory } from "@@/tests/test-utils";
import { BusinessError } from "./types/commons";

const mockResponse = {
	data: {
		data: [{ mockKey: "mock value" }],
		total: 3,
		skip: 0,
		limit: 10,
	},
};

describe("import-users store actions", () => {
	let importUserModule: ImportUsersModule;
	let spy: jest.SpyInstance;
	let mockApi: any;

	beforeAll(() => {
		spy = jest.spyOn(serverApi, "UserImportApiFactory");
	});

	beforeEach(() => {
		spy.mockReset();
		importUserModule = new ImportUsersModule({});
	});
	describe("actions", () => {
		describe("fetchAllUsers", () => {
			it("should request a list of unmatched users", async () => {
				mockApi = {
					importUserControllerFindAllUnmatchedUsers: jest.fn(
						() => mockResponse
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				await importUserModule.fetchAllUsers();
				expect(importUserModule.getUserList.data).toStrictEqual([
					{
						mockKey: "mock value",
					},
				]);
				expect(importUserModule.getUserList.total).toEqual(3);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledWith(undefined, 0, 1);
			});

			it("should request list of unmatched users with filter", async () => {
				mockApi = {
					importUserControllerFindAllUnmatchedUsers: jest.fn(
						() => mockResponse
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				importUserModule.setUserSearch("john");
				await importUserModule.fetchAllUsers();
				expect(importUserModule.getUserList.data).toStrictEqual([
					{
						mockKey: "mock value",
					},
				]);
				expect(importUserModule.getUserList.total).toEqual(3);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledWith("john", 0, 1);
			});

			it("should request list of unmatched users with pagination", async () => {
				mockApi = {
					importUserControllerFindAllUnmatchedUsers: jest.fn(
						() => mockResponse
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				importUserModule.setUsersSkip(10);
				importUserModule.setUsersLimit(5);
				await importUserModule.fetchAllUsers();
				expect(importUserModule.getUserList.data).toStrictEqual([
					{
						mockKey: "mock value",
					},
				]);
				expect(importUserModule.getUserList.total).toEqual(3);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledWith(undefined, 10, 5);
			});

			it("should handle business errors", async () => {
				const error = { statusCode: "500", message: "foo" };
				const mockApi = {
					importUserControllerFindAllUnmatchedUsers: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchAllUsers();

				expect(importUserModule.getBusinessError).toStrictEqual(error);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("fetchTotalUnmatched", () => {
			it("should request list a unmatched users", async () => {
				mockApi = {
					importUserControllerFindAllUnmatchedUsers: jest.fn(
						() => mockResponse
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				await importUserModule.fetchTotalUnmatched();
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledWith(undefined, 0, 1);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
				expect(importUserModule.getTotalUnmatched).toEqual(3);
			});

			it("should handle buness error", async () => {
				const error = { statusCode: "500", message: "foo" };
				const mockApi = {
					importUserControllerFindAllUnmatchedUsers: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchTotalUnmatched();

				expect(importUserModule.getBusinessError).toStrictEqual(error);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("fetchAllImportUsers", () => {
			it("should request a list of import users", async () => {
				mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchAllImportUsers();

				expect(importUserModule.getImportUserList.data).toStrictEqual([
					{
						mockKey: "mock value",
					},
				]);
				expect(importUserModule.getImportUserList.total).toEqual(3);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledWith(
					undefined,
					undefined,
					undefined,
					[MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None],
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					0,
					25
				);
			});

			it("featch importusers with filters", async () => {
				mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				importUserModule.setFirstName("john");
				importUserModule.setLastName("doe");
				importUserModule.setLoginName("johnny");
				importUserModule.setMatch([
					MatchedBy.Admin,
					MatchedBy.Auto,
					MatchedBy.None,
				]);
				importUserModule.setFlagged(true);
				importUserModule.setClasses("5a");
				importUserModule.setRole(ImportUserResponseRoleNamesEnum.Student);
				await importUserModule.fetchAllImportUsers();

				expect(importUserModule.getImportUserList.data).toStrictEqual([
					{
						mockKey: "mock value",
					},
				]);
				expect(importUserModule.getImportUserList.total).toEqual(3);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledWith(
					"john",
					"doe",
					"johnny",
					[MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None],
					true,
					"5a",
					"student",
					undefined,
					undefined,
					0,
					25
				);
			});

			it("featch importusers with sorting by firstName", async () => {
				mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				importUserModule.setSortBy("firstName");
				await importUserModule.fetchAllImportUsers();

				expect(importUserModule.getImportUserList.data).toStrictEqual([
					{
						mockKey: "mock value",
					},
				]);
				expect(importUserModule.getImportUserList.total).toEqual(3);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledWith(
					undefined,
					undefined,
					undefined,
					[MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None],
					undefined,
					undefined,
					undefined,
					"asc",
					"firstName",
					0,
					25
				);
			});

			it("featch importusers with sorting by lastName desc", async () => {
				mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				importUserModule.setSortBy("lastName");
				importUserModule.setSortOrder("desc");
				await importUserModule.fetchAllImportUsers();

				expect(importUserModule.getImportUserList.data).toStrictEqual([
					{
						mockKey: "mock value",
					},
				]);
				expect(importUserModule.getImportUserList.total).toEqual(3);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledWith(
					undefined,
					undefined,
					undefined,
					[MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None],
					undefined,
					undefined,
					undefined,
					"desc",
					"lastName",
					0,
					25
				);
			});

			it("featch importusers with pagination", async () => {
				mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				importUserModule.setSkip(7);
				importUserModule.setLimit(11);
				await importUserModule.fetchAllImportUsers();

				expect(importUserModule.getImportUserList.data).toStrictEqual([
					{
						mockKey: "mock value",
					},
				]);
				expect(importUserModule.getImportUserList.total).toEqual(3);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledWith(
					undefined,
					undefined,
					undefined,
					[MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None],
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					7,
					11
				);
			});

			it("should handle buness error", async () => {
				const error = { statusCode: "500", message: "foo" };
				const mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchAllImportUsers();

				expect(importUserModule.getBusinessError).toStrictEqual(error);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("fetchTotal", () => {
			it("should request import users which are matched", async () => {
				mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchTotal();

				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledWith(
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					0,
					1
				);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
				expect(importUserModule.getTotal).toEqual(3);
			});

			it("should handle buness error", async () => {
				const error = { statusCode: "500", message: "foo" };
				const mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchTotal();

				expect(importUserModule.getBusinessError).toStrictEqual(error);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("fetchTotalMatched", () => {
			it("should request import users which are matched", async () => {
				mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchTotalMatched();

				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledWith(
					undefined,
					undefined,
					undefined,
					["admin", "auto"],
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					0,
					1
				);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
				expect(importUserModule.getTotalMatched).toEqual(3);
			});

			it("should handle buness error", async () => {
				const error = { statusCode: "500", message: "foo" };
				const mockApi = {
					importUserControllerFindAllImportUsers: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchTotalMatched();

				expect(importUserModule.getBusinessError).toStrictEqual(error);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("deleteMatch", () => {
			it("should call removeMatch and return new importUser record without match", async () => {
				mockApi = {
					importUserControllerRemoveMatch: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				await importUserModule.deleteMatch(importUserId);

				expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledWith(
					importUserId
				);
				expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledTimes(
					1
				);
			});

			it("should handle buness error", async () => {
				const error = { statusCode: "500", message: "foo" };
				const mockApi = {
					importUserControllerRemoveMatch: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				await importUserModule.deleteMatch(importUserId);

				expect(importUserModule.getBusinessError).toStrictEqual(error);
				expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledTimes(
					1
				);
			});
		});

		describe("saveMatch", () => {
			it("should call SetMatch with payload and return importUser record with match", async () => {
				mockApi = {
					importUserControllerSetMatch: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				const userId = "abc";
				await importUserModule.saveMatch({ importUserId, userId });

				expect(mockApi.importUserControllerSetMatch).toHaveBeenCalledWith(
					importUserId,
					{ userId }
				);
				expect(mockApi.importUserControllerSetMatch).toHaveBeenCalledTimes(1);
			});
			it("should handle error", async () => {
				const error = { statusCode: "500", message: "foo" };
				const mockApi = {
					importUserControllerSetMatch: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				const userId = "abc";
				await importUserModule.saveMatch({ importUserId, userId });

				expect(importUserModule.getBusinessError).toStrictEqual(error);
				expect(mockApi.importUserControllerSetMatch).toHaveBeenCalledTimes(1);
			});
		});

		describe("saveFlag", function () {
			it("should  call UpdateFlag with flag=true and return importUser with flag=true", async () => {
				mockApi = {
					importUserControllerUpdateFlag: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				await importUserModule.saveFlag({ importUserId, flagged: true });

				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledWith(
					importUserId,
					{ flagged: true }
				);
				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(1);
			});
			it("should call UpdateFlag with flag=false and return importUser with flag=false", async () => {
				mockApi = {
					importUserControllerUpdateFlag: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				await importUserModule.saveFlag({ importUserId, flagged: false });

				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledWith(
					importUserId,
					{ flagged: false }
				);
				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(1);
			});

			it("should update the state", async () => {
				mockApi = {
					importUserControllerUpdateFlag: jest.fn(() => mockResponse),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				importUserModule.setImportUsersList({
					limit: 2,
					skip: 0,
					total: 2,
					data: [
						{
							firstName: "asdf",
							lastName: "asdf",
							classNames: [],
							flagged: true,
							importUserId: "abc",
							loginName: "asdf.asdf",
							roleNames: [],
						},
						{
							firstName: "qwer",
							lastName: "qwer",
							classNames: [],
							flagged: true,
							importUserId: "qwer",
							loginName: "qwer.qwer",
							roleNames: [],
						},
					],
				});

				const importUserId = "abc";
				await importUserModule.saveFlag({ importUserId, flagged: false });

				let changedUser = importUserModule.getImportUserList.data.find(
					(importUser) => {
						return importUser.importUserId === importUserId;
					}
				);
				expect(changedUser?.flagged).toBe(false);
				await importUserModule.saveFlag({ importUserId, flagged: true });
				changedUser = importUserModule.getImportUserList.data.find(
					(importUser) => {
						return importUser.importUserId === importUserId;
					}
				);
				expect(changedUser?.flagged).toBe(true);
			});

			it("should handle business error", async () => {
				const error = { statusCode: "500", message: "foo" };
				const mockApi = {
					importUserControllerUpdateFlag: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				await importUserModule.saveFlag({ importUserId, flagged: false });

				expect(importUserModule.getBusinessError).toStrictEqual(error);
				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(1);
			});
		});

		describe("populateImportUsersFromExternalSystem", () => {
			describe("when fetching the data", () => {
				const setup = () => {
					mockApi = {
						importUserControllerPopulateImportUsers: jest.fn(),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);
				};

				it("should call the api", async () => {
					setup();

					await importUserModule.populateImportUsersFromExternalSystem();

					expect(
						mockApi.importUserControllerPopulateImportUsers
					).toHaveBeenCalledWith(false);
				});
			});

			describe("when fetching the data with preferred name matching", () => {
				const setup = () => {
					mockApi = {
						importUserControllerPopulateImportUsers: jest.fn(),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);
				};

				it("should call the api", async () => {
					setup();

					await importUserModule.populateImportUsersFromExternalSystem(true);

					expect(
						mockApi.importUserControllerPopulateImportUsers
					).toHaveBeenCalledWith(true);
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);
					mockApi = {
						importUserControllerPopulateImportUsers: jest.fn(() =>
							Promise.reject(error)
						),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);

					return {
						error,
						apiError,
					};
				};

				it("should set a business error", async () => {
					const { apiError } = setup();

					await importUserModule.populateImportUsersFromExternalSystem();

					expect(importUserModule.getBusinessError).toEqual<BusinessError>({
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("cancelMigration", () => {
			describe("when action is called", () => {
				const setup = () => {
					mockApi = {
						importUserControllerCancelMigration: jest.fn(),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);
				};

				it("should call the api", async () => {
					setup();

					await importUserModule.cancelMigration();

					expect(
						mockApi.importUserControllerCancelMigration
					).toHaveBeenCalledWith();
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);
					mockApi = {
						importUserControllerCancelMigration: jest.fn(() =>
							Promise.reject(error)
						),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);

					return {
						error,
						apiError,
					};
				};

				it("should set a business error", async () => {
					const { apiError } = setup();

					await importUserModule.cancelMigration();

					expect(importUserModule.getBusinessError).toEqual<BusinessError>({
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});

		describe("clearAllAutoMatches", () => {
			describe("when action is called", () => {
				const setup = () => {
					mockApi = {
						importUserControllerClearAllAutoMatches: jest.fn(),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);
				};

				it("should call the api", async () => {
					setup();

					await importUserModule.clearAllAutoMatches();

					expect(
						mockApi.importUserControllerClearAllAutoMatches
					).toHaveBeenCalled();
				});
			});

			describe("when an error occurs", () => {
				const setup = () => {
					const error = axiosErrorFactory.build();
					const apiError = mapAxiosErrorToResponseError(error);
					mockApi = {
						importUserControllerClearAllAutoMatches: jest.fn(() =>
							Promise.reject(error)
						),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);

					return {
						error,
						apiError,
					};
				};

				it("should set a business error", async () => {
					const { apiError } = setup();

					await importUserModule.clearAllAutoMatches();

					expect(importUserModule.getBusinessError).toEqual<BusinessError>({
						statusCode: apiError.code,
						message: apiError.message,
					});
				});
			});
		});
	});

	describe("mutations", () => {
		const testData = {
			total: 2,
			skip: 0,
			limit: 2,
			data: [
				{
					classNames: [],
					firstName: "Samuel",
					lastName: "Vimes",
					flagged: false,
					importUserId: "extern.1234",
					loginName: "samuel.vimes",
					roleNames: [ImportUserResponseRoleNamesEnum.Teacher],
					match: {
						firstName: "Samuel",
						lastName: "Vimes",
						loginName: "samuel.vimes@test.org",
						roleNames: [UserMatchResponseRoleNamesEnum.Teacher],
						userId: "1234",
						matchedBy: UserMatchResponseMatchedByEnum.Auto,
					},
				},
				{
					classNames: [],
					firstName: "Nobby",
					lastName: "Nobbes",
					flagged: false,
					importUserId: "extern.5678",
					loginName: "samuel.vimes",
					roleNames: [ImportUserResponseRoleNamesEnum.Teacher],
					match: {
						firstName: "Samuel",
						lastName: "Vimes",
						loginName: "samuel.vimes@test.org",
						roleNames: [UserMatchResponseRoleNamesEnum.Teacher],
						userId: "5678",
						matchedBy: UserMatchResponseMatchedByEnum.Auto,
					},
				},
			],
		};

		beforeEach(() => {
			importUserModule.setImportUsersList(testData);
		});

		describe("deleteMatchMutation", () => {
			it("should delete match and return new reference", () => {
				const expected = {
					...importUserModule.getImportUserList.data[0],
				};
				delete expected.match;
				const oldImportUserList = importUserModule.getImportUserList;

				importUserModule.deleteMatchMutation("extern.1234");

				expect(importUserModule.getImportUserList.data[0]).toEqual(expected);
				expect(importUserModule.getImportUserList.data[1]).toEqual(
					oldImportUserList.data[1]
				);
				expect(oldImportUserList == importUserModule.getImportUserList).toBe(
					false
				);
			});

			it("should not do anything if user ID does not exist", () => {
				const expected = {
					...importUserModule.getImportUserList.data[0],
				};
				delete expected.match;
				const oldList = importUserModule.getImportUserList;

				importUserModule.deleteMatchMutation("extern.asdf");

				expect(oldList == importUserModule.getImportUserList).toBe(true);
			});
		});
		describe("setUserFlagged", () => {
			it("should not do anything if user ID does not exist", () => {
				const expected = {
					...importUserModule.getImportUserList.data[0],
					flagged: true,
				};
				const oldImportUserList = importUserModule.getImportUserList;

				importUserModule.setUserFlagged({
					importUserId: "extern.1234",
					flagged: true,
				});

				expect(importUserModule.getImportUserList.data[0]).toEqual(expected);
				expect(importUserModule.getImportUserList.data[1]).toEqual(
					oldImportUserList.data[1]
				);
				expect(oldImportUserList == importUserModule.getImportUserList).toBe(
					false
				);
				importUserModule.setUserFlagged({
					importUserId: "extern.1234",
					flagged: false,
				});
				expect(importUserModule.getImportUserList.data[0].flagged).toBe(false);
			});

			it("should not do anything if user ID does not exist", () => {
				const oldList = importUserModule.getImportUserList;

				importUserModule.setUserFlagged({
					importUserId: "extern.asdf",
					flagged: true,
				});

				expect(oldList == importUserModule.getImportUserList).toBe(true);
			});
		});
	});
});

describe("getters", () => {
	it("getUserSearch", () => {
		const importUserModule = new ImportUsersModule({});
		expect(importUserModule.getUserSearch).toBe("");
		const userSearch = "foo";
		importUserModule.setUserSearch(userSearch);
		expect(importUserModule.getUserSearch).toBe(userSearch);
	});
});
