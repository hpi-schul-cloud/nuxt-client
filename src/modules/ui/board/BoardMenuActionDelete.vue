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

const getLanguageKeyTypeName = (scope: string) => {
	switch (scope) {
		case "column":
			return "components.boardColumn";
		case "card":
			return "components.boardCard";
		case "element":
			return "components.boardElement";
		default:
			return "components.board";
	}
};

const onClick = (): void => {
	const promise = askDeleteConfirmation(
		props.name,
		getLanguageKeyTypeName(scope)
	);

	emit("click", promise);
};
</script>
