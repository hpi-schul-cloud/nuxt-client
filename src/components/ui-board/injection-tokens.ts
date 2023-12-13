import { InjectionKey } from "vue";
import { BoardMenuScope } from "./board-menu-scope";
import { MenuEvent } from "./BoardMenuEvent.enum";

export const MENU_SCOPE: InjectionKey<BoardMenuScope> = Symbol("MENU_SCOPE");
export const MENU_HANDLER: InjectionKey<(event: MenuEvent) => void> =
	Symbol("MENU_HANDLER");
