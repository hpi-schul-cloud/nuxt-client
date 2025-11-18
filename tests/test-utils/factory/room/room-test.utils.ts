import { RoomItem } from "@/types/room/Room";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { useRoomStore } from "@data-room";
import { Pinia } from "pinia";

export const createTestRoomStore = (rooms: RoomItem[] = [], pinia?: Pinia) => {
	const store = useRoomStore(pinia);

	store.$patch({ rooms });
	const roomStore = mockedPiniaStoreTyping(useRoomStore);

	return { roomStore, rooms };
};
