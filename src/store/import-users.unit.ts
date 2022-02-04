import { ImportUsers } from "@store/import-users";
import * as serverApi from "@/serverApi/v3/api";
import {ImportUserResponseRoleNamesEnum} from "@/serverApi/v3/api";

const mockResponse = {
	data: {
		data: [{ mockKey: "mock value" }],
		total: 3,
		skip: 0,
		limit: 10,
	},
};

describe("import-users store actions", () => {
	let importUsersStore: ImportUsers;
	let spy: any;
	let mockApi: any;

	beforeEach(() => {
		spy = jest.spyOn(serverApi, "UserImportApiFactory");

		importUsersStore = new ImportUsers({});
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
			await importUsersStore.fetchAllUsers();
			expect(importUsersStore.getUserList.data).toStrictEqual([
				{
					mockKey: "mock value",
				},
			]);
			expect(importUsersStore.getUserList.total).toEqual(3);
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
			importUsersStore.setUserSearch('john');
			await importUsersStore.fetchAllUsers();
			expect(importUsersStore.getUserList.data).toStrictEqual([
				{
					mockKey: "mock value",
				},
			]);
			expect(importUsersStore.getUserList.total).toEqual(3);
			expect(
				mockApi.importUserControllerFindAllUnmatchedUsers
			).toHaveBeenCalledTimes(1);
			expect(
				mockApi.importUserControllerFindAllUnmatchedUsers
			).toHaveBeenCalledWith('john', 0, 1);
		});

		it("should request list of unmatched users with pagination", async () => {
			mockApi = {
				importUserControllerFindAllUnmatchedUsers: jest.fn(() => mockResponse),
			};
			spy.mockReturnValue(
				mockApi as unknown as serverApi.UserImportApiInterface
			);
			importUsersStore.setUsersSkip(10);
			importUsersStore.setUsersLimit(5);
			await importUsersStore.fetchAllUsers();
			expect(importUsersStore.getUserList.data).toStrictEqual([
				{
					mockKey: "mock value",
				},
			]);
			expect(importUsersStore.getUserList.total).toEqual(3);
			expect(
				mockApi.importUserControllerFindAllUnmatchedUsers
			).toHaveBeenCalledTimes(1);
			expect(
				mockApi.importUserControllerFindAllUnmatchedUsers
			).toHaveBeenCalledWith(undefined, 10, 5);
		});

		it('should handle business errors', async () => {
			const error = { statusCode: "500", message: "foo" };
			const mockApi = {
				importUserControllerFindAllUnmatchedUsers: jest.fn(() => Promise.reject({ ...error })),
			};
			spy.mockReturnValue(
				mockApi as unknown as serverApi.UserImportApiInterface
			);

			await importUsersStore.fetchAllUsers();

			expect(importUsersStore.getBusinessError).toStrictEqual(error);
			expect(mockApi.importUserControllerFindAllUnmatchedUsers).toHaveBeenCalledTimes(1);
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
			await importUsersStore.fetchTotalUnmatched();
			expect(
				mockApi.importUserControllerFindAllUnmatchedUsers
			).toHaveBeenCalledWith(undefined, 0, 1);
			expect(
				mockApi.importUserControllerFindAllUnmatchedUsers
			).toHaveBeenCalledTimes(1);
			expect(importUsersStore.getTotalUnmatched).toEqual(3);
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

			await importUsersStore.fetchAllImportUsers();

			expect(importUsersStore.getImportUserList.data).toStrictEqual([
				{
					mockKey: "mock value",
				},
			]);
			expect(importUsersStore.getImportUserList.total).toEqual(3);
			expect(
				mockApi.importUserControllerFindAllImportUsers
			).toHaveBeenCalledTimes(1);
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

			importUsersStore.setFirstName('john');
			importUsersStore.setLastName('doe');
			importUsersStore.setLoginName('johnny');
			importUsersStore.setMatch(['admin', 'auto', 'none']);
			importUsersStore.setFlagged(true);
			importUsersStore.setClasses('5a');
			importUsersStore.setRole(ImportUserResponseRoleNamesEnum.Student);
			await importUsersStore.fetchAllImportUsers();

			expect(importUsersStore.getImportUserList.data).toStrictEqual([
				{
					mockKey: "mock value",
				},
			]);
			expect(importUsersStore.getImportUserList.total).toEqual(3);
			expect(
				mockApi.importUserControllerFindAllImportUsers
			).toHaveBeenCalledTimes(1);
			expect(
				mockApi.importUserControllerFindAllImportUsers
			).toHaveBeenCalledWith(
				'john',
				'doe',
				'johnny',
				["admin", "auto", "none"],
				true,
				'5a',
				'student',
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

			importUsersStore.setSortBy('firstName')
			await importUsersStore.fetchAllImportUsers();

			expect(importUsersStore.getImportUserList.data).toStrictEqual([
				{
					mockKey: "mock value",
				},
			]);
			expect(importUsersStore.getImportUserList.total).toEqual(3);
			expect(
				mockApi.importUserControllerFindAllImportUsers
			).toHaveBeenCalledTimes(1);
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
				'asc',
				'firstName',
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

			importUsersStore.setSortBy('lastName');
			importUsersStore.setSortOrder('desc')
			await importUsersStore.fetchAllImportUsers();

			expect(importUsersStore.getImportUserList.data).toStrictEqual([
				{
					mockKey: "mock value",
				},
			]);
			expect(importUsersStore.getImportUserList.total).toEqual(3);
			expect(
				mockApi.importUserControllerFindAllImportUsers
			).toHaveBeenCalledTimes(1);
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
				'desc',
				'lastName',
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

			await importUsersStore.fetchAllImportUsers();

			expect(importUsersStore.getImportUserList.data).toStrictEqual([
				{
					mockKey: "mock value",
				},
			]);
			expect(importUsersStore.getImportUserList.total).toEqual(3);
			expect(
				mockApi.importUserControllerFindAllImportUsers
			).toHaveBeenCalledTimes(1);
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
				25
			);
		});

		it("should handle buness error", async() => {
			const error = { statusCode: "500", message: "foo" };
			const mockApi = {
				importUserControllerFindAllImportUsers: jest.fn(() => Promise.reject({ ...error })),
			};
			spy.mockReturnValue(
				mockApi as unknown as serverApi.UserImportApiInterface
			);

			await importUsersStore.fetchAllImportUsers();

			expect(importUsersStore.getBusinessError).toStrictEqual(error);
			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledTimes(1);
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

			await importUsersStore.fetchTotalMatched();

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
			expect(importUsersStore.getTotalMatched).toEqual(3);
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
			await importUsersStore.deleteMatch(importUserId);

			expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledWith(
				importUserId
			);
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
			await importUsersStore.saveMatch({ importUserId, userId });

			expect(mockApi.importUserControllerSetMatch).toHaveBeenCalledWith(
				importUserId, {userId}
			);
			expect(mockApi.importUserControllerSetMatch).toHaveBeenCalledTimes(
				1
			);
		});
		it("should handle error", async() => {
			const error = { statusCode: "500", message: "foo" };
			const mockApi = {
				importUserControllerSetMatch: jest.fn(() => Promise.reject({ ...error })),
			};
			spy.mockReturnValue(
				mockApi as unknown as serverApi.UserImportApiInterface
			);

			const importUserId = "abc";
			const userId = "abc";
			await importUsersStore.saveMatch({ importUserId, userId });

			expect(importUsersStore.getBusinessError).toStrictEqual(error);
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
			await importUsersStore.saveFlag({ importUserId, flagged: true });

			expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledWith(
				importUserId, { flagged: true }
			);
			expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(
				1
			);
		});
		it("should call UpdateFlag with flag=false and return importUser with flag=false", async () => {
			mockApi = {
				importUserControllerUpdateFlag: jest.fn(() => mockResponse),
			};
			spy.mockReturnValue(
				mockApi as unknown as serverApi.UserImportApiInterface
			);

			const importUserId = "abc";
			await importUsersStore.saveFlag({ importUserId, flagged: false });

			expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledWith(
				importUserId, { flagged: false }
			);
			expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(
				1
			);
		});

		it("should handle buness error", async() => {
			const error = { statusCode: "500", message: "foo" };
			const mockApi = {
				importUserControllerUpdateFlag: jest.fn(() => Promise.reject({ ...error })),
			};
			spy.mockReturnValue(
				mockApi as unknown as serverApi.UserImportApiInterface
			);

			const importUserId = "abc";
			await importUsersStore.saveFlag({ importUserId, flagged: false });

			expect(importUsersStore.getBusinessError).toStrictEqual(error);
			expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledTimes(1);
		});
	});
});
