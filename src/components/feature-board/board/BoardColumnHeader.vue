<template>
	<div class="mb-4" style="border-bottom: 1px solid black">
		<div class="py-2 d-flex align-start justify-space-between">
			<div role="heading" aria-level="2" class="text-truncate text-h6 mb-2">
				{{ title }}
			</div>
			<BoardMenu scope="column">
				<BoardMenuAction> Delete Column </BoardMenuAction>
			</BoardMenu>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BoardMenu from "./BoardMenu.vue";
import BoardMenuAction from "./BoardMenuAction.vue";

export default defineComponent({
	name: "BoardColumnHeader",
	components: {
		BoardMenu,
		BoardMenuAction,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	setup() {
		return {};
	},
});
</script>
