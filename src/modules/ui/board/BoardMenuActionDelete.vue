<template>
	<BoardMenuAction
		:icon="mdiTrashCanOutline"
		data-testid="board-menu-action-delete"
		@click="onClick"
	>
		{{ $t("components.board.action.delete") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { MENU_SCOPE } from "./injection-tokens";
import { injectStrict } from "@/utils/inject";
import { mdiTrashCanOutline } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { BoardMenuScope } from "./board-menu-scope";

const props = defineProps({
	name: { type: String, required: false },
	skipDeleteConfirmation: { type: Boolean, default: () => false },
});

const emit = defineEmits(["click"]);

const scope = injectStrict<BoardMenuScope>(MENU_SCOPE);
const { askDeleteConfirmation } = useDeleteConfirmationDialog();

const languageKeyForScopeType: Record<BoardMenuScope, string> = {
	board: "components.board",
	column: "components.boardColumn",
	card: "components.boardCard",
	collaborativeTextEditorElement:
		"components.cardElement.collaborativeTextEditorElement",
	drawingElement: "components.cardElement.drawingElement",
	externalToolElement: "components.cardElement.externalToolElement",
	fileElement: "components.cardElement.fileElement",
	linkElement: "components.cardElement.LinkElement",
	submissionElement: "components.cardElement.submissionElement",
};

const onClick = (): void => {
	const promise = askDeleteConfirmation(
		props.name,
		languageKeyForScopeType[scope]
	);

	emit("click", promise);
};
</script>
