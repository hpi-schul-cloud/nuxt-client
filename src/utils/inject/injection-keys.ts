import ShareModule from "@/store/share";
import { InjectionKey } from "vue";

export const SHARE_MODULE_KEY: InjectionKey<ShareModule> = Symbol("shareModule");
