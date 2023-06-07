<template>
	<v-list dense flat class="py-0">
		<v-list-item>
			<v-list-item-icon class="mr-2">
				<v-icon>{{ mdiFileDocumentOutline }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title style="color: var(--v-primary-base)">{{
					fileRecord.name
				}}</v-list-item-title>
			</v-list-item-content>

			<v-list-item-icon>
				<BoardMenu scope="element">
					<BoardMenuAction>
						<VIcon>
							{{ mdiArrowCollapseUp }}
						</VIcon>
						{{ $t("components.board.action.moveUp") }}
					</BoardMenuAction>
					<BoardMenuAction>
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
			</v-list-item-icon>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent, PropType } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { mdiFileDocumentOutline } from "@mdi/js";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import {
	mdiArrowCollapseUp,
	mdiArrowCollapseDown,
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
	emits: ["update:caption"],
	setup(props, { emit }) {
		const modelCaption = useVModel(props, "caption", emit);
		return {
			mdiFileDocumentOutline,
			modelCaption,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
		};
	},
});
</script>
