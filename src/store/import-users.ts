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
	UserApiFactory,
	//UserApi,
	UserApiInterface,
	ImportUserListResponse,
	UserDetailsListResponse,
	ImportUserResponseRoleNamesEnum,
	//UpdateMatchParams, ImportUserResponse, UserDetailsResponse,
	//ImportUserResponse,
	//ImportUserResponseRoleNamesEnum,
	//UpdateMatchParams,
	//UserMatchResponse,
	//UserMatchResponseMatchedByEnum,
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

	userList: UserDetailsListResponse = {
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
	sortBy: any = '';
	sortOrder: any = 'asc';

	userSearch: string = '';

	// TODO
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	private _userApi?: UserApiInterface;

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

	@Mutation
	setSortOrder(sortOrder: string): void {
		this.sortOrder = sortOrder;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	get getBusinessError(): BusinessError {
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

	@Mutation
	setUsersList(importUsersList: UserDetailsListResponse): void {
		this.userList = importUsersList;
	}

	get getUserList(): UserDetailsListResponse {
		return this.userList;
	}

	@Action
	async fetchAllImportUsers(): Promise<void> {
		try {
			return this.userApi
				.importUserControllerFindAll(
					this.firstName ? this.firstName : undefined,
					this.lastName ? this.lastName : undefined,
					this.loginName ? this.loginName : undefined,
					this.match,
					this.flagged ? true : undefined,
					this.classes ? this.classes : undefined,
					this.role ? this.role : undefined,
					this.sortBy,
					this.sortOrder,
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
					this.skip,
					this.limit
				)
				.then((data) => {
					this.setUsersList(data.data);
				});
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	@Action
	async saveMatch(payload: {importUserId: string, userId: string}): Promise<void> {
		try {
			await this.userApi.importUserControllerUpdateMatch(payload.importUserId, { userId: payload.userId } );
		} catch (error: any) {
			this.setBusinessError({ statusCode: '500', message: error });
		}
	}

	private get userApi(): UserApiInterface {
		if (!this._userApi) {
			this._userApi = UserApiFactory(undefined, "/v3", $axios);
		}
		return this._userApi;
	}
}

export default getModule(ImportUsers);
