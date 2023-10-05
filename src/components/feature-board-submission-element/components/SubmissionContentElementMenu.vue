<template>
	<BoardMenu scope="element">
		<BoardMenuActionMoveUp
			@click="onMoveElementUp"
			v-if="hasMultipleElements && !isFirstElement"
		/>
		<BoardMenuActionMoveDown
			@click="onMoveElementDown"
			v-if="hasMultipleElements && !isLastElement"
		/>
		<BoardMenuActionDelete @click="onDelete" />
	</BoardMenu>
</template>

<script lang="ts">
import {
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiTrashCanOutline,
} from "@mdi/js";
import { defineComponent } from "vue";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";

export default defineComponent({
	name: "SubmissionContentElementMenu",
	components: {
		BoardMenu,
		BoardMenuActionMoveUp,
		BoardMenuActionMoveDown,
		BoardMenuActionDelete,
	},
	props: {
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: ["delete:element", "move-down:element", "move-up:element"],
	setup(_, { emit }) {
		const onDelete = () => {
			emit("delete:element");
		};
		const onMoveElementDown = () => {
			emit("move-down:element");
		};
		const onMoveElementUp = () => {
			emit("move-up:element");
		};
		return {
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			onDelete,
			onMoveElementDown,
			onMoveElementUp,
		};
	},
});
</script>
