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
	ImportUserResponseRoleNamesEnum,
	//UpdateMatchParams,
	//UserMatchResponse,
	UserMatchResponseMatchedByEnum,
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
	dataMock = [
		{
			importUserId: "61b22f1ff2eef8a520c25632",
			firstName: "Gulien-Marlo",
			lastName: "Amann",
			loginName:
				"uid=gulien-marlo1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
			roleNames: ImportUserResponseRoleNamesEnum.Student,
			classNames: ["11/4"],
			match: {
				userId: "0000d224816abba584714c9c",
				loginName: "test",
				firstName: "Test",
				lastName: "Last",
				matchedBy: UserMatchResponseMatchedByEnum.Auto,
			},
		},
		{
			importUserId: "61b22f1ff2eef8a520c25634",
			firstName: "Helen",
			lastName: "Alt",
			loginName:
				"uid=helena1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
			roleNames: ImportUserResponseRoleNamesEnum.Teacher,
			classNames: ["11/5", "11/4"],
		},
		{
			importUserId: "61b22f1ff2eef8a520c25636",
			firstName: "Adrian",
			lastName: "Amann",
			loginName:
				"uid=adriana1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
			roleNames: ImportUserResponseRoleNamesEnum.Teacher,
			classNames: ["11/3"],
			match: {
				userId: "0000d231816abba584714c9e",
				loginName: "test",
				firstName: "Test",
				lastName: "Last",
				matchedBy: UserMatchResponseMatchedByEnum.Auto,
			},
		},
		{
			importUserId: "61b22f1ff2eef8a520c25638",
			firstName: "Fabian",
			lastName: "Anders",
			loginName:
				"uid=fabiana1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
			roleNames: ImportUserResponseRoleNamesEnum.Student,
			classNames: ["11/6"],
		},
		{
			importUserId: "61b22f1ff2eef8a520c2563a",
			firstName: "Cedric",
			lastName: "Apel",
			loginName:
				"uid=cedrica1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
			roleNames: ImportUserResponseRoleNamesEnum.Student,
			classNames: ["12/1"],
		},
		{
			importUserId: "61b22f1ff2eef8a520c25640",
			firstName: "Maditha",
			lastName: "Arndt",
			loginName:
				"uid=madithaa1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
			roleNames: ImportUserResponseRoleNamesEnum.Student,
			classNames: ["8c"],
		},
		{
			importUserId: "61b22f1ff2eef8a520c25642",
			firstName: "Leon",
			lastName: "Arnold",
			loginName: "uid=leona1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
			roleNames: ImportUserResponseRoleNamesEnum.Student,
			classNames: ["12/4"],
		},
		{
			importUserId: "61b22f1ff2eef8a520c25644",
			firstName: "Rahel",
			lastName: "Auer",
			loginName:
				"uid=rahela1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
			roleNames: ImportUserResponseRoleNamesEnum.Student,
			classNames: ["8b"],
		},
	];

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
	sortBy: any = {};
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
	setSort(sortBy: string, sortOrder: string): void {
		this.sortBy = sortBy;
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
