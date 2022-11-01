// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/store-accessor.ts

// This is the "store accessor":
// It initializes all the modules using a Vuex plugin (see store/index.ts)
// In here you import all your modules, call getModule on them to turn them
// into the actual stores, and then re-export them.

import AccountsModule from "@/store/accounts";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import ContentModule from "@/store/content";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import FilePaths from "@/store/filePaths";
import FilesPOCModule from "@/store/files-poc";
import FinishedTaskModule from "@/store/finished-tasks";
import ImportUsersModule from "@/store/import-users";
import LoadingStateModule from "@/store/loading-state";
import NewsModule from "@/store/news";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import ShareCourseModule from "@/store/share-course";
import StatusAlertsModule from "@/store/status-alerts";
import TaskModule from "@/store/tasks";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";

// Each store is the singleton instance of its module class
// Use these -- they have methods for state/getters/mutations/actions
// (result from getModule(...))
export let accountsModule: AccountsModule;
export let authModule: AuthModule;
export let autoLogoutModule: AutoLogoutModule;
export let contentModule: ContentModule;
export let copyModule: CopyModule;
export let envConfigModule: EnvConfigModule;
export let filePathsModule: FilePaths;
export let filesPOCModule: FilesPOCModule;
export let finishedTaskModule: FinishedTaskModule;
export let importUsersModule: ImportUsersModule;
export let loadingStateModule: LoadingStateModule;
export let newsModule: NewsModule;
export let notifierModule: NotifierModule;
export let roomModule: RoomModule;
export let roomsModule: RoomsModule;
export let schoolsModule: SchoolsModule;
export let statusAlertsModule: StatusAlertsModule;
export let taskModule: TaskModule;
export let shareCourseModule: ShareCourseModule;

// initializer plugin: sets up state/getters/mutations/actions for each store
export function initializeStores(store: Store<any>): void {
	accountsModule = getModule(AccountsModule, store);
	authModule = getModule(AuthModule, store);
	autoLogoutModule = getModule(AutoLogoutModule, store);
	contentModule = getModule(ContentModule, store);
	envConfigModule = getModule(EnvConfigModule, store);
	filePathsModule = getModule(FilePaths, store);
	filesPOCModule = getModule(FilesPOCModule, store);
	finishedTaskModule = getModule(FinishedTaskModule, store);
	importUsersModule = getModule(ImportUsersModule, store);
	newsModule = getModule(NewsModule, store);
	roomModule = getModule(RoomModule, store);
	roomsModule = getModule(RoomsModule, store);
	schoolsModule = getModule(SchoolsModule, store);
	statusAlertsModule = getModule(StatusAlertsModule, store);
	taskModule = getModule(TaskModule, store);
	notifierModule = getModule(NotifierModule, store);
	copyModule = getModule(CopyModule, store);
	loadingStateModule = getModule(LoadingStateModule, store);
	shareCourseModule = getModule(ShareCourseModule, store);
}

export function initilizeNewsModule(store: Store<any>) {
	newsModule = getModule(NewsModule, store);
}

// for use in 'modules' store init (see store/index.ts), so each module
// appears as an element of the root store's state.
// (This is required!)
export const modules = {
	accountsModule: AccountsModule,
	authModule: AuthModule,
	autoLogoutModule: AutoLogoutModule,
	contentModule: ContentModule,
	envConfigModule: EnvConfigModule,
	filePathsModule: FilePaths,
	filesPOCModule: FilesPOCModule,
	finishedTaskModule: FinishedTaskModule,
	importUsersModule: ImportUsersModule,
	newsModule: NewsModule,
	roomModule: RoomModule,
	roomsModule: RoomsModule,
	schoolsModule: SchoolsModule,
	statusAlertsModule: StatusAlertsModule,
	taskModule: TaskModule,
	notifierModule: NotifierModule,
	copyModule: CopyModule,
	loadingStateModule: LoadingStateModule,
	shareCourseModule: ShareCourseModule,
};

// const moduleMap: Map<string, VuexModule> = new Map();

// export class Filter<F extends BaseFilter> {
// 	private readonly _filters: F;
// 	private readonly _pagination: FilterPagination;
// 	private _sort: Map<keyof F, FilterSortDirection> = new Map<keyof F, FilterSortDirection>();
// 	private readonly fc: new () => F;

// 	constructor(filterClass: new () => F, pageSize = 10) {
// 	this.fc = filterClass;
// 	this._filters = new filterClass();
// 	this._pagination = new FilterPagination(1, pageSize);
// 	return this;
// 	}
// 	}

// function setupStore(name: string, moduleInstance?: VuexModule) {
// 	if (moduleInstance) {
// 		// set specific instance
// 		// moduleMap[name] = moduleInstance
// 	} else {
// 		const moduleClass: new () => VuexModule = modules[name];
// 		// moduleMap[name] = getModule(moduleCalss, store);
// 	}
// }

// function setupStores(name: string): Store<unknown> {
// 	const store = new Store({});

// 	const moduleClass = modules[name] as VuexModule;
// 	getModule(moduleClass, store);

// 	// let key: keyof typeof m;
// 	// for (key in m) {
// 	// 	const moduleClass = m[key];
// 	// 	moduleMap.set(key, getModule(moduleClass, store));
// 	// }
// 	return store;
// }
