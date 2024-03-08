<template>
	<div>
		<InlineEditInteractionHandler
			:isEditMode="isEditMode"
			@start-edit-mode="onStartEditMode"
			@end-edit-mode="onEndEditMode"
		>
			<div class="board-header" tabindex="0" ref="boardHeader">
				<BoardAnyTitleInput
					ref="boardHeader"
					scope="board"
					:value="title"
					data-testid="board-title"
					:isEditMode="isEditMode"
					:placeholder="titlePlaceholder"
					:isFocused="isFocusedById"
					:maxLength="100"
					:style="{ width: `${fieldWidth}px` }"
					@update:value="onUpdateTitle"
				/>
				<span ref="inputWidthCalcSpan" class="input-width-calc-span" />
			</div>
		</InlineEditInteractionHandler>
		<div class="">
			<v-chip v-if="isDraft" size="small" class="align-self-center">
				{{ t("common.words.draft") }}
			</v-chip>
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
// import { useVModel } from "@vueuse/core";
import { defineComponent, onMounted, ref, toRef, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";

export default defineComponent({
	name: "BoardHeader",
	components: {
		BoardAnyTitleInput,
		BoardMenu,
		BoardMenuActionEdit,
		BoardMenuActionPublish,
		BoardMenuActionRevert,
		InlineEditInteractionHandler,
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

		const boardTitle = ref("");
		const inputWidthCalcSpan = ref<HTMLElement>();
		const fieldWidth = ref(0);

		watchEffect(() => {
			boardTitle.value = props.title;
		});

		onMounted(() => {
			calculateWidth();
		});

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

		const onUpdateTitle = async (newTitle: string) => {
			calculateWidth(newTitle);
			await emitTitle(newTitle);
		};

		const emitTitle = useDebounceFn((newTitle: string) => {
			if (newTitle.length < 1) return;

			emit("update:title", newTitle);
		}, 100);

		const calculateWidth = (newTitle?: string) => {
			if (!inputWidthCalcSpan.value) return;
			console.log(boardTitle.value, newTitle);
			// boardTitle.value = newTitle;

			inputWidthCalcSpan.value.innerHTML = boardTitle.value.replace(
				/\s/g,
				"&nbsp;"
			);

			const width = inputWidthCalcSpan.value.offsetWidth;
			fieldWidth.value = width;
		};

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
			calculateWidth,
			fieldWidth,
			inputWidthCalcSpan,
			t,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/settings";

.board-header:focus {
	outline: none;
}

.input-width-calc-span {
	position: absolute;
	/* left: -9999px; */
	display: inline-block;
	min-width: 6em;
	padding: 0 $field-control-padding-end 0 $field-control-padding-start;
	font-size: var(--heading-3);
	font-family: var(--font-accent);
	letter-spacing: $field-letter-spacing;
}
</style>
