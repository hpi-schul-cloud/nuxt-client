<template>
	<div class="h-screen d-flex justify-center align-center">
		<VCard width="400" height="400">
			<VCardTitle>
				<h2>Importieren einer Karte</h2>
			</VCardTitle>
			<VCardText>
				<VForm>
					<VSelect v-model="selectedRoomId" :items="rooms" item-value="id" item-title="name" placeholder="Raum" />
					<VSelect
						v-model="selectedBoardId"
						:disabled="!selectedRoomId"
						:items="boards"
						item-value="id"
						placeholder="Bereich"
					/>
					<VSelect
						v-model="selectedColumnId"
						:disabled="!selectedBoardId"
						:items="columns"
						item-value="id"
						placeholder="Abschnitt"
					/>
				</VForm>
			</VCardText>
			<VCardActions class="d-flex justify-right ga-2">
				<VBtn
					data-testid="dialog-cancel"
					:aria-label="t('common.actions.cancel')"
					variant="text"
					:text="t('common.actions.cancel')"
					@click="onCancel"
				/>
				<VBtn
					data-testid="dialog-confirm"
					:aria-label="t('common.actions.confirm')"
					class="px-6"
					color="primary"
					variant="flat"
					:text="t('common.actions.confirm')"
					:disabled="!selectedColumnId"
					@click="onConfirm"
				/>
			</VCardActions>
		</VCard>
	</div>
</template>

<script setup lang="ts">
import { ColumnResponse, RoomApiFactory, RoomBoardItemResponse } from "../../../../serverApi/v3/api";
import { $axios } from "@/utils/api";
import { useBoardApi } from "@data-board";
import { useRoomsState } from "@data-room";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const roomApi = RoomApiFactory(undefined, "/v3", $axios);
const { fetchBoardCall } = useBoardApi();

const emit = defineEmits(["confirm", "cancel"]);

const { rooms, fetchRooms } = useRoomsState();
const selectedRoomId = ref<string>();
const boards = ref<Array<RoomBoardItemResponse>>();
const selectedBoardId = ref<string>();
const columns = ref<Array<ColumnResponse>>();
const selectedColumnId = ref<string>();

const onConfirm = () => {
	emit("confirm", {
		boardId: selectedBoardId.value,
		columnId: selectedColumnId.value,
	});
};

const onCancel = () => {
	emit("cancel");
};

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
