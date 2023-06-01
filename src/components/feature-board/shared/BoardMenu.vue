<template>
	<VMenu offset-y left min-width="250">
		<template v-slot:activator="{ on, attrs }">
			<VBtn
				color="black"
				small
				text
				dark
				icon
				v-bind="attrs"
				v-on="on"
				:ripple="false"
				@dblclick.stop="() => {}"
				@keydown.left.right.up.down.stop="() => {}"
			>
				<VIcon>{{ mdiDotsVertical }}</VIcon>
				<span class="d-sr-only">
					<template v-if="scope === 'board'">{{
						$t("components.board.menu.board").toString()
					}}</template>
					<template v-if="scope === 'column'">{{
						$t("components.board.menu.column").toString()
					}}</template>
					<template v-if="scope === 'card'">{{
						$t("components.board.menu.card").toString()
					}}</template>
					<template v-if="scope === 'element'">{{
						$t("components.board.menu.element").toString()
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
import { defineComponent, PropType } from "vue";

import { mdiDotsVertical } from "@mdi/js";
export default defineComponent({
	name: "BoardMenu",
	props: {
		scope: {
			type: String as PropType<"element" | "card" | "column" | "board">,
			required: true,
		},
	},
	setup() {
		return {
			mdiDotsVertical,
		};
	},
});
</script>
