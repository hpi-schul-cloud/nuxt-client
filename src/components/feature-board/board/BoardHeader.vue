<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
	>
		<div
			class="board-header rounded"
			:class="{ 'bg-grey-lighten-2': isFocusContained }"
			tabindex="0"
			ref="boardHeader"
		>
			<div class="d-flex flex-row gap-5 px-2 py-2">
				<BoardAnyTitleInput
					scope="board"
					:value="title"
					data-testid="board-title"
					:isEditMode="isEditMode"
					:placeholder="titlePlaceholder"
					@update:value="onUpdateTitle"
					:isFocused="isFocusedById"
					:maxLength="100"
				/>
				<v-chip v-if="isDraft" size="small" class="align-self-center">{{
					t("common.words.draft")
				}}</v-chip>
				<BoardMenu
					v-if="hasEditPermission"
					scope="board"
					data-testid="board-menu-btn"
				>
					<BoardMenuActionEdit @click="onStartEditMode" />
					<BoardMenuActionPublish v-if="isDraft" @click="onPublishBoard" />
					<BoardMenuActionRevert
						v-if="!isDraft"
						@click="onRevertPublishedBoard"
					/>
				</BoardMenu>
			</div>
		</div>
	</BoardColumnInteractionHandler>
</template>

<script lang="ts">
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useEditMode,
} from "@data-board";
import {
	BoardMenu,
	BoardMenuActionEdit,
	BoardMenuActionPublish,
	BoardMenuActionRevert,
} from "@ui-board";
import { useDebounceFn } from "@vueuse/core";
import { defineComponent, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";
export default defineComponent({
	name: "BoardHeader",
	components: {
		BoardAnyTitleInput,
		BoardMenu,
		BoardMenuActionEdit,
		BoardMenuActionPublish,
		BoardMenuActionRevert,
		BoardColumnInteractionHandler,
	},
	props: {
		boardId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		titlePlaceholder: {
			type: String,
			required: true,
		},
		isDraft: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["publish:board", "revert:board", "update:title"],
	setup(props, { emit }) {
		const { t } = useI18n();
		const boardId = toRef(props, "boardId");
		const { isEditMode, startEditMode, stopEditMode } = useEditMode(
			boardId.value
		);
		const boardHeader = ref<HTMLDivElement | null>(null);
		const { isFocusContained, isFocusedById } = useBoardFocusHandler(
			boardId.value,
			boardHeader
		);
		const { hasEditPermission } = useBoardPermissions();
		const onStartEditMode = () => {
			if (!hasEditPermission) return;
			startEditMode();
		};
		const onEndEditMode = () => {
			if (!hasEditPermission) return;
			stopEditMode();
		};
		const onPublishBoard = () => {
			if (!hasEditPermission) return;
			emit("publish:board");
		};
		const onRevertPublishedBoard = () => {
			if (!hasEditPermission) return;
			emit("revert:board");
		};
		const onUpdateTitle = useDebounceFn((newTitle: string) => {
			emit("update:title", newTitle);
		}, 1000);
		return {
			boardHeader,
			hasEditPermission,
			isEditMode,
			isFocusContained,
			isFocusedById,
			onStartEditMode,
			onEndEditMode,
			onPublishBoard,
			onRevertPublishedBoard,
			onUpdateTitle,
			t,
		};
	},
});
</script>

<style scoped>
.board-header {
	align-items: top;
}
.board-header:focus {
	outline: none;
}
</style>
