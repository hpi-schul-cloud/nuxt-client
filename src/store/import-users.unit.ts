import ImportUsersModule, { MatchedBy } from "@/store/import-users";
import * as serverApi from "@/serverApi/v3/api";
import { ImportUserResponseRoleNamesEnum } from "@/serverApi/v3/api";

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
	let spy: any;
	let mockApi: any;

	beforeEach(() => {
		spy = jest.spyOn(serverApi, "UserImportApiFactory");

		importUserModule = new ImportUsersModule({});
	});

	afterEach((done) => {
		done();
		spy.mockRestore();
	});

	describe("fetchAllUsers", () => {
		it("should request a list of unmatched users", async () => {
			mockApi = {
				importUserControllerFindAllUnmatchedUsers: jest.fn(() => mockResponse),
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
				importUserControllerFindAllUnmatchedUsers: jest.fn(() => mockResponse),
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
				importUserControllerFindAllUnmatchedUsers: jest.fn(() => mockResponse),
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
				importUserControllerFindAllUnmatchedUsers: jest.fn(() => mockResponse),
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
			expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledTimes(1);
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
			expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledTimes(1);
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
		it("should  call UpdateFlag with flag=true and reurn importUser with flag=true", async () => {
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

		it("should handle buness error", async () => {
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
