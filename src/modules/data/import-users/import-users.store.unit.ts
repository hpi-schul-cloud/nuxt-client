import { MatchedBy, useImportUsersStore } from "./import-users.store";
import { initializeAxios } from "@/utils/api";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
	businessErrorFactory,
	mockAxiosInstance,
} from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import {
	ImportUserListResponse,
	ImportUserResponseRoleNames,
	UserMatchResponseMatchedBy,
	UserMatchResponseRoleNames,
} from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

const mockListResponse = {
	data: {
		data: [{ mockKey: "mock value" }],
		total: 3,
		skip: 0,
		limit: 10,
	},
};

const userListTestData: ImportUserListResponse = {
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
			roleNames: [ImportUserResponseRoleNames.TEACHER],
			match: {
				firstName: "Samuel",
				lastName: "Vimes",
				loginName: "samuel.vimes@test.org",
				roleNames: [UserMatchResponseRoleNames.TEACHER],
				userId: "1234",
				matchedBy: UserMatchResponseMatchedBy.AUTO,
			},
		},
		{
			classNames: [],
			firstName: "Nobby",
			lastName: "Nobbes",
			flagged: false,
			importUserId: "extern.5678",
			loginName: "nobby.nobbes",
			roleNames: [ImportUserResponseRoleNames.STUDENT],
			match: undefined,
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

const expectedBusinessError = businessErrorFactory.build({
	error: {
		code: 400,
		type: "ApiResponseError",
		title: "ApiResponseError # 1",
		message: "BAD_REQUEST",
	},
	message: "BAD_REQUEST",
	statusCode: 400,
});

describe("useImportUsersStore", () => {
	let axiosMock: Mocked<AxiosInstance>;

	const defaultMockApi = () => ({
		importUserControllerFindAllUnmatchedUsers: vi.fn(() => Promise.resolve(mockListResponse)),
		importUserControllerFindAllImportUsers: vi.fn(() => Promise.resolve(mockListResponse)),
		importUserControllerRemoveMatch: vi.fn(() => Promise.resolve(mockListResponse)),
		importUserControllerSetMatch: vi.fn(() => Promise.resolve(mockListResponse)),
		importUserControllerUpdateFlag: vi.fn(() => Promise.resolve(mockListResponse)),
		importUserControllerPopulateImportUsers: vi.fn(() => Promise.resolve()),
		importUserControllerCancelMigration: vi.fn(() => Promise.resolve()),
		importUserControllerClearAllAutoMatches: vi.fn(() => Promise.resolve()),
		importUserControllerSaveAllUsersMatches: vi.fn(() => Promise.resolve()),
	});

	const setup = (apiOverrides?: Partial<ReturnType<typeof defaultMockApi>>) => {
		const spy = vi.spyOn(serverApi, "UserImportApiFactory");
		const mockApi = { ...defaultMockApi(), ...apiOverrides };

		spy.mockReturnValue(mockApi as unknown as serverApi.UserImportApiInterface);

		const store = useImportUsersStore();

		return { store, spy, mockApi };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("initial state", () => {
		it("should have default filter values", () => {
			const { store } = setup();
			expect(store.filter.firstName).toBe("");
			expect(store.filter.lastName).toBe("");
			expect(store.filter.loginName).toBe("");
			expect(store.filter.role).toBe("");
			expect(store.filter.classes).toBe("");
			expect(store.filter.match).toEqual([MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None]);
			expect(store.filter.flagged).toBe(false);
			expect(store.filter.limit).toBe(25);
			expect(store.filter.skip).toBe(0);
			expect(store.filter.sortBy).toBe("");
			expect(store.filter.sortOrder).toBe("asc");
		});

		it("should have empty importUsersData", () => {
			const { store } = setup();
			expect(store.importUsersData.list.data).toEqual([]);
			expect(store.importUsersData.total).toBe(0);
			expect(store.importUsersData.totalMatched).toBe(0);
			expect(store.importUsersData.totalUnmatched).toBe(0);
		});

		it("should have empty userSearch", () => {
			const { store } = setup();
			expect(store.userSearch.query).toBe("");
			expect(store.userSearch.limit).toBe(1);
			expect(store.userSearch.skip).toBe(0);
			expect(store.userSearch.list.data).toEqual([]);
		});

		it("should have null businessError", () => {
			const { store } = setup();
			expect(store.businessError).toBeNull();
		});
	});

	describe("fetchAllUsers", () => {
		it("should call the api with default params and update userSearch.list", async () => {
			const { store, mockApi } = setup();
			await store.fetchAllUsers();

			expect(mockApi.importUserControllerFindAllUnmatchedUsers).toHaveBeenCalledWith(undefined, 0, 1);
			expect(mockApi.importUserControllerFindAllUnmatchedUsers).toHaveBeenCalledTimes(1);
			expect(store.userSearch.list.data).toStrictEqual([{ mockKey: "mock value" }]);
			expect(store.userSearch.list.total).toBe(3);
		});

		it("should pass query when set", async () => {
			const { store, mockApi } = setup();
			store.userSearch.query = "john";
			await store.fetchAllUsers();

			expect(mockApi.importUserControllerFindAllUnmatchedUsers).toHaveBeenCalledWith("john", 0, 1);
		});

		it("should pass skip and limit when set", async () => {
			const { store, mockApi } = setup();
			store.userSearch.skip = 10;
			store.userSearch.limit = 5;
			await store.fetchAllUsers();

			expect(mockApi.importUserControllerFindAllUnmatchedUsers).toHaveBeenCalledWith(undefined, 10, 5);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerFindAllUnmatchedUsers: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.fetchAllUsers();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("fetchAllImportUsers", () => {
		it("should call api with default filter params and update importUsersData.list", async () => {
			const { store, mockApi } = setup();
			await store.fetchAllImportUsers();

			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledWith(
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
			expect(store.importUsersData.list.data).toStrictEqual([{ mockKey: "mock value" }]);
		});

		it("should pass filter values when set", async () => {
			const { store, mockApi } = setup();
			store.filter.firstName = "John";
			store.filter.lastName = "Doe";
			store.filter.loginName = "johnny";
			store.filter.match = [MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None];
			store.filter.flagged = true;
			store.filter.classes = "5a";
			store.filter.role = ImportUserResponseRoleNames.STUDENT;
			await store.fetchAllImportUsers();

			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledWith(
				"John",
				"Doe",
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

		it("should pass sortBy firstName with sortOrder", async () => {
			const { store, mockApi } = setup();
			store.filter.sortBy = "firstName";
			store.filter.sortOrder = "asc";
			await store.fetchAllImportUsers();

			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledWith(
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

		it("should pass sortBy lastName desc", async () => {
			const { store, mockApi } = setup();
			store.filter.sortBy = "lastName";
			store.filter.sortOrder = "desc";
			await store.fetchAllImportUsers();

			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledWith(
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

		it("should not send sortBy or sortOrder params when sortBy is empty string", async () => {
			const { store, mockApi } = setup();
			store.filter.sortBy = "";
			await store.fetchAllImportUsers();

			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledWith(
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

		it("should pass skip and limit from filter", async () => {
			const { store, mockApi } = setup();
			store.filter.skip = 7;
			store.filter.limit = 11;
			await store.fetchAllImportUsers();

			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledWith(
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

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerFindAllImportUsers: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.fetchAllImportUsers();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("fetchTotal", () => {
		it("should call api with skip=0, limit=1 and update importUsersData.total", async () => {
			const { store, mockApi } = setup();
			await store.fetchTotal();

			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledWith(
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
			expect(store.importUsersData.total).toBe(3);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerFindAllImportUsers: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.fetchTotal();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("fetchTotalMatched", () => {
		it("should call api with match=[admin, auto] and update importUsersData.totalMatched", async () => {
			const { store, mockApi } = setup();
			await store.fetchTotalMatched();

			expect(mockApi.importUserControllerFindAllImportUsers).toHaveBeenCalledWith(
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
			expect(store.importUsersData.totalMatched).toBe(3);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerFindAllImportUsers: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.fetchTotalMatched();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("fetchTotalUnmatched", () => {
		it("should call api and update importUsersData.totalUnmatched", async () => {
			const { store, mockApi } = setup();
			await store.fetchTotalUnmatched();

			expect(mockApi.importUserControllerFindAllUnmatchedUsers).toHaveBeenCalledWith(undefined, 0, 1);
			expect(store.importUsersData.totalUnmatched).toBe(3);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerFindAllUnmatchedUsers: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.fetchTotalUnmatched();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("saveMatch", () => {
		it("should call SetMatch with payload and return the response", async () => {
			const { store, mockApi } = setup();
			await store.saveMatch({ importUserId: "abc", userId: "xyz" });

			expect(mockApi.importUserControllerSetMatch).toHaveBeenCalledWith("abc", { userId: "xyz" });
			expect(mockApi.importUserControllerSetMatch).toHaveBeenCalledTimes(1);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerSetMatch: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.saveMatch({ importUserId: "abc", userId: "xyz" });

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("deleteMatch", () => {
		it("should call RemoveMatch and clear match on the local list entry", async () => {
			const { store, mockApi } = setup();
			store.importUsersData.list = { ...userListTestData };

			await store.deleteMatch("extern.1234");

			expect(mockApi.importUserControllerRemoveMatch).toHaveBeenCalledWith("extern.1234");
			const updatedUser = store.importUsersData.list.data.find((u) => u.importUserId === "extern.1234");
			expect(updatedUser?.match).toBeUndefined();
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerRemoveMatch: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.deleteMatch("abc");

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("saveFlag", () => {
		it("should call UpdateFlag with flagged=true", async () => {
			const { store, mockApi } = setup();
			await store.saveFlag({ importUserId: "abc", flagged: true });

			expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledWith("abc", { flagged: true });
		});

		it("should call UpdateFlag with flagged=false", async () => {
			const { store, mockApi } = setup();
			await store.saveFlag({ importUserId: "abc", flagged: false });

			expect(mockApi.importUserControllerUpdateFlag).toHaveBeenCalledWith("abc", { flagged: false });
		});

		it("should optimistically update the flagged state and keep it on success", async () => {
			const { store } = setup();
			store.importUsersData.list = {
				...userListTestData,
				data: [
					{
						firstName: "Test",
						lastName: "User",
						classNames: [],
						flagged: false,
						importUserId: "abc",
						loginName: "test.user",
						roleNames: [],
					},
				],
				total: 1,
				skip: 0,
				limit: 1,
			};

			await store.saveFlag({ importUserId: "abc", flagged: true });

			const user = store.importUsersData.list.data.find((u) => u.importUserId === "abc");
			expect(user?.flagged).toBe(true);
		});

		it("should revert optimistic update on failure", async () => {
			const { store } = setup({
				importUserControllerUpdateFlag: vi.fn(() => Promise.reject(badRequestError)),
			});
			store.importUsersData.list = {
				...userListTestData,
				data: [
					{
						firstName: "Test",
						lastName: "User",
						classNames: [],
						flagged: false,
						importUserId: "abc",
						loginName: "test.user",
						roleNames: [],
					},
				],
				total: 1,
				skip: 0,
				limit: 1,
			};

			await store.saveFlag({ importUserId: "abc", flagged: true });

			const user = store.importUsersData.list.data.find((u) => u.importUserId === "abc");
			expect(user?.flagged).toBe(false);
			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("performMigration", () => {
		it("should call SaveAllUsersMatches", async () => {
			const { store, mockApi } = setup();
			await store.performMigration();

			expect(mockApi.importUserControllerSaveAllUsersMatches).toHaveBeenCalledTimes(1);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerSaveAllUsersMatches: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.performMigration();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("populateImportUsersFromExternalSystem", () => {
		it("should call api with matchByPreferredName=false by default", async () => {
			const { store, mockApi } = setup();
			await store.populateImportUsersFromExternalSystem();

			expect(mockApi.importUserControllerPopulateImportUsers).toHaveBeenCalledWith(false);
		});

		it("should call api with matchByPreferredName=true when passed", async () => {
			const { store, mockApi } = setup();
			await store.populateImportUsersFromExternalSystem(true);

			expect(mockApi.importUserControllerPopulateImportUsers).toHaveBeenCalledWith(true);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerPopulateImportUsers: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.populateImportUsersFromExternalSystem();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("cancelMigration", () => {
		it("should call CancelMigration and reset userSearch.list and importUsersData.total", async () => {
			const { store, mockApi } = setup();
			store.userSearch.list = { data: [{ mockKey: "val" } as never], total: 5, skip: 0, limit: 10 };
			store.importUsersData.total = 42;

			await store.cancelMigration();

			expect(mockApi.importUserControllerCancelMigration).toHaveBeenCalledTimes(1);
			expect(store.userSearch.list).toEqual({ data: [], total: 0, skip: 0, limit: 0 });
			expect(store.importUsersData.total).toBe(0);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerCancelMigration: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.cancelMigration();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});

	describe("clearAllAutoMatches", () => {
		it("should call ClearAllAutoMatches", async () => {
			const { store, mockApi } = setup();
			await store.clearAllAutoMatches();

			expect(mockApi.importUserControllerClearAllAutoMatches).toHaveBeenCalledTimes(1);
		});

		it("should set businessError on failure", async () => {
			const { store } = setup({
				importUserControllerClearAllAutoMatches: vi.fn(() => Promise.reject(badRequestError)),
			});

			await store.clearAllAutoMatches();

			expect(store.businessError).toStrictEqual(expectedBusinessError);
		});
	});
});
