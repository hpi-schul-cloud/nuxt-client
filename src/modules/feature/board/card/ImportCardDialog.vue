<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:message="t('components.molecules.import.card.options.title')"
		confirm-btn-lang-key="common.actions.import"
		:confirm-btn-disabled="!selectedColumnId"
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
					:placeholder="t('common.labels.room')"
					:menu-props="{ attach: '#importCardForm' }"
				/>
				<VSelect
					v-model="selectedBoardId"
					:disabled="!selectedRoomId"
					:items="boards"
					item-value="id"
					:placeholder="t('common.words.board')"
					:menu-props="{ attach: '#importCardForm' }"
				/>
				<VSelect
					v-model="selectedColumnId"
					:disabled="!selectedBoardId"
					:items="columns"
					item-value="id"
					:placeholder="t('components.boardSection')"
					:menu-props="{ attach: '#importCardForm' }"
				/>
			</VForm>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { ColumnResponse, RoomBoardItemResponse } from "../../../../serverApi/v3/api";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useLoadingState } from "@/composables/loadingState";
import { RoomItem } from "@/types/room/Room";
import { COPY_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifySuccess } from "@data-app";
import { useBoardApi } from "@data-board";
import { useRoomDetailsStore } from "@data-room";
import { Dialog } from "@ui-dialog";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const copyModule = injectStrict(COPY_MODULE_KEY);

const router = useRouter();

const { t } = useI18n();

const { isLoadingDialogOpen } = useLoadingState(t("components.molecules.import.options.loadingMessage"));

const { fetchBoardCall } = useBoardApi();
const { fetchBoardsOfRoom } = useRoomDetailsStore();

const { token } = defineProps<{
	token: string;
	rooms: Array<RoomItem>;
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

	const { execute } = useSafeAxiosTask();

	const { success } = await execute(
		() =>
			copyModule.copyByShareToken({
				token: shareTokenInfo.token,
				type: shareTokenInfo.parentType,
				newName: shareTokenInfo.parentName,
				destinationId: selectedColumnId.value,
			}),
		t("components.molecules.import.options.failure.backendError", {
			name: t("components.boardCard"),
		})
	);

	isLoadingDialogOpen.value = false;

	if (success) {
		router.push("/boards/" + selectedBoardId.value);

		notifySuccess(
			t("components.molecules.import.options.success", {
				name: t("components.boardCard"),
			})
		);
	}
};

const onCancel = () => {
	router.push("/rooms");
};

watch(selectedRoomId, async (newRoomId) => {
	if (newRoomId) {
		boards.value = await fetchBoardsOfRoom(newRoomId);
	}
});

watch(selectedBoardId, async (newBoardId) => {
	if (newBoardId) {
		const board = await fetchBoardCall(newBoardId);
		columns.value = board.columns;
	}
});
</script>
