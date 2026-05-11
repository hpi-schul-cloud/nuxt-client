import { BusinessError } from "@/store/types/commons";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	ImportUserListResponse,
	ImportUserResponse,
	ImportUserResponseRoleNames,
	UserImportApiFactory,
	UserMatchListResponse,
} from "@api-server";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export enum MatchedBy {
	Admin = "admin",
	Auto = "auto",
	None = "none",
}

type SortOrder = "asc" | "desc" | undefined;

export const useImportUsersStore = defineStore("importUsersStore", () => {
	/** Filter and pagination params sent to importUserControllerFindAllImportUsers */
	const filter = reactive({
		firstName: "",
		lastName: "",
		loginName: "",
		role: "" as ImportUserResponseRoleNames | "",
		classes: "",
		match: [MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None] as MatchedBy[],
		flagged: false,
		limit: 25,
		skip: 0,
		sortBy: "",
		sortOrder: "asc" as SortOrder,
	});

	/** Result data and aggregate totals for the import-user list */
	const importUsersData = reactive({
		list: { data: [], total: 0, skip: 0, limit: 0 } as ImportUserListResponse,
		total: 0,
		totalMatched: 0,
		totalUnmatched: 0,
	});

	/** Params and results for the unmatched-user search */
	const userSearch = reactive({
		query: "",
		limit: 1,
		skip: 0,
		list: { data: [], total: 0, skip: 0, limit: 0 } as UserMatchListResponse,
	});

	const businessError = ref<BusinessError | null>(null);

	const importUserApi = computed(() => UserImportApiFactory(undefined, "/v3", $axios));

	type FindAllImportUsersParams = {
		firstName?: string;
		lastName?: string;
		loginName?: string;
		match?: Array<"auto" | "admin" | "none">;
		flagged?: boolean;
		classes?: string;
		role?: ImportUserResponseRoleNames;
		sortOrder?: SortOrder;
		sortBy?: "firstName" | "lastName";
		skip?: number;
		limit?: number;
	};

	const callFindAllImportUsers = (params: FindAllImportUsersParams = {}) =>
		importUserApi.value.importUserControllerFindAllImportUsers(
			params.firstName,
			params.lastName,
			params.loginName,
			params.match,
			params.flagged,
			params.classes,
			params.role,
			params.sortOrder,
			params.sortBy,
			params.skip,
			params.limit
		);

	const fetchAllImportUsers = async (): Promise<void> => {
		try {
			const sortByParam = filter.sortBy === "firstName" || filter.sortBy === "lastName" ? filter.sortBy : undefined;

			const response = await callFindAllImportUsers({
				firstName: filter.firstName || undefined,
				lastName: filter.lastName || undefined,
				loginName: filter.loginName || undefined,
				match: filter.match || undefined,
				flagged: filter.flagged ? true : undefined,
				classes: filter.classes || undefined,
				role: filter.role || undefined,
				sortOrder: filter.sortBy ? filter.sortOrder : undefined,
				sortBy: sortByParam,
				skip: filter.skip,
				limit: filter.limit,
			});
			importUsersData.list = response.data;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const fetchAllUsers = async (): Promise<void> => {
		try {
			const response = await importUserApi.value.importUserControllerFindAllUnmatchedUsers(
				userSearch.query || undefined,
				userSearch.skip,
				userSearch.limit
			);
			userSearch.list = response.data;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const saveFlag = async (payload: { importUserId: string; flagged: boolean }): Promise<ImportUserResponse | void> => {
		const editedUser = importUsersData.list.data.find((u) => u.importUserId === payload.importUserId);
		if (editedUser) editedUser.flagged = payload.flagged;
		try {
			const response = await importUserApi.value.importUserControllerUpdateFlag(payload.importUserId, {
				flagged: payload.flagged,
			});
			return response.data;
		} catch (error: unknown) {
			if (editedUser) editedUser.flagged = !payload.flagged;
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const saveMatch = async (payload: { importUserId: string; userId: string }): Promise<ImportUserResponse | void> => {
		try {
			const response = await importUserApi.value.importUserControllerSetMatch(payload.importUserId, {
				userId: payload.userId,
			});
			return response.data;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const deleteMatch = async (importUserId: string): Promise<ImportUserResponse | void> => {
		try {
			const response = await importUserApi.value.importUserControllerRemoveMatch(importUserId);
			const editedUser = importUsersData.list.data.find((u) => u.importUserId === importUserId);
			if (editedUser) editedUser.match = undefined;
			return response.data;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const fetchTotal = async (): Promise<void> => {
		try {
			const response = await callFindAllImportUsers({ skip: 0, limit: 1 });
			importUsersData.total = response.data.total;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const fetchTotalMatched = async (): Promise<void> => {
		try {
			const response = await callFindAllImportUsers({ match: ["admin", "auto"], skip: 0, limit: 1 });
			importUsersData.totalMatched = response.data.total;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const fetchTotalUnmatched = async (): Promise<void> => {
		try {
			const response = await importUserApi.value.importUserControllerFindAllUnmatchedUsers(undefined, 0, 1);
			importUsersData.totalUnmatched = response.data.total;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const performMigration = async (): Promise<void> => {
		try {
			await importUserApi.value.importUserControllerSaveAllUsersMatches();
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const populateImportUsersFromExternalSystem = async (matchByPreferredName = false): Promise<void> => {
		try {
			await importUserApi.value.importUserControllerPopulateImportUsers(matchByPreferredName);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const cancelMigration = async (): Promise<void> => {
		try {
			await importUserApi.value.importUserControllerCancelMigration();
			userSearch.list = { data: [], total: 0, skip: 0, limit: 0 };
			importUsersData.total = 0;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const clearAllAutoMatches = async (): Promise<void> => {
		try {
			await importUserApi.value.importUserControllerClearAllAutoMatches();
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	return {
		filter,
		importUsersData,
		userSearch,
		businessError,
		fetchAllImportUsers,
		fetchAllUsers,
		saveFlag,
		saveMatch,
		deleteMatch,
		fetchTotal,
		fetchTotalMatched,
		fetchTotalUnmatched,
		performMigration,
		populateImportUsersFromExternalSystem,
		cancelMigration,
		clearAllAutoMatches,
	};
});
