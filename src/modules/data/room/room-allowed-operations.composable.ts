import { useRoomDetailsStore } from "./RoomDetails.store";
import { RoomItemResponseAllowedOperations } from "@api-server";
import { storeToRefs } from "pinia";
import { computed, ComputedRef } from "vue";

export const useRoomAllowedOperations = () => {
	const { room } = storeToRefs(useRoomDetailsStore());

	const allowedOperations: ComputedRef<RoomItemResponseAllowedOperations> = computed(
		(): RoomItemResponseAllowedOperations => {
			if (room.value?.allowedOperations) {
				return room.value.allowedOperations;
			} else {
				return new Proxy({} as RoomItemResponseAllowedOperations, {
					get: () => false,
				});
			}
		}
	);

	return {
		allowedOperations,
	};
};
