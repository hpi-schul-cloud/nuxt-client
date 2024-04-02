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
				<VIcon data-testid="board-menu-icon" class="text-grey-darken-2">{{
					mdiDotsVertical
				}}</VIcon>
				<span data-testid="board-menu-screen-reader-only" class="d-sr-only">
					<template v-if="scope === 'board'">
						{{ $t("components.board.menu.board") }}
					</template>
					<template v-if="scope === 'column'">
						{{ $t("components.board.menu.column") }}
					</template>
					<template v-if="scope === 'card'">
						{{ $t("components.board.menu.card") }}
					</template>
					<template v-if="scope === 'element'">
						{{ $t("components.board.menu.element") }}
					</template>
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

const hasBackground = computed<boolean>(
	() => scope.value === "card" || scope.value === "element"
);
</script>
