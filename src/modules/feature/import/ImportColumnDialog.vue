<template>
	<SvsDialog
		v-model="isDialogOpen"
		is-open-state-managed-externally
		:title="importColumnTitle"
		confirm-btn-lang-key="common.actions.import"
		:confirm-btn-disabled="!selectedBoardId"
		data-testid="import-column-dialog"
		@confirm="onConfirm"
		@cancel="onCancel"
		@after-leave="emit('after-leave')"
	>
		<template #content>
			<WarningAlert v-if="availableDestinations.length === 0" class="mb-2">
				{{ t("common.alerts.room.not.available") }}
			</WarningAlert>
			<p>
				{{ text }}
			</p>
			<WarningAlert v-if="warnings.length > 0" class="mb-4">
				<p class="mb-1">
					{{ t("feature-copy.copyInfo.text.alert.followingContent") }}
				</p>
				<ul class="ml-6">
					<li v-for="warning in warnings" :key="warning.testId" :data-testid="warning.testId">
						{{ warning.text }}
					</li>
				</ul>
			</WarningAlert>
			<p class="mt-2" data-testid="import-column-dialog-question">
				{{ dialogQuestion }}
			</p>
			<VForm id="importColumnForm" data-testid="import-column-form">
				<VSelect
					v-model="selectedRoomId"
					:items="availableDestinations"
					item-value="id"
					item-title="name"
					:label="t('components.molecules.label.room')"
					:placeholder="t('common.labels.room')"
					:menu-props="{ attach: '#importColumnForm' }"
					data-testid="import-column-select-room"
					@update:menu="resetBoardSelection"
				/>
				<VSelect
					v-model="selectedBoardId"
					:disabled="!selectedRoomId"
					:items="boards"
					item-value="id"
					:label="t('components.molecules.label.board')"
					:placeholder="t('common.words.board')"
					:menu-props="{ attach: '#importColumnForm' }"
					data-testid="import-column-select-board"
				/>
			</VForm>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { useImportContent } from "@/composables/copy-content.composable";
import { RoomBoardItemResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { useRoomDetailsStore } from "@data-room";
import { ImportColumnDialogProps, ImportColumnDialogResult } from "@feature-dialog";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<ImportColumnDialogProps>();
const availableDestinations = computed(() => props.availableDestinations);
const emit = defineEmits<{
	complete: [result: ImportColumnDialogResult];
	cancel: [];
	"after-leave": [];
}>();

const isDialogOpen = defineModel<boolean>({ default: false });

const selectedRoomId = ref<string | undefined>(undefined);
const selectedBoardId = ref<string | undefined>(undefined);
const boards = ref<RoomBoardItemResponse[]>();

watchEffect(async () => {
	if (isDialogOpen.value && selectedRoomId.value) {
		boards.value = (await useRoomDetailsStore().fetchBoardsOfRoom(selectedRoomId.value)).boards;
	}
});

const resetBoardSelection = () => {
	selectedBoardId.value = undefined;
};

const onConfirm = () => {
	emit("complete", {
		newName: props.shareTokenInfo.parentName,
		destinations: [{ type: "board", id: selectedBoardId.value! }],
	});
};

const onCancel = () => {
	emit("cancel");
};

const importColumnTitle = computed(() => t("components.molecules.import.column.options.title"));

const dialogQuestion = computed(() => {
	const columnName = props.shareTokenInfo.parentName;
	return t("components.molecules.import.column.question", {
		title: columnName ? ` "${columnName}"` : "",
	});
});

const { text, warnings } = useImportContent(ref(ShareTokenInfoResponseParentType.COLUMN));
</script>
