import { InjectionKey, Ref } from "vue";

export const BOARD_CARD_HAS_MULTIPLE_ELEMENTS: InjectionKey<Ref<boolean>> =
	Symbol("BoardCardHasMultipleElements");

export const BOARD_CARD_IS_FIRST_ELEMENT: InjectionKey<Ref<boolean>> = Symbol(
	"BoardCardIsFirstElement"
);

export const BOARD_CARD_IS_LAST_ELEMENT: InjectionKey<Ref<boolean>> = Symbol(
	"BoardCardIsLastElement"
);
