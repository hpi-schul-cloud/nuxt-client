import ApplicationErrorModule from "@/store/application-error";
import AuthModule from "@/store/auth";
import CommonCartridgeExportModule from "@/store/common-cartridge-export";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";
import ContentModule from "@/store/content";
import CopyModule from "@/store/copy";
import FilePathsModule from "@/store/filePaths";
import GroupModule from "@/store/group";
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
import { InjectionKey } from "vue";
import FinishedTasksModule from "@/store/finished-tasks";

export const FILE_PATHS_MODULE_KEY: InjectionKey<FilePathsModule> =
	Symbol("filePathsModule");
export const NOTIFIER_MODULE_KEY: InjectionKey<NotifierModule> =
	Symbol("notifierModule");
export const AUTH_MODULE_KEY: InjectionKey<AuthModule> = Symbol("authModule");
export const SCHOOL_EXTERNAL_TOOLS_MODULE_KEY: InjectionKey<SchoolExternalToolsModule> =
	Symbol("schoolExternalToolsModule");
export const APPLICATION_ERROR_KEY: InjectionKey<ApplicationErrorModule> =
	Symbol("applicationError");
export const COURSE_ROOM_DETAILS_MODULE_KEY: InjectionKey<CourseRoomDetailsModule> =
	Symbol("courseRoomDetailsModule");
export const VIDEO_CONFERENCE_MODULE_KEY: InjectionKey<VideoConferenceModule> =
	Symbol("videoConferenceModule");
export const STATUS_ALERTS_MODULE_KEY: InjectionKey<StatusAlertsModule> =
	Symbol("statusAlertsModule");
export const USER_LOGIN_MIGRATION_MODULE_KEY: InjectionKey<UserLoginMigrationModule> =
	Symbol("userLoginMigrationModule");
export const SYSTEMS_MODULE_KEY: InjectionKey<SystemsModule> =
	Symbol("systemsModule");
export const GROUP_MODULE_KEY: InjectionKey<GroupModule> =
	Symbol("groupModule");
export const PRIVACY_POLICY_MODULE_KEY: InjectionKey<PrivacyPolicyModule> =
	Symbol("privacyPolicyModule");
export const TERMS_OF_USE_MODULE_KEY: InjectionKey<TermsOfUseModule> =
	Symbol("termsOfUseModule");
export const SCHOOLS_MODULE_KEY: InjectionKey<SchoolsModule> =
	Symbol("schoolsModule");
export const COMMON_CARTRIDGE_EXPORT_MODULE_KEY: InjectionKey<CommonCartridgeExportModule> =
	Symbol("commonCartridgeExportModule");
export const COURSE_ROOM_LIST_MODULE_KEY: InjectionKey<CourseRoomListModule> =
	Symbol("courseRoomListModule");
export const LOADING_STATE_MODULE_KEY: InjectionKey<LoadingStateModule> =
	Symbol("loadingStateModule");
export const NEWS_MODULE_KEY: InjectionKey<NewsModule> = Symbol("newsModule");
export const CONTENT_MODULE_KEY: InjectionKey<ContentModule> =
	Symbol("contentModule");
export const COPY_MODULE_KEY: InjectionKey<CopyModule> = Symbol("copyModule");
export const COMMON_CARTRIDGE_IMPORT_MODULE_KEY: InjectionKey<CommonCartridgeImportModule> =
	Symbol("commonCartridgeImportModule");
export const SHARE_MODULE_KEY: InjectionKey<ShareModule> =
	Symbol("shareModule");

// injection keys for vuex modules can not be symbols due to @module-decorator restrictions
export const TASKS_MODULE_KEY: InjectionKey<TasksModule> =
	"tasksModule" as unknown as InjectionKey<TasksModule>;
export const FINISHED_TASKS_MODULE_KEY: InjectionKey<FinishedTasksModule> =
	"finishedTasksModule" as unknown as InjectionKey<FinishedTasksModule>;

export const THEME_KEY: InjectionKey<{ name: string }> = Symbol("theme");
