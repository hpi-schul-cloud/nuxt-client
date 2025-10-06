<template>
	<KebabMenuAction :icon="mdiLink" data-testid="board-menu-action-share-link">
		{{ $t(actionName) }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { MessageSchema } from "@/locales/schema";
import { mdiLink } from "@icons/material";
import { BoardMenuScope } from "@ui-board";
import { computed, PropType } from "vue";

const props = defineProps({
	scope: { type: String as PropType<BoardMenuScope>, required: true },
});

const actionNameTranslationKeyMap: Partial<Record<BoardMenuScope, keyof MessageSchema>> = {
	[BoardMenuScope.CARD]: "components.board.action.shareLink.card",
};

const actionName = computed(() => actionNameTranslationKeyMap[props.scope] ?? "common.actions.shareLink");
</script>
