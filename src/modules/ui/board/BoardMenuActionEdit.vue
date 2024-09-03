<template>
	<BoardMenuAction
		:icon="editIcon"
		data-testid="board-menu-action-edit"
		@click="onClick"
	>
		{{ actionName }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import {
	mdiPencilOutline,
	mdiRenameOutline,
} from "@/components/icons/material";
import { injectStrict } from "@/utils/inject";
import { BoardMenuAction, BoardMenuScope } from "@ui-board";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { MENU_SCOPE } from "./injection-tokens";

defineProps({
	skipDeleteConfirmation: { type: Boolean, default: () => false },
});

const emit = defineEmits(["click"]);

const { t } = useI18n();
const scope = injectStrict<BoardMenuScope>(MENU_SCOPE);

const onClick = ($event: Event) => emit("click", $event);

const editIcon = computed(() =>
	scope === BoardMenuScope.CARD ? mdiPencilOutline : mdiRenameOutline
);

const actionName = computed(() =>
	scope === BoardMenuScope.CARD
		? t("common.actions.edit")
		: t("common.actions.rename")
);
</script>
