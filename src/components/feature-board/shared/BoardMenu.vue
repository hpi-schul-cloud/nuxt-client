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
			<slot></slot>
		</VList>
	</VMenu>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import { mdiDotsVertical } from "@mdi/js";
export default defineComponent({
	name: "BoardMenu",
	props: {
		scope: {
			type: String as PropType<"element" | "card" | "column" | "board">,
			required: true,
		},
	},
	setup(props) {
		const hasBackground = computed<boolean>(() => props.scope === "card");

		return {
			hasBackground,
			mdiDotsVertical,
		};
	},
});
</script>
