<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		message="Importieren einer Karte"
		@confirm="onConfirm"
		@cancel="onCancel"
	>
		<template #content>
			<VForm id="importCardForm" data-testid="import-card-form">
				<VSelect
					v-model="selectedRoomId"
					:items="rooms"
					item-value="id"
					item-title="name"
					placeholder="Raum"
					:menu-props="{ attach: '#importCardForm' }"
				/>
				<VSelect
					v-model="selectedBoardId"
					:disabled="!selectedRoomId"
					:items="boards"
					item-value="id"
					placeholder="Bereich"
					:menu-props="{ attach: '#importCardForm' }"
				/>
				<VSelect
					v-model="selectedColumnId"
					:disabled="!selectedBoardId"
					:items="columns"
					item-value="id"
					placeholder="Abschnitt"
					:menu-props="{ attach: '#importCardForm' }"
				/>
			</VForm>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { ColumnResponse, RoomApiFactory, RoomBoardItemResponse } from "../../../../serverApi/v3/api";
import { useSafeTaskRunner } from "@/composables/async-tasks.composable";
import { useLoadingState } from "@/composables/loadingState";
import { $axios } from "@/utils/api";
import { COPY_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useBoardApi } from "@data-board";
import { useRoomsState } from "@data-room";
import { Dialog } from "@ui-dialog";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const copyModule = injectStrict(COPY_MODULE_KEY);

const router = useRouter();

const { isLoadingDialogOpen } = useLoadingState("Importiere Karte...");

const roomApi = RoomApiFactory(undefined, "/v3", $axios);
const { fetchBoardCall } = useBoardApi();
const { rooms, fetchRooms } = useRoomsState();

const { token } = defineProps<{
	token: string;
}>();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: true,
});

const selectedRoomId = ref<string>();
const boards = ref<Array<RoomBoardItemResponse>>();
const selectedBoardId = ref<string>();
const columns = ref<Array<ColumnResponse>>();
const selectedColumnId = ref<string>();

const onConfirm = async () => {
	isLoadingDialogOpen.value = true;

	const shareTokenInfo = await copyModule.validateShareToken(token);

	const { run } = useSafeTaskRunner(() =>
		copyModule.copyByShareToken({
			token: shareTokenInfo.token,
			type: shareTokenInfo.parentType,
			newName: shareTokenInfo.parentName,
			destinationId: selectedColumnId.value,
		})
	);

	await run();

	isLoadingDialogOpen.value = false;

	router.push("/boards/" + selectedBoardId.value);
};

const onCancel = () => {
	router.push("/rooms");
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
