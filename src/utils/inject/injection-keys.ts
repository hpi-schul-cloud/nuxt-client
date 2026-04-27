import CopyModule from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import FilePathsModule from "@/store/filePaths";
import FinishedTasksModule from "@/store/finished-tasks";
import SchoolsModule from "@/store/schools";
import ShareModule from "@/store/share";
import SystemsModule from "@/store/systems";
import TasksModule from "@/store/tasks";
import { InjectionKey } from "vue";

export const FILE_PATHS_MODULE_KEY: InjectionKey<FilePathsModule> = Symbol("filePathsModule");
export const COURSE_ROOM_DETAILS_MODULE_KEY: InjectionKey<CourseRoomDetailsModule> = Symbol("courseRoomDetailsModule");
export const SYSTEMS_MODULE_KEY: InjectionKey<SystemsModule> = Symbol("systemsModule");
export const SCHOOLS_MODULE_KEY: InjectionKey<SchoolsModule> = Symbol("schoolsModule");
export const COPY_MODULE_KEY: InjectionKey<CopyModule> = Symbol("copyModule");
export const SHARE_MODULE_KEY: InjectionKey<ShareModule> = Symbol("shareModule");

// injection keys for vuex modules can not be symbols due to @module-decorator restrictions
export const TASKS_MODULE_KEY: InjectionKey<TasksModule> = "tasksModule" as unknown as InjectionKey<TasksModule>;
export const FINISHED_TASKS_MODULE_KEY: InjectionKey<FinishedTasksModule> =
	"finishedTasksModule" as unknown as InjectionKey<FinishedTasksModule>;
