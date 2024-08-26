<template>
	<div class="d-flex align-items-center">
		<InlineEditInteractionHandler
			:isEditMode="isEditMode"
			@start-edit-mode="onStartEditMode"
			@end-edit-mode="onEndEditMode"
			@keydown.enter="onStartEditMode"
			tabindex="0"
		>
			<div ref="boardHeader">
				<BoardAnyTitleInput
					class="ml-n2"
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
			<v-chip
				v-if="isDraft"
				size="small"
				class="align-self-center"
				data-testid="board-draft-chip"
			>
				{{ t("common.words.draft") }}
			</v-chip>
			<div class="mx-2">
				<BoardMenu
					v-if="hasEditPermission"
					scope="board"
					data-testid="board-menu-btn"
				>
					<BoardMenuActionEdit @click="onStartEditMode" />
					<BoardMenuActionCopy @click="onCopyBoard" />
					<BoardMenuActionShare v-if="isShareEnabled" @click="onShareBoard" />
					<BoardMenuActionPublish v-if="isDraft" @click="onPublishBoard" />
					<BoardMenuActionRevert v-if="!isDraft" @click="onUnpublishBoard" />
					<BoardMenuActionDelete :name="title" @click="onDeleteBoard" />
				</BoardMenu>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useEditMode,
} from "@data-board";
import {
	BoardMenu,
	BoardMenuActionCopy,
	BoardMenuActionDelete,
	BoardMenuActionEdit,
	BoardMenuActionPublish,
	BoardMenuActionRevert,
	BoardMenuActionShare,
} from "@ui-board";
import { useDebounceFn } from "@vueuse/core";
import { computed, onMounted, ref, toRef, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";

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
]);

const { t } = useI18n();
const boardId = toRef(props, "boardId");
const { isEditMode, startEditMode, stopEditMode } = useEditMode(boardId.value);
const boardHeader = ref<HTMLDivElement | null>(null);
const { isFocusedById } = useBoardFocusHandler(boardId.value, boardHeader);
const { hasEditPermission } = useBoardPermissions();

const inputWidthCalcSpan = ref<HTMLElement>();
const fieldWidth = ref(0);

onMounted(() => setTimeout(calculateWidth, 100));

const boardTitle = ref("");

const onStartEditMode = () => {
	if (!hasEditPermission) return;
	startEditMode();
};

const onEndEditMode = () => {
	if (!hasEditPermission) return;
	stopEditMode();
};

const onCopyBoard = () => {
	if (!hasEditPermission) return;
	emit("copy:board");
};

const onShareBoard = () => {
	if (!hasEditPermission) return;
	emit("share:board");
};

const onPublishBoard = () => {
	if (!hasEditPermission) return;
	emit("update:visibility", true);
};

const onUnpublishBoard = () => {
	if (!hasEditPermission) return;
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
	cursor: pointer;
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
