import { InjectionKey, Ref } from "vue";

export const BOARD_HAS_MULTIPLE_COLUMNS: InjectionKey<Ref<boolean>> = Symbol(
	"BoardHasMultipleColumns"
);

export const BOARD_IS_FIRST_COLUMN: InjectionKey<Ref<boolean>> =
	Symbol("BoardIsFirstColumn");

export const BOARD_IS_LAST_COLUMN: InjectionKey<Ref<boolean>> =
	Symbol("BoardIsLastColumn");

export const BOARD_CARD_HAS_MULTIPLE_ELEMENTS: InjectionKey<Ref<boolean>> =
	Symbol("BoardCardHasMultipleElements");

export const BOARD_CARD_IS_FIRST_ELEMENT: InjectionKey<Ref<boolean>> = Symbol(
	"BoardCardIsFirstElement"
);

export const BOARD_CARD_IS_LAST_ELEMENT: InjectionKey<Ref<boolean>> = Symbol(
	"BoardCardIsLastElement"
);

export const BOARD_HAS_LIST_LAYOUT: InjectionKey<Ref<boolean>> =
	Symbol("BoardHasListLayout");
