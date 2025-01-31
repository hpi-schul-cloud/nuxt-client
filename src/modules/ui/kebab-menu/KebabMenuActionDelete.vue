<template>
	<KebabMenuAction
		:icon="mdiTrashCanOutline"
		data-testid="kebab-menu-action-delete"
		@click="onClick"
	>
		{{ t("components.board.action.delete") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import type { MessageSchema } from "@/locales/schema";
import { mdiTrashCanOutline } from "@icons/material";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { useI18n } from "vue-i18n";
import KebabMenuAction from "./KebabMenuAction.vue";
import { PropType } from "vue";
const { t } = useI18n();

const props = defineProps({
	name: { type: String, required: false },
	scopeLanguageKey: {
		type: String as PropType<keyof MessageSchema>,
		required: true,
	},
	skipDeleteConfirmation: { type: Boolean, default: () => false },
});

const emit = defineEmits(["click"]);

const { askDeleteConfirmation } = useDeleteConfirmationDialog();

// const languageKeyForScopeType: Record<BoardMenuScope, keyof MessageSchema> = {
// 	[BoardMenuScope.BOARD]: "components.board",
// 	[BoardMenuScope.COLUMN]: "components.boardColumn",
// 	[BoardMenuScope.CARD]: "components.boardCard",
// 	[BoardMenuScope.COLLABORATIVE_TEXT_EDITOR_ELEMENT]:
// 		"components.cardElement.collaborativeTextEditorElement",
// 	[BoardMenuScope.DRAWING_ELEMENT]: "components.cardElement.drawingElement",
// 	[BoardMenuScope.EXTERNAL_TOOL_ELEMENT]:
// 		"components.cardElement.externalToolElement",
// 	[BoardMenuScope.FILE_ELEMENT]: "components.cardElement.fileElement",
// 	[BoardMenuScope.LINK_ELEMENT]: "components.cardElement.LinkElement",
// 	[BoardMenuScope.SUBMISSION_ELEMENT]:
// 		"components.cardElement.submissionElement",
// 	[BoardMenuScope.DELETED_ELEMENT]: "components.cardElement.deletedElement",
// 	[BoardMenuScope.MEDIA_EXTERNAL_TOOL_ELEMENT]:
// 		"components.cardElement.mediaExternalToolElement",
// 	[BoardMenuScope.VIDEO_CONFERENCE_ELEMENT]:
// 		"components.cardElement.videoConferenceElement",
// };

const onClick = (): void => {
	const promise = askDeleteConfirmation(props.name, props.scopeLanguageKey);

	emit("click", promise);
};
</script>
