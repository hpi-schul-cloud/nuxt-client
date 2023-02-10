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
import FilesPOCModule from "@/store/files-poc";
import FinishedTasksModule from "@/store/finished-tasks";
import ImportUsersModule from "@/store/import-users";
import LoadingStateModule from "@/store/loading-state";
import NewsModule from "@/store/news";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import ShareCourseModule from "@/store/share-course";
import StatusAlertsModule from "@/store/status-alerts";
import SystemsModule from "@/store/systems";
import TaskCardModule from "@/store/task-card";
import TasksModule from "@/store/tasks";
import UserMigrationModule from "@/store/user-migration";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import ShareLessonModule from "@/store/share-lesson";
import ShareTaskModule from "@/store/share-task";

// Each store is the singleton instance of its module class
// Use these -- they have methods for state/getters/mutations/actions
// (result from getModule(...))
export let accountsModule: AccountsModule;
export let applicationErrorModule: ApplicationErrorModule;
export let authModule: AuthModule;
export let autoLogoutModule: AutoLogoutModule;
export let collaborativeFilesModule: CollaborativeFilesModule;
export let contentModule: ContentModule;
export let copyModule: CopyModule;
export let envConfigModule: EnvConfigModule;
export let externalToolsModule: ExternalToolsModule;
export let filePathsModule: FilePaths;
export let filesPOCModule: FilesPOCModule;
export let finishedTasksModule: FinishedTasksModule;
export let importUsersModule: ImportUsersModule;
export let loadingStateModule: LoadingStateModule;
export let newsModule: NewsModule;
export let notifierModule: NotifierModule;
export let roomModule: RoomModule;
export let roomsModule: RoomsModule;
export let schoolsModule: SchoolsModule;
export let shareCourseModule: ShareCourseModule;
export let statusAlertsModule: StatusAlertsModule;
export let systemsModule: SystemsModule;
export let taskCardModule: TaskCardModule;
export let tasksModule: TasksModule;
export let userMigrationModule: UserMigrationModule;
export let shareLessonModule: ShareLessonModule;
export let shareTaskModule: ShareTaskModule;

// initializer plugin: sets up state/getters/mutations/actions for each store
export function initializeStores(store: Store<any>): void {
	accountsModule = getModule(AccountsModule, store);
	applicationErrorModule = getModule(ApplicationErrorModule, store);
	authModule = getModule(AuthModule, store);
	autoLogoutModule = getModule(AutoLogoutModule, store);
	collaborativeFilesModule = getModule(CollaborativeFilesModule, store);
	contentModule = getModule(ContentModule, store);
	copyModule = getModule(CopyModule, store);
	envConfigModule = getModule(EnvConfigModule, store);
	externalToolsModule = getModule(ExternalToolsModule, store);
	filePathsModule = getModule(FilePaths, store);
	filesPOCModule = getModule(FilesPOCModule, store);
	finishedTasksModule = getModule(FinishedTasksModule, store);
	importUsersModule = getModule(ImportUsersModule, store);
	loadingStateModule = getModule(LoadingStateModule, store);
	newsModule = getModule(NewsModule, store);
	notifierModule = getModule(NotifierModule, store);
	roomModule = getModule(RoomModule, store);
	roomsModule = getModule(RoomsModule, store);
	schoolsModule = getModule(SchoolsModule, store);
	shareCourseModule = getModule(ShareCourseModule, store);
	statusAlertsModule = getModule(StatusAlertsModule, store);
	systemsModule = getModule(SystemsModule, store);
	taskCardModule = getModule(TaskCardModule, store);
	tasksModule = getModule(TasksModule, store);
	userMigrationModule = getModule(UserMigrationModule, store);
	shareLessonModule = getModule(ShareLessonModule, store);
	shareTaskModule = getModule(ShareTaskModule, store);
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
	copyModule: CopyModule,
	envConfigModule: EnvConfigModule,
	externalToolsModule: ExternalToolsModule,
	filePathsModule: FilePaths,
	filesPOCModule: FilesPOCModule,
	finishedTasksModule: FinishedTasksModule,
	importUsersModule: ImportUsersModule,
	loadingStateModule: LoadingStateModule,
	newsModule: NewsModule,
	notifierModule: NotifierModule,
	roomModule: RoomModule,
	roomsModule: RoomsModule,
	schoolsModule: SchoolsModule,
	shareCourseModule: ShareCourseModule,
	statusAlertsModule: StatusAlertsModule,
	systemsModule: SystemsModule,
	taskCardModule: TaskCardModule,
	tasksModule: TasksModule,
	userMigrationModule: UserMigrationModule,
	shareLessonModule: ShareLessonModule,
	shareTaskModule: ShareTaskModule,
};
