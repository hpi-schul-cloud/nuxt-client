import CourseRoomDetailsModule from "@/store/course-room-details";
import FilePathsModule from "@/store/filePaths";
import SchoolsModule from "@/store/schools";
import ShareModule from "@/store/share";
import { InjectionKey } from "vue";

export const FILE_PATHS_MODULE_KEY: InjectionKey<FilePathsModule> = Symbol("filePathsModule");
export const COURSE_ROOM_DETAILS_MODULE_KEY: InjectionKey<CourseRoomDetailsModule> = Symbol("courseRoomDetailsModule");
export const SCHOOLS_MODULE_KEY: InjectionKey<SchoolsModule> = Symbol("schoolsModule");
export const SHARE_MODULE_KEY: InjectionKey<ShareModule> = Symbol("shareModule");
