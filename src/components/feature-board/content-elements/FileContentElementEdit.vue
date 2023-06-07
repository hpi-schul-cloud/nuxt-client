<template>
	<div class="file-content-edit">
		<v-list dense flat class="py-0">
			<v-list-item :href="fileRecord.url" download>
				<v-list-item-icon class="mr-2">
					<v-icon>{{ mdiFileDocumentOutline }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title style="color: var(--v-primary-base)">{{
						fileRecord.name
					}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<div class="board-menu">
			<BoardMenu scope="element">
				<BoardMenuAction @click="onTryMoveElementUp">
					<VIcon>
						{{ mdiArrowCollapseUp }}
					</VIcon>
					{{ $t("components.board.action.moveUp") }}
				</BoardMenuAction>
				<BoardMenuAction @click="onTryMoveElementDown">
					<VIcon>
						{{ mdiArrowCollapseDown }}
					</VIcon>
					{{ $t("components.board.action.moveDown") }}
				</BoardMenuAction>
				<BoardMenuAction>
					<VIcon>
						{{ mdiTrashCanOutline }}
					</VIcon>
					{{ $t("components.board.action.delete") }}
				</BoardMenuAction>
			</BoardMenu>
		</div>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent, PropType } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import {
	mdiArrowCollapseUp,
	mdiArrowCollapseDown,
	mdiFileDocumentOutline,
	mdiTrashCanOutline,
} from "@mdi/js";

export default defineComponent({
	name: "FileContentElementEdit",
	components: { BoardMenu, BoardMenuAction },
	props: {
		caption: {
			type: String,
			required: true,
		},
		fileRecord: {
			type: Object as PropType<FileRecordResponse>,
			required: true,
		},
	},
	emits: ["update:caption", "move-down:element", "move-up:element"],
	setup(props, { emit }) {
		const modelCaption = useVModel(props, "caption", emit);

		const onTryMoveElementDown = async () => {
			emit("move-down:element");
		};

		const onTryMoveElementUp = async () => {
			emit("move-up:element");
		};

		return {
			mdiFileDocumentOutline,
			modelCaption,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			onTryMoveElementDown,
			onTryMoveElementUp,
		};
	},
});
</script>
<style scoped>
.file-content-edit {
	position: relative;
}

.board-menu {
	position: absolute;
	top: 7px;
	right: 0;
}
</style>
