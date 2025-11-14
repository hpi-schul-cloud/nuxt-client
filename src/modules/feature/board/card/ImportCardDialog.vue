<template>
	<div>{{ selectedRoomId }}</div>
	<Dialog :is-dialog-open="isDialogOpen" message="Karte importieren">
		<template #content>
			<VForm>
				<VSelect
					v-model="selectedRoomId"
					:items="rooms"
					item-value="id"
					item-title="name"
					placeholder="Raum"
					@update:model-value="console.log"
				/>
				<VSelect
					v-if="selectedRoomId"
					v-model="selectedBoardId"
					:items="boards"
					item-value="id"
					placeholder="Bereich"
				/>
				<VSelect
					v-if="selectedBoardId"
					v-model="selectedColumnId"
					:items="columns"
					item-value="id"
					placeholder="Abschnitt"
				/>
			</VForm>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { ColumnResponse, RoomApiFactory, RoomBoardItemResponse } from "../../../../serverApi/v3/api";
import { $axios } from "@/utils/api";
import { useBoardApi } from "@data-board";
import { useRoomsState } from "@data-room";
import { Dialog } from "@ui-dialog";
import { ref, watch } from "vue";
import { onMounted } from "vue";

const roomApi = RoomApiFactory(undefined, "/v3", $axios);
const { fetchBoardCall } = useBoardApi();

const isDialogOpen = ref(true);

const { rooms, fetchRooms } = useRoomsState();
const selectedRoomId = ref<string>();
const boards = ref<Array<RoomBoardItemResponse>>();
const selectedBoardId = ref<string>();
const columns = ref<Array<ColumnResponse>>();
const selectedColumnId = ref<string>();

onMounted(async () => {
	fetchRooms();
});

watch(selectedRoomId, async (newRoomId) => {
	if (newRoomId) {
		boards.value = (await roomApi.roomControllerGetRoomBoards(newRoomId)).data.data;
	}
});

watch(selectedBoardId, async (newBoardId) => {
	if (newBoardId) {
		const board = await fetchBoardCall(newBoardId);
		columns.value = board.columns;
	}
});
</script>
