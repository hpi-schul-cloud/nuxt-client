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
import NewsModule from "@/store/news";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import RoomsModule from "@/store/rooms";
import SchoolsModule from "@/store/schools";
import TaskModule from "@/store/tasks";
import LoadingStateModule from "@/store/loading-state";
import ShareCourseModule from "@/store/share-course";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import ImportCourseModule from "@store/import-course";

let accountsModule: AccountsModule;
let authModule: AuthModule;
let autoLogoutModule: AutoLogoutModule;
let contentModule: ContentModule;
let copyModule: CopyModule;
let envConfigModule: EnvConfigModule;
let filePathsModule: FilePaths;
let filesPOCModule: FilesPOCModule;
let finishedTaskModule: FinishedTaskModule;
let importCourseModule: ImportCourseModule;
let importUsersModule: ImportUsersModule;
let loadingStateModule: LoadingStateModule;
let newsModule: NewsModule;
let notifierModule: NotifierModule;
let roomModule: RoomModule;
let roomsModule: RoomsModule;
let schoolsModule: SchoolsModule;
let shareCourseModule: ShareCourseModule;
let taskModule: TaskModule;

function initializeStores(store: Store<any>): void {
	accountsModule = getModule(AccountsModule, store);
	authModule = getModule(AuthModule, store);
	autoLogoutModule = getModule(AutoLogoutModule, store);
	contentModule = getModule(ContentModule, store);
	copyModule = getModule(CopyModule, store);
	envConfigModule = getModule(EnvConfigModule, store);
	filePathsModule = getModule(FilePaths, store);
	filesPOCModule = getModule(FilesPOCModule, store);
	finishedTaskModule = getModule(FinishedTaskModule, store);
	importCourseModule = getModule(ImportCourseModule, store);
	importUsersModule = getModule(ImportUsersModule, store);
	loadingStateModule = getModule(LoadingStateModule, store);
	newsModule = getModule(NewsModule, store);
	notifierModule = getModule(NotifierModule, store);
	roomModule = getModule(RoomModule, store);
	roomsModule = getModule(RoomsModule, store);
	schoolsModule = getModule(SchoolsModule, store);
	shareCourseModule = getModule(ShareCourseModule, store);
	taskModule = getModule(TaskModule, store);
}

export {
	initializeStores,
	accountsModule,
	authModule,
	autoLogoutModule,
	contentModule,
	copyModule,
	envConfigModule,
	filePathsModule,
	filesPOCModule,
	finishedTaskModule,
	importCourseModule,
	importUsersModule,
	loadingStateModule,
	newsModule,
	notifierModule,
	roomModule,
	roomsModule,
	schoolsModule,
	shareCourseModule,
	taskModule,
};
