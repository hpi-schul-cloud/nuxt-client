import SchoolsModule from "@/store/schools";
import { InjectionKey } from "vue";

export const SCHOOLS_MODULE_KEY: InjectionKey<SchoolsModule> = Symbol("schoolsModule");
