<template>
	<SvsDialog
		v-model="isDialogOpen"
		:title="importCardTitle"
		confirm-btn-lang-key="common.actions.import"
		:confirm-btn-disabled="!selectedColumnId"
		data-testid="import-card-dialog"
		@confirm="onConfirm"
		@cancel="onCancel"
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
			<p class="mt-2" data-testid="import-card-dialog-question">
				{{ dialogQuestion }}
			</p>
			<VForm id="importCardForm" data-testid="import-card-form">
				<VSelect
					v-model="selectedRoomId"
					:items="availableDestinations"
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
					:disabled="!selectedRoomId"
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
					:disabled="!selectedBoardId"
					:items="columns"
					item-value="id"
					:label="t('components.molecules.label.column')"
					:placeholder="t('components.boardSection')"
					:menu-props="{ attach: '#importCardForm' }"
					data-testid="import-card-select-column"
				/>
			</VForm>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { ImportDestination, ImportDestinationItem, ImportDestinationType } from "./types";
import { useCopyContent } from "@/composables/copy-content.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { ShareTokenInfoResponse } from "@api-server";
import { useCardDialogData } from "@data-board";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
	shareTokenInfo: ShareTokenInfoResponse;
	availableDestinations: ImportDestinationItem[];
	destinationType: Extract<ImportDestinationType, "column">;
}>();

const emit = defineEmits<{
	(e: "confirm", payload: { newName: string; destination?: ImportDestination }): void;
	(e: "cancel"): void;
}>();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const { selectedBoardId, selectedColumnId, selectedRoomId, resetBoardSelection, columns, boards } =
	useCardDialogData(isDialogOpen);

const onConfirm = () => {
	emit("confirm", {
		newName: props.shareTokenInfo.parentName,
		destination: { type: props.destinationType, id: selectedColumnId.value!, boardId: selectedBoardId.value! },
	});
};

const onCancel = () => {
	emit("cancel");
};

const importCardTitle = computed(() =>
	t(`components.molecules.import.${props.shareTokenInfo.parentType}.options.title`)
);

const dialogQuestion = computed(() => {
	const cardName = props.shareTokenInfo.parentName;
	return t("components.molecules.import.card.question", {
		title: cardName ? ` "${cardName}"` : "",
	});
});

const { text, warnings } = useCopyContent(ContentItemTypeEnum.Card);
</script>
