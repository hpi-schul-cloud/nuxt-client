import {
	ImportUserListResponse,
	ImportUserResponse,
	ImportUserResponseRoleNamesEnum,
	UserImportApiFactory,
	UserImportApiInterface,
	UserMatchListResponse,
} from "@/serverApi/v3";
import { ApiResponseError, ApiValidationError, BusinessError } from "@/store/types/commons";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export enum MatchedBy {
	Admin = "admin",
	Auto = "auto",
	None = "none",
}

type SortOrder = "asc" | "desc" | undefined;

@Module({
	name: "importUsersModule",
	namespaced: true,
	stateFactory: true,
})
export default class ImportUsersModule extends VuexModule {
	private importUserList: ImportUserListResponse = {
		data: [],
		total: 0,
		skip: 0,
		limit: 0,
	};
	private firstName = "";
	private lastName = "";
	private loginName = "";
	private role: ImportUserResponseRoleNamesEnum | "" = "";
	private classes = "";
	private match: Array<MatchedBy> = [MatchedBy.Admin, MatchedBy.Auto, MatchedBy.None];
	private flagged = false;
	private limit = 25;
	private skip = 0;
	private sortBy = "";
	private sortOrder: SortOrder = "asc";
	private total = 0;
	private totalMatched = 0;

	private userList: UserMatchListResponse = {
		data: [],
		total: 0,
		skip: 0,
		limit: 0,
	};
	private userSearch = "";
	private usersLimit = 1;
	private usersSkip = 0;
	private totalUnmatched = 0;

	private businessError: BusinessError | null = null;

	@Mutation
	setFirstName(firstName: string): void {
		this.firstName = firstName;
	}

	@Mutation
	setLastName(lastName: string): void {
		this.lastName = lastName;
	}

	@Mutation
	setLoginName(loginName: string): void {
		this.loginName = loginName;
	}

	@Mutation
	setRole(role: ImportUserResponseRoleNamesEnum): void {
		this.role = role;
	}

	@Mutation
	setClasses(classes: string): void {
		this.classes = classes;
	}

	@Mutation
	setMatch(match: Array<MatchedBy>): void {
		this.match = match;
	}

	@Mutation
	deleteMatchMutation(importUserId: string): void {
		const editedUser = this.importUserList.data.find((importUser) => importUser.importUserId === importUserId);
		if (editedUser) {
			editedUser.match = undefined;
			this.importUserList = { ...this.importUserList };
		}
	}

	@Mutation
	setFlagged(flagged: boolean): void {
		this.flagged = flagged;
	}

	@Mutation
	setUserFlagged(payload: { importUserId: string; flagged: boolean }) {
		const editedUser = this.importUserList.data.find((importUser) => importUser.importUserId === payload.importUserId);
		if (editedUser) {
			editedUser.flagged = payload.flagged;
			this.importUserList = { ...this.importUserList };
		}
	}

	@Mutation
	setLimit(limit: number): void {
		this.limit = limit;
	}

	@Mutation
	setSkip(skip: number): void {
		this.skip = skip;
	}

	@Mutation
	setSortBy(sortBy: string): void {
		this.sortBy = sortBy;
	}

	@Mutation
	setSortOrder(sortOrder: SortOrder): void {
		this.sortOrder = sortOrder;
	}

	@Mutation
	setBusinessError(businessError: BusinessError | null): void {
		this.businessError = businessError;
	}

	get getBusinessError(): BusinessError | null {
		return this.businessError;
	}

	@Mutation
	setImportUsersList(importUsersList: ImportUserListResponse): void {
		this.importUserList = importUsersList;
	}

	get getImportUserList(): ImportUserListResponse {
		return this.importUserList;
	}

	@Mutation
	setUserSearch(userSearch: string): void {
		this.userSearch = userSearch;
	}

	get getUserSearch(): string {
		return this.userSearch;
	}

	@Mutation
	setUsersList(importUsersList: UserMatchListResponse): void {
		this.userList = importUsersList;
	}

	get getUserList(): UserMatchListResponse {
		return this.userList;
	}

	@Mutation
	setTotalUnmatched(total: number): void {
		this.totalUnmatched = total;
	}

	get getTotalUnmatched(): number {
		return this.totalUnmatched;
	}

