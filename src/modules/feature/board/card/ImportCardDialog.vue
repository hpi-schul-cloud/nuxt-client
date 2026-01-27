<template>
	<SCDialog
		v-model="isDialogOpen"
		:is-loading="isImporting"
		title="components.molecules.import.card.options.title"
		confirm-btn-lang-key="common.actions.import"
		:confirm-btn-disabled="!selectedColumnId"
		data-testid="import-card-dialog"
		@confirm="onConfirm"
		@cancel="onCancel"
	>
		<template #content>
			<WarningAlert v-if="availableRooms?.length === 0" class="mb-2">
				{{ t("common.alerts.room.not.available") }}
			</WarningAlert>
			<InfoAlert data-testid="import-card-information">
				{{ t("components.molecules.import.card.hint.restriction") }}
				<ul class="ml-6">
					<li>{{ t("components.molecules.import.card.hint.etherpad") }}</li>
					<li>{{ t("components.molecules.import.card.hint.whiteboard") }}</li>
					<li>{{ t("components.molecules.import.card.hint.ctltools") }}</li>
				</ul>
			</InfoAlert>
			<p class="text-lg mt-2" data-testid="import-card-dialog-question">
				{{ dialogQuestion }}
			</p>
			<VForm id="importCardForm" data-testid="import-card-form">
				<VSelect
					v-model="selectedRoomId"
					:items="availableRooms"
					:disabled="isImporting"
					item-value="id"
					item-title="name"
					:label="t('components.molecules.label.room')"
					:placeholder="t('common.labels.room')"
					:menu-props="{ attach: '#importCardForm' }"
					data-testid="import-card-select-room"
					@update:menu="resetBoardSelection"
				/>
				<VSelect
					v-model="selectedBoardId"
					:disabled="!selectedRoomId || isImporting"
					:items="boards"
					item-value="id"
					:label="t('components.molecules.label.board')"
					:placeholder="t('common.words.board')"
					:menu-props="{ attach: '#importCardForm' }"
					data-testid="import-card-select-board"
					@update:menu="selectedColumnId = undefined"
				/>
				<VSelect
					v-model="selectedColumnId"
					:disabled="!selectedBoardId || isImporting"
					:items="columns"
					item-value="id"
					:label="t('components.molecules.label.section')"
					:placeholder="t('components.boardSection')"
					:menu-props="{ attach: '#importCardForm' }"
					data-testid="import-card-select-column"
				/>
			</VForm>
		</template>
	</SCDialog>
</template>

<script setup lang="ts">
import { useCardDialogData } from "./card-dialog-composable";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { Permission, ShareTokenInfoResponse } from "@/serverApi/v3";
import { RoomItem } from "@/types/room/Room";
import { COPY_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifySuccess } from "@data-app";
import { useRoomStore } from "@data-room";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SCDialog } from "@ui-dialog";
import { sortBy } from "lodash-es";
import { computed, onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const copyModule = injectStrict(COPY_MODULE_KEY);
const router = useRouter();
const { t } = useI18n();

const props = defineProps<{ token: string }>();
const rooms = ref<RoomItem[]>();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const availableRooms = computed(() =>
	sortBy(
		rooms.value?.filter((room) => room.permissions.includes(Permission.RoomEditContent)),
		(r) => r.name
	)
);

onBeforeMount(async () => {
	const result = await useRoomStore().fetchRoomsPlain();
	rooms.value = result?.data?.data;
});

const { execute, isRunning: isImporting } = useSafeAxiosTask();
const { selectedBoardId, selectedColumnId, selectedRoomId, resetBoardSelection, columns, boards } =
	useCardDialogData(isDialogOpen);
const shareTokenInfo = ref<ShareTokenInfoResponse>();

onBeforeMount(async () => {
	const { result, success } = await execute(
		async () => await copyModule.validateShareToken(props.token),
		t("components.molecules.import.options.failure.backendError", {
			name: t("components.boardCard"),
		})
	);

	if (success) {
		shareTokenInfo.value = result;
	} else {
		isDialogOpen.value = false;
		onCancel();
	}
});

const dialogQuestion = computed(() => {
	const cardName = shareTokenInfo.value?.parentName;
	return t("components.molecules.import.card.question", {
		title: cardName ? ` "${cardName}"` : "",
	});
});

const onConfirm = async () => {
	const { success } = await execute(
		async () =>
			await copyModule.copyByShareToken({
				token: shareTokenInfo.value!.token,
				type: shareTokenInfo.value!.parentType,
				newName: shareTokenInfo.value!.parentName,
				destinationId: selectedColumnId.value,
			}),
		t("components.molecules.import.options.failure.backendError", {
			name: t("components.boardCard"),
		})
	);

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
</script>
