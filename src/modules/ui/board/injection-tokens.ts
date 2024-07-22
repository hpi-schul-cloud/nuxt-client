import { InjectionKey } from "vue";
import { BoardMenuScope } from "./board-menu-scope";

export const MENU_SCOPE: InjectionKey<BoardMenuScope> = Symbol("MENU_SCOPE");
