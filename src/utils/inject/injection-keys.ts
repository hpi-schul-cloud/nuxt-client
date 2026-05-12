import FilePathsModule from "@/store/filePaths";
import ShareModule from "@/store/share";
import { InjectionKey } from "vue";

export const FILE_PATHS_MODULE_KEY: InjectionKey<FilePathsModule> = Symbol("filePathsModule");
export const SHARE_MODULE_KEY: InjectionKey<ShareModule> = Symbol("shareModule");
