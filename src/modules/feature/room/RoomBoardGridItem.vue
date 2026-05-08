<template>
	<VCard
		class="room-content-grid-item d-flex flex-column"
		:class="isDraft ? 'bg-white' : 'bg-surface-light'"
		:variant="isDraft ? 'outlined' : 'flat'"
		:data-testid="`board-grid-item-${index}`"
		:ripple="false"
	>
		<VCardSubtitle
			class="mt-4 d-flex align-center"
			:class="{ 'opacity-80': isDraft }"
			:data-testid="`board-grid-item-subtitle-${index}`"
		>
			<VIcon size="14" class="mr-1" :icon="subtitleIcon" />
			{{ subtitleText }}
		</VCardSubtitle>
		<VCardTitle
			:class="{ 'opacity-80': isDraft }"
			class="grid-item-card-title text-body-1 font-weight-bold flex-grow-1"
			:data-testid="`board-grid-title-${index}`"
		>
			<RouterLink tabindex="-1" :to="boardPath" class="grid-item-router-link text-break">
				{{ board.title }}
			</RouterLink>
		</VCardTitle>

		<KebabMenu v-if="!hasAnyAllowedOperation" class="board-grid-item-menu" :data-testid="`board-dot-menu-${index}`">
			<KebabMenuActionPublish v-if="!allowedOperations.updateBoardVisibility && isDraft" @click="onPublish" />
			<KebabMenuActionRevert v-if="!allowedOperations.updateBoardVisibility && !isDraft" @click="onRevert" />
			<KebabMenuActionDuplicate v-if="!allowedOperations.copyBoard" @click="onDuplicate" />
			<KebabMenuActionDelete v-if="!allowedOperations.deleteBoard" @click="onDelete" />
		</KebabMenu>

		<VCardActions class="justify-end pr-4">
			<VBtn
				:data-testid="`board-open-button-${index}`"
				variant="text"
				color="primary"
				:to="boardPath"
				:aria-label="`${subtitleText}: ${board.title}`"
			>
				{{ t("pages.room.boardCard.label.openItem") }}
			</VBtn>
		</VCardActions>
	</VCard>
</template>

<script setup lang="ts">
import { BoardLayout } from "@/types/board/Board";
import { RoomBoardItem } from "@/types/room/Room";
import { useBoardAllowedOperations } from "@data-board";
import { mdiViewAgendaOutline, mdiViewDashboardOutline } from "@icons/material";
import {
	KebabMenu,
	KebabMenuActionDelete,
	KebabMenuActionDuplicate,
	KebabMenuActionPublish,
	KebabMenuActionRevert,
} from "@ui-kebab-menu";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	roomId: { type: String, required: true },
	board: { type: Object as PropType<RoomBoardItem>, required: true },
	index: { type: Number, required: true },
});

const { t } = useI18n();
const { allowedOperations } = useBoardAllowedOperations();

const emit = defineEmits<{
	"update:visibility": [boardId: string, isVisible: boolean];
	"delete:board": [boardId: string, boardTitle: string];
	"duplicate:board": [boardId: string];
}>();

const hasAnyAllowedOperation = computed(() => {
	const { copyBoard, deleteBoard, updateBoardVisibility } = allowedOperations.value;
	return copyBoard || deleteBoard || updateBoardVisibility;
});

const onPublish = () => {
	emit("update:visibility", props.board.id, true);
};

const onRevert = () => {
	emit("update:visibility", props.board.id, false);
};

const onDelete = () => {
	emit("delete:board", props.board.id, props.board.title);
};

const onDuplicate = async () => {
	emit("duplicate:board", props.board.id);
};

const isListBoard = computed(() => props.board.layout === BoardLayout.LIST);

const isDraft = computed(() => props.board.isVisible === false);

const subtitleIcon = computed(() => (isListBoard.value ? mdiViewAgendaOutline : mdiViewDashboardOutline));

const subtitleText = computed(() => {
	const text = isListBoard.value
		? t("pages.room.boardCard.label.listBoard")
		: t("pages.room.boardCard.label.columnBoard");

	if (isDraft.value) {
		const suffix = ` - ${t("common.words.draft")}`;
		return text + suffix;
	}

	return text;
});

const boardPath = computed(() => `/boards/${props.board.id}`);
</script>
<style>
.room-content-grid-item:focus-within {
	outline: auto;
}

.grid-item-card-title {
	max-width: max-content;
	line-height: 1.5 !important;
}

.grid-item-router-link {
	text-decoration: none;
	color: inherit;
	white-space: normal;
}

.grid-item-router-link:hover {
	text-decoration: underline;
}

.board-grid-item-menu {
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
	z-index: var(--z-elevated);
}
</style>
