<template>
	<VMenu location="bottom end" min-width="250">
		<template v-slot:activator="{ props }">
			<VBtn
				variant="text"
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
					{{ t(boardMenuAriaLabel) }}
				</span>
			</VBtn>
		</template>
		<VList role="menu">
			<slot :scope="scope" />
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import { mdiDotsVertical } from "@mdi/js";
import { computed, PropType, provide, toRef } from "vue";
import { BoardMenuScope } from "./board-menu-scope";
import { MENU_SCOPE } from "./injection-tokens";
import { useI18n } from "vue-i18n";

const props = defineProps({
	scope: {
		type: String as PropType<BoardMenuScope>,
		required: true,
	},
	dataTestid: {
		type: String,
		default: "board-menu-button",
	},
});

const scope = toRef(props, "scope");
provide(MENU_SCOPE, scope.value);

const { t } = useI18n();

const ariaLabelForScope: Record<BoardMenuScope, string> = {
	board: "components.board.menu.board",
	column: "components.board.menu.column",
	card: "components.board.menu.card",
	collaborativeTextEditorElement:
		"components.board.menu.collaborativeTextEditorElement",
	drawingElement: "components.board.menu.drawingElement",
	externalToolElement: "components.board.menu.externalToolElement",
	fileElement: "components.board.menu.fileElement",
	linkElement: "components.board.menu.linkElement",
	submissionElement: "components.board.menu.submissionElement",
};

const boardMenuAriaLabel = computed(() => {
	return ariaLabelForScope[scope.value];
});

const BOARD_SCOPES_WITH_BACKGROUND: Array<BoardMenuScope> = [
	"card",
	"collaborativeTextEditorElement",
	"drawingElement",
	"externalToolElement",
	"fileElement",
	"linkElement",
	"submissionElement",
];

const hasBackground = computed<boolean>(() =>
	BOARD_SCOPES_WITH_BACKGROUND.includes(scope.value)
);
</script>

<style scoped>
.v-list {
	width: max-content;
}
</style>
