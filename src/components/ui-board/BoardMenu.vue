<template>
	<VMenu location="bottom end" min-width="250">
		<template v-slot:activator="{ props }">
			<VBtn
				variant="text"
				data-testid="board-menu-button"
				v-bind="props"
				:ripple="false"
				:class="{ white: hasBackground }"
				icon
				@dblclick.stop="() => {}"
				@keydown.enter.stop
				@keydown.left.right.up.down.stop="() => {}"
				style="height: 36px; width: 36px"
			>
				<VIcon data-testid="board-menu-icon">{{ mdiDotsVertical }}</VIcon>
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
		<VList>
			<slot :scope="scope" />
		</VList>
	</VMenu>
</template>

<script lang="ts">
import { mdiDotsVertical } from "@mdi/js";
import { computed, defineComponent, PropType, provide, toRef } from "vue";
import { BoardMenuScope } from "./board-menu-scope";
import { MENU_SCOPE, MENU_HANDLER } from "./injection-tokens";
import { MenuEvent } from "./BoardMenuEvent.enum";

export default defineComponent({
	name: "BoardMenu",
	props: {
		scope: {
			type: String as PropType<BoardMenuScope>,
			required: true,
		},
	},
	emits: Object.values(MenuEvent),
	setup(props, { emit }) {
		const scope = toRef(props, "scope");
		provide(MENU_SCOPE, scope.value);

		// VUE3_UPGRADE When using a confirmation dialog we have to delegate the emitting of the menu event to the menu.
		// The reason is that Vuetify disposes the menu overlay content after the VMenu was closed. That will also
		// dispose all menu items (actions) so that they will not be able to pass any events anymore.
		// Solves BC-5938, BC-5948, BC-5949. Hopefully we will find a better solution
		const emitMenuEvent = (event: MenuEvent) => {
			emit(event);
		};

		provide(MENU_HANDLER, emitMenuEvent);

		const hasBackground = computed<boolean>(
			() => scope.value === "card" || scope.value === "element"
		);

		return {
			hasBackground,
			mdiDotsVertical,
		};
	},
});
</script>
