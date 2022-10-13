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
import StatusAlertsModule from "@/store/statusAlerts";
import TaskModule from "@/store/tasks";
import ShareCourseModule from "@/store/share-course";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";

let accountsModule: AccountsModule;
let authModule: AuthModule;
let autoLogoutModule: AutoLogoutModule;
let contentModule: ContentModule;
let copyModule: CopyModule;
let envConfigModule: EnvConfigModule;
let filePathsModule: FilePaths;
let filesPOCModule: FilesPOCModule;
let finishedTaskModule: FinishedTaskModule;
let importUsersModule: ImportUsersModule;
let loadingStateModule: LoadingStateModule;
let newsModule: NewsModule;
let notifierModule: NotifierModule;
let roomModule: RoomModule;
let roomsModule: RoomsModule;
let schoolsModule: SchoolsModule;
let statusAlertsModule: StatusAlertsModule;
let taskModule: TaskModule;
let shareCourseModule: ShareCourseModule;

function initializeStores(store: Store<any>): void {
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

export {
	initializeStores,
	accountsModule,
	authModule,
	autoLogoutModule,
	contentModule,
	envConfigModule,
	filePathsModule,
	filesPOCModule,
	finishedTaskModule,
	importUsersModule,
	newsModule,
	roomModule,
	roomsModule,
	schoolsModule,
	statusAlertsModule,
	taskModule,
	notifierModule,
	copyModule,
	loadingStateModule,
	shareCourseModule,
};
