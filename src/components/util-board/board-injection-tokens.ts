import { InjectionKey } from "vue";

export const BOARD_CARD_HAS_MULTIPLE_ELEMENTS: InjectionKey<boolean> = Symbol(
	"BoardCardHasMultipleElements"
);

export const BOARD_CARD_IS_FIRST_ELEMENT: InjectionKey<boolean> = Symbol(
	"BoardCardIsFirstElement"
);

export const BOARD_CARD_IS_LAST_ELEMENT: InjectionKey<boolean> = Symbol(
	"BoardCardIsLastElement"
);
