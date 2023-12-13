<template>
	<BoardMenu scope="element" v-on="{ [MenuEvent.DELETE]: onDelete }">
		<BoardMenuActionMoveUp @click="onMoveUp" />
		<BoardMenuActionMoveDown @click="onMoveDown" />
		<BoardMenuAction :icon="mdiCogOutline" @click="onEdit">
			{{ $t("common.labels.settings") }}
		</BoardMenuAction>
		<BoardMenuActionDelete />
	</BoardMenu>
</template>

<script lang="ts">
import {
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiCogOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
import {
	BoardMenu,
	BoardMenuAction,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	MenuEvent,
} from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		BoardMenu,
		BoardMenuActionDelete,
		BoardMenuAction,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
	},
	emits: [
		"edit:element",
		"delete:element",
		"move-down:element",
		"move-up:element",
	],
	setup(_, { emit }) {
		const onEdit = () => emit("edit:element");

		const onDelete = () => emit("delete:element");

		const onMoveDown = () => emit("move-down:element");

		const onMoveUp = () => emit("move-up:element");

		return {
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiCogOutline,
			onEdit,
			onDelete,
			onMoveDown,
			onMoveUp,
			MenuEvent,
		};
	},
});
</script>
