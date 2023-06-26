<template>
	<div>
		<img :src="url" :alt="fileName" />
		<BoardMenu v-if="isEditMode" scope="element">
			<BoardMenuAction @click="onDelete">
				<VIcon>
					{{ mdiTrashCanOutline }}
				</VIcon>
				{{ $t("components.board.action.delete") }}
			</BoardMenuAction>
		</BoardMenu>
	</div>
</template>

<script lang="ts">
import {
	mdiAlertCircle,
	mdiArrowCollapseDown,
	mdiArrowCollapseUp,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
	mdiTrayArrowDown,
} from "@mdi/js";
import { defineComponent } from "vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";

export default defineComponent({
	name: "ImageFileDisplay",
	components: { BoardMenu, BoardMenuAction },
	props: {
		fileName: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["delete:element", "update:caption"],
	setup(props, { emit }) {
		const onDelete = () => {
			emit("delete:element");
		};

		return {
			mdiAlertCircle,
			mdiFileDocumentOutline,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			mdiTrayArrowDown,
			onDelete,
		};
	},
});
</script>
