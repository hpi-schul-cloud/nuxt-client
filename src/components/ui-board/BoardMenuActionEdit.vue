<template>
	<BoardMenuAction :icon="mdiCogOutline" @click="onClick">
		{{ $t("common.labels.settings") }}
	</BoardMenuAction>
</template>

<script lang="ts">
import { mdiCogOutline } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	name: "BoardMenuActionEdit",
	props: {
		name: { type: String, required: false },
		skipDeleteConfirmation: { type: Boolean, default: () => false },
	},
	components: {
		BoardMenuAction,
	},
	emits: ["click"],
	setup(props, { emit }) {
		const onClick = ($event: Event) => emit("click", $event);

		return {
			onClick,
			mdiCogOutline,
		};
	},
});
</script>
