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
import type { MessageSchema } from "@/locales/schema";
import { injectStrict } from "@/utils/inject";
import { mdiTrashCanOutline } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { BoardMenuScope } from "./board-menu-scope";
import { MENU_SCOPE } from "./injection-tokens";

const props = defineProps({
	name: { type: String, required: false },
	skipDeleteConfirmation: { type: Boolean, default: () => false },
});

const emit = defineEmits(["click"]);

const scope = injectStrict<BoardMenuScope>(MENU_SCOPE);
const { askDeleteConfirmation } = useDeleteConfirmationDialog();

const languageKeyForScopeType: Record<BoardMenuScope, keyof MessageSchema> = {
	[BoardMenuScope.BOARD]: "components.board",
	[BoardMenuScope.COLUMN]: "components.boardColumn",
	[BoardMenuScope.CARD]: "components.boardCard",
	[BoardMenuScope.COLLABORATIVE_TEXT_EDITOR_ELEMENT]:
		"components.cardElement.collaborativeTextEditorElement",
	[BoardMenuScope.DRAWING_ELEMENT]: "components.cardElement.drawingElement",
	[BoardMenuScope.EXTERNAL_TOOL_ELEMENT]:
		"components.cardElement.externalToolElement",
	[BoardMenuScope.FILE_ELEMENT]: "components.cardElement.fileElement",
	[BoardMenuScope.LINK_ELEMENT]: "components.cardElement.LinkElement",
	[BoardMenuScope.SUBMISSION_ELEMENT]:
		"components.cardElement.submissionElement",
	[BoardMenuScope.DELETED_ELEMENT]: "components.cardElement.deletedElement",
	[BoardMenuScope.MEDIA_EXTERNAL_TOOL_ELEMENT]:
		"components.cardElement.mediaExternalToolElement",
	[BoardMenuScope.VIDEO_CONFERENCE_ELEMENT]:
		"components.cardElement.videoConferenceElement",
};

const onClick = (): void => {
	const promise = askDeleteConfirmation(
		props.name,
		languageKeyForScopeType[scope]
	);

	emit("click", promise);
};
</script>
