<template>
	<VMenu location="bottom end" min-width="250">
		<template v-slot:activator="{ props }">
			<VBtn
				:variant="variant"
				:data-testid="dataTestid"
				v-bind="props"
				:ripple="false"
				:class="{ 'bg-white': hasBackground }"
				icon
				@click.stop.prevent="() => {}"
				@dblclick.stop.prevent="() => {}"
				@keydown.enter.stop
				@keydown.left.right.up.down.stop="() => {}"
				size="small"
				style="height: 36px; width: 36px"
			>
				<VIcon data-testid="board-menu-icon">{{ mdiDotsVertical }}</VIcon>
				<span data-testid="board-menu-screen-reader-only" class="d-sr-only">
					{{ $t(boardMenuAriaLabel) }}
				</span>
			</VBtn>
		</template>
		<VList role="menu">
			<slot :scope="scope" />
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import type { MessageSchema } from "@/locales/schema";
import { mdiDotsVertical } from "@icons/material";
import { computed, PropType, provide, toRef } from "vue";
import { BoardMenuScope } from "./board-menu-scope";
import { MENU_SCOPE } from "./injection-tokens";

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

const scope = toRef(props, "scope");
provide(MENU_SCOPE, scope.value);

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
};

const boardMenuAriaLabel = computed(() => {
	return ariaLabelForScope[scope.value];
});
</script>

<style scoped>
.v-list {
	width: max-content;
}
</style>
