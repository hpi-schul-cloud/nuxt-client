import { InjectionKey } from "vue";

export type IdHolder = (id: string) => Promise<void>;

export const BOARD_COLUMN_DELETE: InjectionKey<IdHolder> =
	Symbol("BoardColumnDelete");

// export const BOARD_COLUMN_DELETE = "BoardColumnDelete";
