<template>
	<v-list flat class="py-0">
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
					<BoardMenuAction @click="onTryDelete">
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
import { useDeleteConfirmation } from "@/components/feature-confirmation-dialog/delete-confirmation.composable";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { useVModel } from "@vueuse/core";
import { defineComponent, PropType } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import BoardMenu from "../shared/BoardMenu.vue";
import BoardMenuAction from "../shared/BoardMenuAction.vue";
import {
	mdiFileDocumentOutline,
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
	emits: ["delete:element", "update:caption"],
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const modelCaption = useVModel(props, "caption", emit);

		const onTryDelete = async () => {
			const message =
				i18n
					.t("components.cardHost.deletionModal.confirmation", {
						type: i18n.t("components.boardElement").toString(),
					})
					.toString() ?? "";

			const { askConfirmation } = useDeleteConfirmation();

			const shouldDelete = await askConfirmation({ message });
			if (shouldDelete) {
				console.log("FileContentElementEdit - delete:element");
				emit("delete:element");
			}
		};

		return {
			mdiFileDocumentOutline,
			modelCaption,
			mdiArrowCollapseUp,
			mdiArrowCollapseDown,
			mdiTrashCanOutline,
			onTryDelete,
		};
	},
});
</script>
