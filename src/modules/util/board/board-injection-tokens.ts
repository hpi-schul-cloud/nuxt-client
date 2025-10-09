import { InjectionKey, Ref } from "vue";

export const BOARD_IS_LIST_LAYOUT: InjectionKey<Ref<boolean>> = Symbol("BoardHasListLayout");
