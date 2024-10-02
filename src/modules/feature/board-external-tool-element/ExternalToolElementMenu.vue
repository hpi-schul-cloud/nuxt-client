<template>
	<BoardMenu :scope="BoardMenuScope.EXTERNAL_TOOL_ELEMENT" has-background>
		<BoardMenuActionMoveUp @click="onMoveUp" />
		<BoardMenuActionMoveDown @click="onMoveDown" />
		<BoardMenuAction :icon="mdiCogOutline" @click="onEdit">
			{{ $t("common.labels.settings") }}
		</BoardMenuAction>
		<BoardMenuActionDelete :name="displayName" @click="onDelete" />
	</BoardMenu>
</template>

<script lang="ts">
import {
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiCogOutline,
	mdiTrashCanOutline,
} from "@icons/material";
import {
	BoardMenu,
	BoardMenuAction,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	BoardMenuScope,
} from "@ui-board";
import { defineComponent } from "vue";

export default defineComponent({
	computed: {
		BoardMenuScope() {
			return BoardMenuScope;
		},
	},
	components: {
		BoardMenu,
		BoardMenuActionDelete,
		BoardMenuAction,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
	},
	props: {
		displayName: {
			type: String,
		},
	},
	emits: [
		"edit:element",
		"delete:element",
		"move-down:element",
		"move-up:element",
	],
	setup(_, { emit }) {
		const onEdit = () => emit("edit:element");

		const onDelete = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
			if (shouldDelete) {
				emit("delete:element");
			}
		};

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
		};
	},
});
</script>
