<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:loading="isImporting"
		:message="t('components.molecules.import.card.options.title')"
		confirm-btn-lang-key="common.actions.import"
		:confirm-btn-disabled="!selectedColumnId"
		@confirm="onConfirm"
		@cancel="onCancel"
	>
		<template #content>
			<InfoAlert data-testid="import-card-information">
				{{ t("components.molecules.import.card.hint.restriction") }}
				<ul class="ml-6">
					<li>{{ t("components.molecules.import.card.hint.etherpad") }}</li>
					<li>{{ t("components.molecules.import.card.hint.whiteboard") }}</li>
					<li>{{ t("components.molecules.import.card.hint.ctltools") }}</li>
				</ul>
			</InfoAlert>

			<p class="text-lg mt-2">
				{{ t("components.molecules.import.card.question") }}
			</p>

			<VForm id="importCardForm" data-testid="import-card-form">
				<VSelect
					v-model="selectedRoomId"
					:items="rooms"
					:disabled="isImporting"
					item-value="id"
					item-title="name"
					:label="t('components.molecules.label.room')"
					:placeholder="t('common.labels.room')"
					:menu-props="{ attach: '#importCardForm' }"
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
				/>
			</VForm>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useCardDialogData } from "./card-dialog-composable";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { RoomItem } from "@/types/room/Room";
import { COPY_MODULE_KEY, injectStrict } from "@/utils/inject";
import { notifySuccess } from "@data-app";
import { InfoAlert } from "@ui-alert";
import { Dialog } from "@ui-dialog";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const copyModule = injectStrict(COPY_MODULE_KEY);
const router = useRouter();
const { t } = useI18n();

const props = defineProps<{
	token: string;
	rooms: Array<RoomItem>;
}>();

const { selectedBoardId, selectedColumnId, selectedRoomId, resetBoardSelection, columns, boards } = useCardDialogData();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const { execute, isRunning: isImporting } = useSafeAxiosTask();

const onConfirm = async () => {
	const { success } = await execute(
		async () => {
			const shareTokenInfo = await copyModule.validateShareToken(props.token);
			await copyModule.copyByShareToken({
				token: shareTokenInfo.token,
				type: shareTokenInfo.parentType,
				newName: shareTokenInfo.parentName,
				destinationId: selectedColumnId.value,
			});
		},
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
