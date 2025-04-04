<template>
	<VMenu location="bottom end" min-width="250">
		<template #activator="{ props: menuProps }">
			<VBtn
				v-bind="menuProps"
				:variant="variant"
				:data-testid="dataTestid"
				:ripple="false"
				:class="{ 'bg-white': hasBackground }"
				icon
				size="36"
				@click.stop.prevent="() => {}"
				@dblclick.stop.prevent="() => {}"
				@keydown.enter.stop
				@keydown.left.right.up.down.stop="() => {}"
			>
				<VIcon data-testid="board-menu-icon">{{ mdiDotsVertical }}</VIcon>
				<span data-testid="board-menu-screen-reader-only" class="d-sr-only">
					{{ t(boardMenuAriaLabel) }}
				</span>
			</VBtn>
		</template>
		<KebabMenuList>
			<slot :scope="scope" />
		</KebabMenuList>
	</VMenu>
</template>

<script setup lang="ts">
import type { MessageSchema } from "@/locales/schema";
import { mdiDotsVertical } from "@icons/material";
import { computed, PropType } from "vue";
import { BoardMenuScope } from "./board-menu-scope";
import { useI18n } from "vue-i18n";
import { KebabMenuList } from "@ui-kebab-menu";

const { t } = useI18n();

const props = defineProps({
	variant: {
		type: String as PropType<"text" | "outlined">,
		default: "text",
	},
	scope: {
		type: String as PropType<BoardMenuScope>,
		required: true,
	},
	hasBackground: {
		type: Boolean,
		default: false,
	},
	dataTestid: {
		type: String,
		default: "board-menu-button",
	},
});

const ariaLabelForScope: Record<BoardMenuScope, keyof MessageSchema> = {
	[BoardMenuScope.BOARD]: "components.board.menu.board",
	[BoardMenuScope.COLUMN]: "components.board.menu.column",
	[BoardMenuScope.CARD]: "components.board.menu.card",
	[BoardMenuScope.COLLABORATIVE_TEXT_EDITOR_ELEMENT]:
		"components.board.menu.collaborativeTextEditorElement",
	[BoardMenuScope.DRAWING_ELEMENT]: "components.board.menu.drawingElement",
	[BoardMenuScope.EXTERNAL_TOOL_ELEMENT]:
		"components.board.menu.externalToolElement",
	[BoardMenuScope.FILE_ELEMENT]: "components.board.menu.fileElement",
	[BoardMenuScope.LINK_ELEMENT]: "components.board.menu.linkElement",
	[BoardMenuScope.SUBMISSION_ELEMENT]:
		"components.board.menu.submissionElement",
	[BoardMenuScope.DELETED_ELEMENT]: "components.board.menu.deletedElement",
	[BoardMenuScope.MEDIA_EXTERNAL_TOOL_ELEMENT]:
		"components.board.menu.mediaExternalToolElement",
	[BoardMenuScope.AUDIO_RECORD_ELEMENT]:
		"components.board.menu.audioRecordElement",
};

const boardMenuAriaLabel = computed(() => {
	return ariaLabelForScope[props.scope];
});
</script>

<style scoped>
.v-list {
	width: max-content;
}
</style>
