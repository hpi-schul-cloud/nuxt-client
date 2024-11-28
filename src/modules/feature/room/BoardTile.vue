<template>
	<VCard
		class="bg-grey-lighten-5"
		:class="{ 'bg-white opacity-70': isDraft }"
		variant="outlined"
		draggable="false"
		:data-testid="`board-tile-${props.index}`"
		:to="boardPath"
	>
		<VCardSubtitle
			class="mt-4 d-flex align-center"
			:data-testid="`board-tile-subtitle-${props.index}`"
		>
			<VIcon size="14" class="mr-1" :icon="subtitleIcon" />
			{{ subtitleText }}
		</VCardSubtitle>
		<VTooltip :text="board.title">
			<template v-slot:activator="{ props }">
				<VCardTitle
					v-bind="props"
					class="board-tile-title text-body-1 font-weight-bold my-2"
					:data-testid="`board-tile-title-${props.index}`"
				>
					{{ board.title }}
				</VCardTitle>
			</template>
		</VTooltip>
	</VCard>
</template>

<script setup lang="ts">
import { BoardLayout } from "@/serverApi/v3";
import { RoomBoardItem } from "@/types/room/Room";
import { mdiViewAgendaOutline, mdiViewDashboardOutline } from "@icons/material";
import { computed, PropType, toRef } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	board: { type: Object as PropType<RoomBoardItem>, required: true },
	index: { type: Number, required: true },
});

const { t } = useI18n();

const board = toRef(props, "board");

const isListBoard = computed(() => {
	return board.value?.layout === BoardLayout.List;
});

const isDraft = computed(() => {
	return board.value?.isVisible === false;
});

const subtitleIcon = computed(() => {
	const icon = isListBoard.value
		? mdiViewAgendaOutline
		: mdiViewDashboardOutline;
	return icon;
});

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

const boardPath = computed(() => {
	return `/boards/${board.value.id}`;
});
</script>
