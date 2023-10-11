<template>
	<VMenu offset-y left min-width="250">
		<template v-slot:activator="{ on, attrs }">
			<VBtn
				data-testid="board-menu-button"
				v-bind="attrs"
				v-on="on"
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
					<template v-if="scope === 'board'">{{
						$t("components.board.menu.board")
					}}</template>
					<template v-if="scope === 'column'">{{
						$t("components.board.menu.column")
					}}</template>
					<template v-if="scope === 'card'">{{
						$t("components.board.menu.card")
					}}</template>
					<template v-if="scope === 'element'">{{
						$t("components.board.menu.element")
					}}</template>
				</span>
			</VBtn>
		</template>
		<VList>
			<slot :scope="scope"></slot>
		</VList>
	</VMenu>
</template>

<script lang="ts">
import { mdiDotsVertical } from "@mdi/js";
import { computed, defineComponent, PropType, provide } from "vue";
import { BoardMenuScope } from "./board-menu-scope";
import { MENU_SCOPE } from "./injection-tokens";

export default defineComponent({
	name: "BoardMenu",
	props: {
		scope: {
			type: String as PropType<BoardMenuScope>,
			required: true,
		},
	},
	setup(props) {
		provide(MENU_SCOPE, props.scope);

		const hasBackground = computed<boolean>(
			() => props.scope === "card" || props.scope === "element"
		);

		return {
			hasBackground,
			mdiDotsVertical,
		};
	},
});
</script>
