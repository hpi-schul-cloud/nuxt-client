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

	userList: UserMatchListResponse = {
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
	sortBy?: 'firstName' | 'lastName';
	sortOrder: any = 'asc';

	userSearch: string = '';
	usersLimit: number = 1;
	usersSkip: number = 0;

	// TODO
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
	setSortBy(sortBy: 'firstName' | 'lastName'): void {
		this.sortBy = sortBy;
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
			return this.userApi
				.importUserControllerFindAllImportUsers(
					this.firstName ? this.firstName : undefined,
					this.lastName ? this.lastName : undefined,
					this.loginName ? this.loginName : undefined,
					this.match,
					this.flagged ? true : undefined,
					this.classes ? this.classes : undefined,
					this.role ? this.role : undefined,
					this.sortBy ? this.sortOrder : undefined,
					this.sortBy,
					this.skip,
					this.limit
				)
				.then((data) => {
					this.setImportUsersList(data.data);
				});
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async fetchAllUsers(): Promise<void> {
		try {
			return this.userApi
				.importUserControllerFindAllUnmatchedUsers(
					this.userSearch ? this.userSearch : undefined,
					this.usersSkip,
					this.usersLimit
				)
				.then((data) => {
					this.setUsersList(data.data);
				});
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async saveFlag(payload: { importUserId: string, flagged: boolean }): Promise<void> {
			console.log('saveFlag', payload)
		try {
			// TODO implement api service
			await this.userApi.importUserControllerUpdateFlag(payload.importUserId, { flagged: payload.flagged });
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async saveMatch(payload: {importUserId: string, userId: string}): Promise<void> {
		try {
			await this.userApi.importUserControllerSetMatch(payload.importUserId, { userId: payload.userId } );
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async deleteMatch(importUserId: string): Promise<void> {
		try {
			await this.userApi.importUserControllerRemoveMatch(importUserId);
		} catch (error: any) {
			this.setBusinessError(error);
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
