// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/store-accessor.ts

// This is the "store accessor":
// It initializes all the modules using a Vuex plugin (see store/index.ts)
// In here you import all your modules, call getModule on them to turn them
// into the actual stores, and then re-export them.

import AccountsModule from "@/store/accounts";
import ApplicationErrorModule from "./application-error";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import CollaborativeFilesModule from "@/store/collaborative-files";
import ContentModule from "@/store/content";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import ExternalToolsModule from "@/store/external-tools";
import FilePaths from "@/store/filePaths";
import FinishedTasksModule from "@/store/finished-tasks";
import ImportUsersModule from "@/store/import-users";
import LoadingStateModule from "@/store/loading-state";
import NewsModule from "@/store/news";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import ShareModule from "@/store/share";
import StatusAlertsModule from "@/store/status-alerts";
import SystemsModule from "@/store/systems";
import TaskCardModule from "@/store/task-card";
import TasksModule from "@/store/tasks";
import UserLoginMigrationModule from "@/store/user-login-migration";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import ContextExternalToolsModule from "@/store/context-external-tools";

// Each store is the singleton instance of its module class
// Use these -- they have methods for state/getters/mutations/actions
// (result from getModule(...))
export let accountsModule: AccountsModule;
export let applicationErrorModule: ApplicationErrorModule;
export let authModule: AuthModule;
export let autoLogoutModule: AutoLogoutModule;
export let collaborativeFilesModule: CollaborativeFilesModule;
export let contentModule: ContentModule;
export let contextExternalToolsModule: ContextExternalToolsModule;
export let copyModule: CopyModule;
export let envConfigModule: EnvConfigModule;
export let externalToolsModule: ExternalToolsModule;
export let filePathsModule: FilePaths;
export let finishedTasksModule: FinishedTasksModule;
export let importUsersModule: ImportUsersModule;
export let loadingStateModule: LoadingStateModule;
export let newsModule: NewsModule;
export let notifierModule: NotifierModule;
export let roomModule: RoomModule;
export let roomsModule: RoomsModule;
export let schoolsModule: SchoolsModule;
export let shareModule: ShareModule;
export let statusAlertsModule: StatusAlertsModule;
export let systemsModule: SystemsModule;
export let taskCardModule: TaskCardModule;
export let tasksModule: TasksModule;
export let userLoginMigrationModule: UserLoginMigrationModule;

// initializer plugin: sets up state/getters/mutations/actions for each store
export function initializeStores(store: Store<any>): void {
	accountsModule = getModule(AccountsModule, store);
	applicationErrorModule = getModule(ApplicationErrorModule, store);
	authModule = getModule(AuthModule, store);
	autoLogoutModule = getModule(AutoLogoutModule, store);
	collaborativeFilesModule = getModule(CollaborativeFilesModule, store);
	contentModule = getModule(ContentModule, store);
	contextExternalToolsModule = getModule(ContextExternalToolsModule, store);
	copyModule = getModule(CopyModule, store);
	envConfigModule = getModule(EnvConfigModule, store);
	externalToolsModule = getModule(ExternalToolsModule, store);
	filePathsModule = getModule(FilePaths, store);
	finishedTasksModule = getModule(FinishedTasksModule, store);
	importUsersModule = getModule(ImportUsersModule, store);
	loadingStateModule = getModule(LoadingStateModule, store);
	newsModule = getModule(NewsModule, store);
	notifierModule = getModule(NotifierModule, store);
	roomModule = getModule(RoomModule, store);
	roomsModule = getModule(RoomsModule, store);
	schoolsModule = getModule(SchoolsModule, store);
	shareModule = getModule(ShareModule, store);
	statusAlertsModule = getModule(StatusAlertsModule, store);
	systemsModule = getModule(SystemsModule, store);
	taskCardModule = getModule(TaskCardModule, store);
	tasksModule = getModule(TasksModule, store);
	userLoginMigrationModule = getModule(UserLoginMigrationModule, store);
}

// for use in 'modules' store init (see store/index.ts), so each module
// appears as an element of the root store's state.
// (This is required!)
export const modules = {
	accountsModule: AccountsModule,
	applicationErrorModule: ApplicationErrorModule,
	authModule: AuthModule,
	autoLogoutModule: AutoLogoutModule,
	collaborativeFilesModule: CollaborativeFilesModule,
	contentModule: ContentModule,
	contextExternalToolsModule: ContextExternalToolsModule,
	copyModule: CopyModule,
	envConfigModule: EnvConfigModule,
	externalToolsModule: ExternalToolsModule,
	filePathsModule: FilePaths,
	finishedTasksModule: FinishedTasksModule,
	importUsersModule: ImportUsersModule,
	loadingStateModule: LoadingStateModule,
	newsModule: NewsModule,
	notifierModule: NotifierModule,
	roomModule: RoomModule,
	roomsModule: RoomsModule,
	schoolsModule: SchoolsModule,
	shareModule: ShareModule,
	statusAlertsModule: StatusAlertsModule,
	systemsModule: SystemsModule,
	taskCardModule: TaskCardModule,
	tasksModule: TasksModule,
	userLoginMigrationModule: UserLoginMigrationModule,
};
