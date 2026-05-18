import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
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
import { reactive, ref } from "vue";

export enum MatchedBy {
	Admin = "admin",
	Auto = "auto",
	None = "none",
}

type SortOrder = "asc" | "desc" | undefined;

interface FilterState {
	firstName: string;
	lastName: string;
	loginName: string;
	role: ImportUserResponseRoleNames | "";
	classes: string;
	match: MatchedBy[];
	flagged: boolean;
	limit: number;
	skip: number;
	sortBy: "firstName" | "lastName" | "";
	sortOrder: SortOrder;
}

interface ImportUsersDataState {
	list: ImportUserListResponse;
	total: number;
	totalMatched: number;
	totalUnmatched: number;
}

interface UserSearchState {
	query: string;
	limit: number;
	skip: number;
	list: UserMatchListResponse;
}

export const useImportUsersStore = defineStore("importUsersStore", () => {
	/** Filter and pagination params sent to importUserControllerFindAllImportUsers */
	const filter = reactive<FilterState>({
		firstName: "",
		lastName: "",
		loginName: "",
		role: "",
		classes: "",
		match: [MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None],
		flagged: false,
		limit: 25,
		skip: 0,
		sortBy: "",
		sortOrder: "asc",
	});

	/** Result data and aggregate totals for the import-user list */
	const importUsersData = reactive<ImportUsersDataState>({
		list: { data: [], total: 0, skip: 0, limit: 0 },
		total: 0,
		totalMatched: 0,
		totalUnmatched: 0,
	});

	/** Params and results for the unmatched-user search */
	const userSearch = reactive<UserSearchState>({
		query: "",
		limit: 1,
		skip: 0,
		list: { data: [], total: 0, skip: 0, limit: 0 },
	});

	const businessError = ref<BusinessError | null>(null);

	const importUserApi = UserImportApiFactory(undefined, "/v3", $axios);

	const { execute } = useSafeAxiosTask();

	const fetchAllImportUsers = async (): Promise<void> => {
		const sortByParam = filter.sortBy === "firstName" || filter.sortBy === "lastName" ? filter.sortBy : undefined;

		const params = {
			...(filter.firstName && { firstName: filter.firstName }),
			...(filter.lastName && { lastName: filter.lastName }),
			...(filter.loginName && { loginName: filter.loginName }),
			match: filter.match,
			...(filter.flagged && { flagged: true }),
			...(filter.classes && { classes: filter.classes }),
			...(filter.role && { role: filter.role }),
			...(sortByParam && { sortBy: sortByParam, sortOrder: filter.sortOrder }),
			skip: filter.skip,
			limit: filter.limit,
		};

		const { result, error } = await execute(() =>
			$axios.get<ImportUserListResponse>("/v3/user/import", { params })
		);
		importUsersData.list = result?.data ?? { data: [], total: 0, skip: 0, limit: 0 };

		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const fetchAllUsers = async (): Promise<void> => {
		const params = {
			...(userSearch.query && { name: userSearch.query }),
			skip: userSearch.skip,
			limit: userSearch.limit,
		};

		const { result, error } = await execute(() =>
			$axios.get<UserMatchListResponse>("/v3/user/import/unassigned", { params })
		);
		userSearch.list = result?.data ?? { data: [], total: 0, skip: 0, limit: 0 };
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const saveFlag = async (payload: { importUserId: string; flagged: boolean }): Promise<ImportUserResponse | void> => {
		const editedUser = importUsersData.list.data.find((u) => u.importUserId === payload.importUserId);
		if (editedUser) editedUser.flagged = payload.flagged;

		const { result, error } = await execute(() =>
			importUserApi.importUserControllerUpdateFlag(payload.importUserId, {
				flagged: payload.flagged,
			})
		);
		if (error) {
			if (editedUser) editedUser.flagged = !payload.flagged;
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
			return;
		}
		return result?.data;
	};

	const saveMatch = async (payload: { importUserId: string; userId: string }): Promise<ImportUserResponse | void> => {
		const { result, error } = await execute(() =>
			importUserApi.importUserControllerSetMatch(payload.importUserId, {
				userId: payload.userId,
			})
		);
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
			return;
		}
		return result?.data;
	};

	const deleteMatch = async (importUserId: string): Promise<ImportUserResponse | void> => {
		const { result, error } = await execute(() => importUserApi.importUserControllerRemoveMatch(importUserId));
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
			return;
		}
		const editedUser = importUsersData.list.data.find((u) => u.importUserId === importUserId);
		if (editedUser) editedUser.match = undefined;
		return result?.data;
	};

	const fetchTotal = async (): Promise<void> => {
		const { result, error } = await execute(() =>
			$axios.get<ImportUserListResponse>("/v3/user/import", { params: { skip: 0, limit: 1 } })
		);
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
			return;
		}
		importUsersData.total = result?.data.total ?? 0;
	};

	const fetchTotalMatched = async (): Promise<void> => {
		const { result, error } = await execute(() =>
			$axios.get<ImportUserListResponse>("/v3/user/import", {
				params: { match: ["admin", "auto"], skip: 0, limit: 1 },
			})
		);
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
			return;
		}
		importUsersData.totalMatched = result?.data.total ?? 0;
	};

	const fetchTotalUnmatched = async (): Promise<void> => {
		const { result, error } = await execute(() =>
			$axios.get<UserMatchListResponse>("/v3/user/import/unassigned", { params: { skip: 0, limit: 1 } })
		);
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
			return;
		}
		importUsersData.totalUnmatched = result?.data.total ?? 0;
	};

	const performMigration = async (): Promise<void> => {
		const { result, error } = await execute(() => importUserApi.importUserControllerSaveAllUsersMatches());
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
			return;
		}
		return result?.data;
	};

	const populateImportUsersFromExternalSystem = async (matchByPreferredName = false): Promise<void> => {
		const { error } = await execute(() => importUserApi.importUserControllerPopulateImportUsers(matchByPreferredName));
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const cancelMigration = async (): Promise<void> => {
		const { error } = await execute(() => importUserApi.importUserControllerCancelMigration());
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
			return;
		}
		userSearch.list = { data: [], total: 0, skip: 0, limit: 0 };
		importUsersData.total = 0;
	};

	const clearAllAutoMatches = async (): Promise<void> => {
		const { error } = await execute(() => importUserApi.importUserControllerClearAllAutoMatches());
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const setSchoolInUserMigration = async (useCentralLdap = true): Promise<void> => {
		const { error } = await execute(() => importUserApi.importUserControllerStartSchoolInUserMigration(useCentralLdap));
		if (error) {
			const apiError = mapAxiosErrorToResponseError(error);
			businessError.value = { error: apiError, statusCode: apiError.code, message: apiError.message };
		}
	};

	const endSchoolInMaintenance = async (): Promise<void> => {
		const { error } = await execute(() => importUserApi.importUserControllerEndSchoolInMaintenance());
		if (error) {
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
		setSchoolInUserMigration,
		endSchoolInMaintenance,
	};
});
