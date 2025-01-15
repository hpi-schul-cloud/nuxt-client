<template>
	<BoardMenuAction :icon="mdiLink" data-testid="board-menu-action-share-link">
		{{ $t(actionName) }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { MessageSchema } from "@/locales/schema";
import { injectStrict } from "@/utils/inject";
import { mdiLink } from "@icons/material";
import { BoardMenuAction, BoardMenuScope } from "@ui-board";
import { computed } from "vue";
import { MENU_SCOPE } from "./injection-tokens";

const scope = injectStrict<BoardMenuScope>(MENU_SCOPE);

const actionNameTranslationKeyMap: Partial<
	Record<BoardMenuScope, keyof MessageSchema>
> = {
	[BoardMenuScope.CARD]: "components.board.action.shareLink.card",
};

const actionName = computed(() => {
	return actionNameTranslationKeyMap[scope] ?? "common.actions.share";
});
</script>
