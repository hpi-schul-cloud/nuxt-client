// idea from: https://github.com/garyo/vuex-module-decorators-example/blob/master/src/store/store-accessor.ts

// This is the "store accessor":
// It initializes all the modules using a Vuex plugin (see store/index.ts)
// In here you import all your modules, call getModule on them to turn them
// into the actual stores, and then re-export them.

import ApplicationErrorModule from "@/store/application-error";
import AuthModule from "@/store/auth";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";
import ContentModule from "@/store/content";
import CopyModule from "@/store/copy";
import FilePaths from "@/store/filePaths";
import FinishedTasksModule from "@/store/finished-tasks";
import GroupModule from "@/store/group";
import ImportUsersModule from "@/store/import-users";
import LoadingStateModule from "@/store/loading-state";
import NewsModule from "@/store/news";
import NotifierModule from "@/store/notifier";
import PrivacyPolicyModule from "@/store/privacy-policy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import CourseRoomListModule from "@/store/course-room-list";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import SchoolsModule from "@/store/schools";
import ShareModule from "@/store/share";
import StatusAlertsModule from "@/store/status-alerts";
import SystemsModule from "@/store/systems";
import TasksModule from "@/store/tasks";
import TermsOfUseModule from "@/store/terms-of-use";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import VideoConferenceModule from "@/store/video-conference";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import CommonCartridgeExportModule from "./common-cartridge-export";

// Each store is the singleton instance of its module class
// Use these -- they have methods for state/getters/mutations/actions
// (result from getModule(...))
export let applicationErrorModule: ApplicationErrorModule;
export let authModule: AuthModule;
export let contentModule: ContentModule;
export let copyModule: CopyModule;
export let filePathsModule: FilePaths;
export let finishedTasksModule: FinishedTasksModule;
export let groupModule: GroupModule;
export let importUsersModule: ImportUsersModule;
export let loadingStateModule: LoadingStateModule;
export let newsModule: NewsModule;
export let notifierModule: NotifierModule;
export let privacyPolicyModule: PrivacyPolicyModule;
export let termsOfUseModule: TermsOfUseModule;
export let courseRoomDetailsModule: CourseRoomDetailsModule;
export let courseRoomListModule: CourseRoomListModule;
export let schoolExternalToolsModule: SchoolExternalToolsModule;
export let schoolsModule: SchoolsModule;
export let shareModule: ShareModule;
export let statusAlertsModule: StatusAlertsModule;
export let systemsModule: SystemsModule;
export let tasksModule: TasksModule;
export let userLoginMigrationModule: UserLoginMigrationModule;
export let videoConferenceModule: VideoConferenceModule;
export let commonCartridgeExportModule: CommonCartridgeExportModule;
export let commonCartridgeImportModule: CommonCartridgeImportModule;

// initializer plugin: sets up state/getters/mutations/actions for each store
export function initializeStores(store: Store<unknown>): void {
	applicationErrorModule = getModule(ApplicationErrorModule, store);
	authModule = getModule(AuthModule, store);
	contentModule = getModule(ContentModule, store);
	copyModule = getModule(CopyModule, store);
	filePathsModule = getModule(FilePaths, store);
	finishedTasksModule = getModule(FinishedTasksModule, store);
	groupModule = getModule(GroupModule, store);
	importUsersModule = getModule(ImportUsersModule, store);
	loadingStateModule = getModule(LoadingStateModule, store);
	newsModule = getModule(NewsModule, store);
	notifierModule = getModule(NotifierModule, store);
	privacyPolicyModule = getModule(PrivacyPolicyModule, store);
	termsOfUseModule = getModule(TermsOfUseModule, store);
	courseRoomDetailsModule = getModule(CourseRoomDetailsModule, store);
	courseRoomListModule = getModule(CourseRoomListModule, store);
	schoolExternalToolsModule = getModule(SchoolExternalToolsModule, store);
	schoolsModule = getModule(SchoolsModule, store);
	shareModule = getModule(ShareModule, store);
	statusAlertsModule = getModule(StatusAlertsModule, store);
	systemsModule = getModule(SystemsModule, store);
	tasksModule = getModule(TasksModule, store);
	userLoginMigrationModule = getModule(UserLoginMigrationModule, store);
	videoConferenceModule = getModule(VideoConferenceModule, store);
	commonCartridgeExportModule = getModule(CommonCartridgeExportModule, store);
	commonCartridgeImportModule = getModule(CommonCartridgeImportModule, store);
}

// for use in 'modules' store init (see store/index.ts), so each module
// appears as an element of the root store's state.
// (This is required!)
export const modules = {
	applicationErrorModule: ApplicationErrorModule,
	authModule: AuthModule,
	contentModule: ContentModule,
	copyModule: CopyModule,
	filePathsModule: FilePaths,
	finishedTasksModule: FinishedTasksModule,
	groupModule: GroupModule,
	importUsersModule: ImportUsersModule,
	loadingStateModule: LoadingStateModule,
	newsModule: NewsModule,
	notifierModule: NotifierModule,
	privacyPolicyModule: PrivacyPolicyModule,
	termsOfUseModule: TermsOfUseModule,
	courseRoomDetailsModule: CourseRoomDetailsModule,
	courseRoomListModule: CourseRoomListModule,
	schoolExternalToolsModule: SchoolExternalToolsModule,
	schoolsModule: SchoolsModule,
	shareModule: ShareModule,
	statusAlertsModule: StatusAlertsModule,
	systemsModule: SystemsModule,
	tasksModule: TasksModule,
	userLoginMigrationModule: UserLoginMigrationModule,
	videoConferenceModule: VideoConferenceModule,
	commonCartridgeExportModule: CommonCartridgeExportModule,
	commonCartridgeImportModule: CommonCartridgeImportModule,
};
