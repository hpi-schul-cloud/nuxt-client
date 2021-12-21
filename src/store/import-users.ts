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
	//ImportUserResponse,
	//ImportUserResponseRoleNamesEnum,
	//UpdateMatchParams,
	//UserMatchResponse,
	//UserMatchResponseMatchedByEnum,
} from "@/serverApi/v3";

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
	match: Array<'auto' | 'admin' | 'none'> = ['auto', 'admin', 'none'];

	limit: number = 10;
	skip: number = 0;
	sortBy: any = '';
	sortOrder: any = 'asc';

	loading: boolean = false;
	error: null | {} = null;

	private _userApi?: UserApiInterface;

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setFirstName(firstName: string): void {
		this.firstName = firstName;
	}

	@Mutation
	setLastName(lastName: string): void {
		this.lastName = lastName;
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
	setMatch(match: Array<'auto' | 'admin' | 'none'>): void {
		this.match = match;
	}

	@Mutation
	setError(error: {}): void {
		this.error = error;
	}

	@Mutation
	setImportUsersList(importUsersList: ImportUserListResponse): void {
		this.importUserList = importUsersList;
	}

	get getImportUserList(): ImportUserListResponse {
		return this.importUserList;
	}

	@Action
	async fetchAllElements(): Promise<void> {
		this.setLoading(true);
		try {
			return this.userApi
				.importUserControllerFindAll(
					undefined, //this.firstName,
					undefined,
					undefined,
					this.match,
					undefined,
					this.sortBy,
					this.sortOrder,
					this.skip,
					this.limit
				)
				.then((data) => {
					//console.log(data)
					this.setImportUsersList(data.data);
				});
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
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
