import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "@utils/api";
import {
	UserImportApiFactory,
	ImportUserListResponse,
	UserMatchListResponse,
	ImportUserResponse,
	ImportUserResponseRoleNamesEnum, UserImportApiInterface,
} from "@/serverApi/v3";
import {BusinessError} from "@store/types/commons";

// @ts-ignore
@Module({
	name: "importUsers",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})

export class ImportUsers extends VuexModule {
	importUserList: ImportUserListResponse = {
		data: [],
		total: 0,
		skip: 0,
		limit: 0,
	};
	firstName: string = '';
	lastName: string = '';
	loginName: string = '';
	role: ImportUserResponseRoleNamesEnum | '' = '';
	classes: string = '';
	match: Array<'auto' | 'admin' | 'none'> = ['auto', 'admin', 'none'];
	flagged: boolean = false;
	limit: number = 10;
	skip: number = 0;
	sortBy: string = '';
	sortOrder: any = 'asc';
	totalMatched: number = 0;

	userList: UserMatchListResponse = {
		data: [],
		total: 0,
		skip: 0,
		limit: 0,
	};
	userSearch: string = '';
	usersLimit: number = 1;
	usersSkip: number = 0;
	totalUnmatched: number = 0;

	businessError: BusinessError | null = {
		statusCode: "",
		message: "",
	};

	private _userApi?: UserImportApiInterface;

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
	setMatch(match: Array<'auto' | 'admin' | 'none'>): void {
		this.match = match;
	}

	@Mutation
	setFlagged(flagged: boolean): void {
		this.flagged = flagged;
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

	get getSortBy() {
		return this.sortBy;
	}

	@Mutation
	setSortOrder(sortOrder: string): void {
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
			const sortBy = this.sortBy === 'firstName' || this.sortBy === 'lastName'  ? this.sortBy : undefined;
			const response = await this.userApi
				.importUserControllerFindAllImportUsers(
					this.firstName ? this.firstName : undefined,
					this.lastName ? this.lastName : undefined,
					this.loginName ? this.loginName : undefined,
					this.match ? this.match : undefined,
					this.flagged ? true : undefined,
					this.classes ? this.classes : undefined,
					this.role ? this.role : undefined,
					this.sortBy ? this.sortOrder : undefined,
					sortBy,
					this.skip ? this.skip : 0,
					this.limit ? this.limit : 25
				);
			this.setImportUsersList(response.data);
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async fetchAllUsers(): Promise<void> {
		try {
			const response = await this.userApi
				.importUserControllerFindAllUnmatchedUsers(
					this.userSearch ? this.userSearch : undefined,
					this.usersSkip,
					this.usersLimit
				);
			this.setUsersList(response.data);
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async saveFlag(payload: { importUserId: string, flagged: boolean }): Promise<ImportUserResponse | undefined> {
		try {
			const response = await this.userApi.importUserControllerUpdateFlag(payload.importUserId, { flagged: payload.flagged });
			return response.data;
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async saveMatch(payload: {importUserId: string, userId: string}): Promise<ImportUserResponse | undefined> {
		try {
			const response = await this.userApi.importUserControllerSetMatch(payload.importUserId, { userId: payload.userId } );
			return response.data;
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async deleteMatch(importUserId: string): Promise<ImportUserResponse | undefined> {
		try {
			const response = await this.userApi.importUserControllerRemoveMatch(importUserId);
			return response.data;
		} catch (error: any) {
			this.setBusinessError(error);
		}
	}

	@Action
	async summaryUnmatched(): Promise<void> {
		try {
			const response = await this.userApi
				.importUserControllerFindAllUnmatchedUsers(
					undefined,
					0,
					1
				);
			this.setTotalUnmatched(response.data.total);
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async summaryMatched(): Promise<void> {
		try {
			const response = await this.userApi
				.importUserControllerFindAllImportUsers(
					undefined,
					undefined,
					undefined,
					['admin', 'auto'],
					undefined,
					undefined,
					undefined,
					undefined,
					undefined,
					0,
					1
				);
			this.setTotalMatched(response.data.total);
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	private get userApi(): UserImportApiInterface {
		if (!this._userApi) {
			this._userApi = UserImportApiFactory(undefined, "/v3", $axios);
		}
		return this._userApi;
	}
}

export default getModule(ImportUsers);
