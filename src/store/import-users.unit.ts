import * as serverApi from "@/serverApi/v3/api";
import {
	ImportUserResponseRoleNamesEnum,
	UserMatchResponseMatchedByEnum,
	UserMatchResponseRoleNamesEnum,
} from "@/serverApi/v3/api";
import ImportUsersModule, { MatchedBy } from "@/store/import-users";
import { BusinessError } from "./types/commons";
import {
	axiosErrorFactory,
	apiResponseErrorFactory,
	businessErrorFactory,
} from "@@/tests/test-utils";

const mockResponse = {
	data: {
		data: [{ mockKey: "mock value" }],
		total: 3,
		skip: 0,
		limit: 10,
	},
};

const userListTestData = {
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

const badRequestError = axiosErrorFactory.build({
	response: {
		data: apiResponseErrorFactory.build({
			message: "BAD_REQUEST",
			code: 400,
		}),
	},
});

const businessError = businessErrorFactory.build({
	error: {
		code: 400,
		type: "ApiResponseError",
		title: "ApiResponseError # 1",
		message: "BAD_REQUEST",
	},
	message: "BAD_REQUEST",
	statusCode: 400,
});

describe("import-users store actions", () => {
	const setup = () => {
		const importUserModule = new ImportUsersModule({});
		const spy = vi.spyOn(serverApi, "UserImportApiFactory");

		const mockApi = {
			importUserControllerFindAllUnmatchedUsers: vi.fn(() => mockResponse),
			importUserControllerFindAllImportUsers: vi.fn(() => mockResponse),
			importUserControllerRemoveMatch: vi.fn(() => mockResponse),
			importUserControllerSetMatch: vi.fn(() => mockResponse),
			importUserControllerUpdateFlag: vi.fn(() => mockResponse),
			importUserControllerPopulateImportUsers: vi.fn(),
			importUserControllerCancelMigration: vi.fn(),
			importUserControllerClearAllAutoMatches: vi.fn(),
		};

		importUserModule.setImportUsersList(userListTestData);

		spy.mockReturnValue(mockApi as unknown as serverApi.UserImportApiInterface);

		return { importUserModule, spy, mockApi };
	};

	describe("actions", () => {
		describe("fetchAllUsers", () => {
			it("should request a list of unmatched users", async () => {
				const { importUserModule, mockApi } = setup();
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
				const { importUserModule, mockApi } = setup();

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
				const { importUserModule, mockApi } = setup();

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
				const { importUserModule, spy } = setup();

				const mockApi = {
					importUserControllerFindAllUnmatchedUsers: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchAllUsers();

				expect(importUserModule.getBusinessError).toStrictEqual(businessError);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("fetchTotalUnmatched", () => {
			it("should request list a unmatched users", async () => {
				const { importUserModule, mockApi } = setup();

				await importUserModule.fetchTotalUnmatched();

				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledWith(undefined, 0, 1);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
				expect(importUserModule.getTotalUnmatched).toEqual(3);
			});

			it("should handle business error", async () => {
				const { importUserModule, spy } = setup();
				const mockApi = {
					importUserControllerFindAllUnmatchedUsers: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchTotalUnmatched();

				expect(importUserModule.getBusinessError).toStrictEqual(businessError);
				expect(
					mockApi.importUserControllerFindAllUnmatchedUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("fetchAllImportUsers", () => {
			it("should request a list of import users", async () => {
				const { importUserModule, mockApi } = setup();

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

			it("fetch importusers with filters", async () => {
				const { importUserModule, mockApi } = setup();

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

			it("fetch importusers with sorting by firstName", async () => {
				const { importUserModule, mockApi } = setup();

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

			it("fetch importusers with sorting by lastName desc", async () => {
				const { importUserModule, mockApi } = setup();

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

			it("fetch importusers with pagination", async () => {
				const { importUserModule, mockApi } = setup();

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

			it("should handle business error", async () => {
				const { importUserModule, spy } = setup();
				const mockApi = {
					importUserControllerFindAllImportUsers: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchAllImportUsers();

				expect(importUserModule.getBusinessError).toStrictEqual(businessError);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("fetchTotal", () => {
			it("should request import users which are matched", async () => {
				const { importUserModule, mockApi } = setup();

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

			it("should handle business error", async () => {
				const { importUserModule, spy } = setup();
				const mockApi = {
					importUserControllerFindAllImportUsers: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchTotal();

				expect(importUserModule.getBusinessError).toStrictEqual(businessError);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("fetchTotalMatched", () => {
			it("should request import users which are matched", async () => {
				const { importUserModule, mockApi } = setup();

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

			it("should handle business error", async () => {
				const { importUserModule, spy } = setup();
				const mockApi = {
					importUserControllerFindAllImportUsers: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				await importUserModule.fetchTotalMatched();

				expect(importUserModule.getBusinessError).toStrictEqual(businessError);
				expect(
					mockApi.importUserControllerFindAllImportUsers
				).toHaveBeenCalledTimes(1);
			});
		});

		describe("deleteMatch", () => {
			it("should call removeMatch and return new importUser record without match", async () => {
				const { importUserModule, mockApi } = setup();

				const importUserId = "abc";
				await importUserModule.deleteMatch(importUserId);

				expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledWith(
					importUserId
				);
				expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledTimes(
					1
				);
			});

			it("should handle business error", async () => {
				const { importUserModule, spy } = setup();
				const mockApi = {
					importUserControllerRemoveMatch: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				await importUserModule.deleteMatch(importUserId);

				expect(importUserModule.getBusinessError).toStrictEqual(businessError);
				expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledTimes(
					1
				);
			});
		});

		describe("saveMatch", () => {
			it("should call SetMatch with payload and return importUser record with match", async () => {
				const { importUserModule, mockApi } = setup();

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
				const { importUserModule, spy } = setup();
				const mockApi = {
					importUserControllerSetMatch: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				const userId = "abc";
				await importUserModule.saveMatch({ importUserId, userId });

				expect(importUserModule.getBusinessError).toStrictEqual(businessError);
				expect(mockApi.importUserControllerSetMatch).toHaveBeenCalledTimes(1);
			});
		});

		describe("saveFlag", () => {
			it("should  call UpdateFlag with flag=true and return importUser with flag=true", async () => {
				const { importUserModule, mockApi } = setup();

				const importUserId = "abc";
				await importUserModule.saveFlag({ importUserId, flagged: true });

				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledWith(
					importUserId,
					{ flagged: true }
				);
				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(1);
			});

			it("should call UpdateFlag with flag=false and return importUser with flag=false", async () => {
				const { importUserModule, mockApi } = setup();

				const importUserId = "abc";
				await importUserModule.saveFlag({ importUserId, flagged: false });

				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledWith(
					importUserId,
					{ flagged: false }
				);
				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(1);
			});

			it("should update the state", async () => {
				const { importUserModule, spy, mockApi } = setup();
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
				const { importUserModule, spy } = setup();
				const mockApi = {
					importUserControllerUpdateFlag: vi.fn(() =>
						Promise.reject(badRequestError)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);

				const importUserId = "abc";
				await importUserModule.saveFlag({ importUserId, flagged: false });

				expect(importUserModule.getBusinessError).toStrictEqual(businessError);
				expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(1);
			});
		});

		describe("populateImportUsersFromExternalSystem", () => {
			describe("when fetching the data", () => {
				it("should call the api", async () => {
					const { importUserModule, mockApi } = setup();

					await importUserModule.populateImportUsersFromExternalSystem();

					expect(
						mockApi.importUserControllerPopulateImportUsers
					).toHaveBeenCalledWith(false);
				});
			});

			describe("when fetching the data with preferred name matching", () => {
				it("should call the api", async () => {
					const { importUserModule, mockApi } = setup();

					await importUserModule.populateImportUsersFromExternalSystem(true);

					expect(
						mockApi.importUserControllerPopulateImportUsers
					).toHaveBeenCalledWith(true);
				});
			});

			describe("when an error occurs", () => {
				it("should set a business error", async () => {
					const { importUserModule, spy } = setup();
					const mockApi = {
						importUserControllerPopulateImportUsers: vi.fn(() =>
							Promise.reject(badRequestError)
						),
					};
					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);

					await importUserModule.populateImportUsersFromExternalSystem();

					expect(importUserModule.getBusinessError).toEqual<BusinessError>(
						businessError
					);
				});
			});
		});

		describe("cancelMigration", () => {
			describe("when action is called", () => {
				it("should call the api", async () => {
					const { importUserModule, mockApi } = setup();

					await importUserModule.cancelMigration();

					expect(
						mockApi.importUserControllerCancelMigration
					).toHaveBeenCalledWith();
				});
			});

			describe("when an error occurs", () => {
				it("should set a business error", async () => {
					const { importUserModule, spy } = setup();
					const mockApi = {
						importUserControllerCancelMigration: vi.fn(() =>
							Promise.reject(badRequestError)
						),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);

					await importUserModule.cancelMigration();

					expect(importUserModule.getBusinessError).toEqual<BusinessError>(
						businessError
					);
				});
			});
		});

		describe("clearAllAutoMatches", () => {
			describe("when action is called", () => {
				it("should call the api", async () => {
					const { importUserModule, mockApi } = setup();

					await importUserModule.clearAllAutoMatches();

					expect(
						mockApi.importUserControllerClearAllAutoMatches
					).toHaveBeenCalled();
				});
			});

			describe("when an error occurs", () => {
				it("should set a business error", async () => {
					const { importUserModule, spy } = setup();

					const mockApi = {
						importUserControllerClearAllAutoMatches: vi.fn(() =>
							Promise.reject(badRequestError)
						),
					};

					spy.mockReturnValue(
						mockApi as unknown as serverApi.UserImportApiInterface
					);

					await importUserModule.clearAllAutoMatches();

					expect(importUserModule.getBusinessError).toEqual<BusinessError>(
						businessError
					);
				});
			});
		});
	});

	describe("mutations", () => {
		describe("deleteMatchMutation", () => {
			it("should delete match and return new reference", () => {
				const { importUserModule } = setup();
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
				const { importUserModule } = setup();
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
				const { importUserModule } = setup();
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
				const { importUserModule } = setup();
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
