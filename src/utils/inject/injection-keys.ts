import SchoolsModule from "@/store/schools";
import ShareModule from "@/store/share";
import { InjectionKey } from "vue";

export const SCHOOLS_MODULE_KEY: InjectionKey<SchoolsModule> = Symbol("schoolsModule");
export const SHARE_MODULE_KEY: InjectionKey<ShareModule> = Symbol("shareModule");
