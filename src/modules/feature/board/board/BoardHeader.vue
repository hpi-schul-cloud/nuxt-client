<template>
	<div class="d-flex align-items-center">
		<InlineEditInteractionHandler
			:isEditMode="isEditMode"
			@start-edit-mode="onStartEditMode"
			@end-edit-mode="onEndEditMode"
			@keydown.enter="onStartEditMode"
			tabindex="0"
			:id="boardId"
		>
			<div ref="boardHeader">
				<BoardAnyTitleInput
					class="ml-n4"
					ref="boardHeader"
					scope="board"
					:value="boardTitle"
					data-testid="board-title"
					:isEditMode="isEditMode"
					:isFocused="isFocusedById"
					:maxLength="100"
					:style="{ width: `${fieldWidth}px` }"
					@update:value="updateBoardTitle"
					@blur="onBoardTitleBlur"
				/>
				<span ref="inputWidthCalcSpan" class="input-width-calc-span" />
			</div>
		</InlineEditInteractionHandler>
		<div class="d-flex">
			<BoardDraftChip v-if="isDraft" />
			<div class="mx-2">
				<BoardMenu
					v-if="hasEditPermission"
					:scope="BoardMenuScope.BOARD"
					data-testid="board-menu-btn"
				>
					<KebabMenuActionRename @click="onStartEditMode" />
					<KebabMenuActionCopy @click="onCopyBoard" />
					<KebabMenuActionShare v-if="isShareEnabled" @click="onShareBoard" />
					<KebabMenuActionPublish v-if="isDraft" @click="onPublishBoard" />
					<KebabMenuActionChangeLayout @click="onChangeBoardLayout" />
					<KebabMenuActionRevert v-if="!isDraft" @click="onUnpublishBoard" />
					<KebabMenuActionDelete
						:name="title"
						scope-language-key="components.board"
						@click="onDeleteBoard"
					/>
				</BoardMenu>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionCopy,
	KebabMenuActionDelete,
	KebabMenuActionRename,
	KebabMenuActionPublish,
	KebabMenuActionRevert,
	KebabMenuActionShare,
	KebabMenuActionChangeLayout,
} from "@ui-kebab-menu";
import { useCourseBoardEditMode } from "@util-board";
import { useDebounceFn } from "@vueuse/core";
import { computed, onMounted, ref, toRef, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";
import BoardDraftChip from "./BoardDraftChip.vue";

const props = defineProps({
	boardId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	isDraft: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits([
	"copy:board",
	"share:board",
	"update:title",
	"update:visibility",
	"delete:board",
	"change-layout",
]);

const { t } = useI18n();
const boardId = toRef(props, "boardId");
const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(
	boardId.value
);
const boardHeader = ref<HTMLDivElement | null>(null);
const { isFocusedById } = useBoardFocusHandler(boardId.value, boardHeader);
const { hasEditPermission } = useBoardPermissions();

const inputWidthCalcSpan = ref<HTMLElement>();
const fieldWidth = ref(0);

onMounted(() => setTimeout(calculateWidth, 100));

const boardTitle = ref("");

const onStartEditMode = () => {
	if (!hasEditPermission.value) return;
	startEditMode();
};

const onEndEditMode = () => {
	if (!hasEditPermission.value) return;
	stopEditMode();
};

const onCopyBoard = () => {
	if (!hasEditPermission.value) return;
	emit("copy:board");
};

const onShareBoard = () => {
	if (!hasEditPermission.value) return;
	emit("share:board");
};

const onPublishBoard = () => {
	if (!hasEditPermission.value) return;
	emit("update:visibility", true);
};

const onUnpublishBoard = () => {
	if (!hasEditPermission.value) return;
	emit("update:visibility", false);
};

const onBoardTitleBlur = () => {
	stopEditMode();
	if (boardTitle.value.length < 1) {
		updateBoardTitle(t("pages.room.boardCard.label.courseBoard"));
	}
};

const updateBoardTitle = async (value: string) => {
	boardTitle.value = value;
	calculateWidth();
	await emitTitle(value);
};

const onDeleteBoard = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:board", props.boardId);
	}
};

const onChangeBoardLayout = async () => {
	emit("change-layout");
};

const emitTitle = useDebounceFn((newTitle: string) => {
	if (newTitle.length < 1) return;

	emit("update:title", newTitle);
}, 1000);

const calculateWidth = () => {
	if (!inputWidthCalcSpan.value) return;
	const title =
		boardTitle.value || t("components.cardElement.titleElement.placeholder");

	inputWidthCalcSpan.value.innerHTML = title.replace(/\s/g, "&nbsp;");

	const width = inputWidthCalcSpan.value.offsetWidth;
	fieldWidth.value = width;
};

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const isShareEnabled = computed(
	() => envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SHARE
);

watchEffect(() => {
	boardTitle.value = props.title;
	setTimeout(calculateWidth, 100);
});
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";

.v-chip {
	cursor: default;
}

.input-width-calc-span {
	position: absolute;
	left: -9999px;
	display: inline-block;
	min-width: 1em;
	padding: 0 $field-control-padding-end 0 $field-control-padding-start;
	font-size: var(--heading-3);
	font-family: var(--font-accent);
	letter-spacing: $field-letter-spacing;
}
</style>
