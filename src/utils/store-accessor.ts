import AccountsModule from "@/store/accounts";
import ApplicationErrorModule from "@/store/application-error";
import AuthModule from "@/store/auth";
import AutoLogoutModule from "@/store/autoLogout";
import ContentModule from "@/store/content";
import CopyModule from "@/store/copy";
import EnvConfigModule from "@/store/env-config";
import FilePaths from "@/store/filePaths";
import CollaborativeFilesModule from "@store/collaborative-files";
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
import TaskModule from "@/store/task";
import TasksModule from "@/store/tasks";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import ExternalToolsModule from "@store/external-tools";

let accountsModule: AccountsModule;
let applicationErrorModule: ApplicationErrorModule;
let authModule: AuthModule;
let autoLogoutModule: AutoLogoutModule;
let collaborativeFilesModule: CollaborativeFilesModule;
let contentModule: ContentModule;
let copyModule: CopyModule;
let envConfigModule: EnvConfigModule;
let externalToolsModule: ExternalToolsModule;
let filePathsModule: FilePaths;
let filesPOCModule: FilesPOCModule;
let finishedTasksModule: FinishedTasksModule;
let importUsersModule: ImportUsersModule;
let loadingStateModule: LoadingStateModule;
let newsModule: NewsModule;
let notifierModule: NotifierModule;
let roomModule: RoomModule;
let roomsModule: RoomsModule;
let schoolsModule: SchoolsModule;
let shareCourseModule: ShareCourseModule;
let statusAlertsModule: StatusAlertsModule;
let tasksModule: TasksModule;
let taskModule: TaskModule;

function initializeStores(store: Store<any>): void {
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
	tasksModule = getModule(TasksModule, store);
	taskModule = getModule(TaskModule, store);
	notifierModule = getModule(NotifierModule, store);
	copyModule = getModule(CopyModule, store);
	loadingStateModule = getModule(LoadingStateModule, store);
	shareCourseModule = getModule(ShareCourseModule, store);
}

export {
	initializeStores,
	accountsModule,
	applicationErrorModule,
	authModule,
	autoLogoutModule,
	collaborativeFilesModule,
	contentModule,
	copyModule,
	envConfigModule,
	externalToolsModule,
	filePathsModule,
	filesPOCModule,
	finishedTasksModule,
	importUsersModule,
	loadingStateModule,
	newsModule,
	notifierModule,
	roomModule,
	roomsModule,
	schoolsModule,
	shareCourseModule,
	statusAlertsModule,
	tasksModule,
	taskModule,
};
