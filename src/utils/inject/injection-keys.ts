import CopyModule from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import FilePathsModule from "@/store/filePaths";
import ShareModule from "@/store/share";
import { InjectionKey } from "vue";

export const FILE_PATHS_MODULE_KEY: InjectionKey<FilePathsModule> = Symbol("filePathsModule");
export const COURSE_ROOM_DETAILS_MODULE_KEY: InjectionKey<CourseRoomDetailsModule> = Symbol("courseRoomDetailsModule");
export const COPY_MODULE_KEY: InjectionKey<CopyModule> = Symbol("copyModule");
export const SHARE_MODULE_KEY: InjectionKey<ShareModule> = Symbol("shareModule");