	@Mutation
	setTotal(total: number): void {
		this.total = total;
	}

	get getTotal(): number {
		return this.total;
	}

	@Mutation
	setTotalMatched(total: number): void {
		this.totalMatched = total;
	}

	get getTotalMatched(): number {
		return this.totalMatched;
	}

	@Mutation
	setUsersLimit(limit: number): void {
		this.usersLimit = limit;
	}

	@Mutation
	setUsersSkip(skip: number): void {
		this.usersSkip = skip;
	}

	@Action
	async fetchAllImportUsers(): Promise<void> {
		try {
			// TODO fix type
			const sortBy = this.sortBy === "firstName" || this.sortBy === "lastName" ? this.sortBy : undefined;

			const response = await this.importUserApi.importUserControllerFindAllImportUsers(
				this.firstName || undefined,
				this.lastName || undefined,
				this.loginName || undefined,
				this.match || undefined,
				this.flagged ? true : undefined,
				this.classes || undefined,
				this.role || undefined,
				this.sortBy ? this.sortOrder : undefined,
				sortBy,
				this.skip,
				this.limit
			);
			this.setImportUsersList(response.data);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async fetchAllUsers(): Promise<void> {
		try {
			const response = await this.importUserApi.importUserControllerFindAllUnmatchedUsers(
				this.userSearch || undefined,
				this.usersSkip,
				this.usersLimit
			);
			this.setUsersList(response.data);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async saveFlag(payload: { importUserId: string; flagged: boolean }): Promise<ImportUserResponse | void> {
		try {
			this.setUserFlagged(payload);
			const response = await this.importUserApi.importUserControllerUpdateFlag(payload.importUserId, {
				flagged: payload.flagged,
			});
			return response.data;
		} catch (error: unknown) {
			this.setUserFlagged({
				importUserId: payload.importUserId,
				flagged: !payload.flagged,
			});

			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async saveMatch(payload: { importUserId: string; userId: string }): Promise<ImportUserResponse | void> {
		try {
			const response = await this.importUserApi.importUserControllerSetMatch(payload.importUserId, {
				userId: payload.userId,
			});
			return response.data;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async deleteMatch(importUserId: string): Promise<ImportUserResponse | void> {
		try {
			const response = await this.importUserApi.importUserControllerRemoveMatch(importUserId);
			this.deleteMatchMutation(importUserId);
			return response.data;
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async fetchTotal(): Promise<void> {
		try {
			const response = await this.importUserApi.importUserControllerFindAllImportUsers(
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
			this.setTotal(response.data.total);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async fetchTotalMatched(): Promise<void> {
		try {
			const response = await this.importUserApi.importUserControllerFindAllImportUsers(
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
			this.setTotalMatched(response.data.total);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async fetchTotalUnmatched(): Promise<void> {
		try {
			const response = await this.importUserApi.importUserControllerFindAllUnmatchedUsers(undefined, 0, 1);
			this.setTotalUnmatched(response.data.total);
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async performMigration(): Promise<void> {
		try {
			await this.importUserApi.importUserControllerSaveAllUsersMatches();
		} catch (error: unknown) {
			const apiError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async populateImportUsersFromExternalSystem(matchByPreferredName = false): Promise<void> {
		try {
			await this.importUserApi.importUserControllerPopulateImportUsers(matchByPreferredName);
		} catch (error: unknown) {
			const apiError: ApiResponseError | ApiValidationError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async cancelMigration(): Promise<void> {
		try {
			await this.importUserApi.importUserControllerCancelMigration();
			this.setUsersList({
				data: [],
				total: 0,
				skip: 0,
				limit: 0,
			});
			this.setTotal(0);
		} catch (error: unknown) {
			const apiError: ApiResponseError | ApiValidationError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	@Action
	async clearAllAutoMatches(): Promise<void> {
		try {
			await this.importUserApi.importUserControllerClearAllAutoMatches();
		} catch (error: unknown) {
			const apiError: ApiResponseError | ApiValidationError = mapAxiosErrorToResponseError(error);

			this.setBusinessError({
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			});
		}
	}

	private get importUserApi(): UserImportApiInterface {
		return UserImportApiFactory(undefined, "/v3", $axios);
	}
}
