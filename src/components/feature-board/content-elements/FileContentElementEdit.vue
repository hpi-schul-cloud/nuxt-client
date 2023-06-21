<template>
	<v-list flat class="py-0">
		<v-list-item>
			<v-list-item-icon class="mr-2">
				<v-icon>{{ mdiFileDocumentOutline }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title style="color: var(--v-primary-base)">{{
					fileName
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
					<BoardMenuAction @click="onDelete">
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
import { defineComponent } from "vue";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import {
	mdiAlertCircle,
	mdiFileDocumentOutline,
	mdiArrowCollapseUp,
	mdiArrowCollapseDown,
	mdiTrashCanOutline,
} from "@mdi/js";

export default defineComponent({
	name: "FileContentElementEdit",
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
			onDelete,
		};
	},
});
</script>
