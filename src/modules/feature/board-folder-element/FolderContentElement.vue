<template>
	<v-card
		ref="folderContentElement"
		class="mb-4"
		data-testid="board-folder-element"
		elevation="0"
		variant="outlined"
		:ripple="false"
		:tabindex="isEditMode ? 0 : undefined"
		:aria-label="t('components.cardElement.folderElement') + ' ' + elementTitle"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<ContentElementBar
			:has-grey-background="true"
			:icon="mdiFolderOpenOutline"
			tabindex="0"
			role="button"
			class="content-element-bar"
			:aria-label="t('components.cardElement.folderElement') + ' ' + elementTitle"
			@click="onTitleClick"
			@keydown.enter="onTitleClick"
		>
			<template #title>
				{{ elementTitle }}
			</template>
			<template v-if="isEditMode" #menu>
				<BoardMenu
					:scope="BoardMenuScope.FOLDER_ELEMENT"
					has-background
					:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
				>
					<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
					<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
					<KebabMenuActionDelete scope-language-key="components.cardElement.folderElement" @click="onDelete" />
				</BoardMenu>
			</template>
		</ContentElementBar>
		<v-card-text v-if="isEditMode">
			<FolderTitleInput
				:data-testid="`folder-title-input-${columnIndex}-${rowIndex}-${elementIndex}`"
				:title="element.content.title"
				@update:title="onUpdateTitle"
			/>
		</v-card-text>
		<v-card-actions v-if="alerts.length === 0" class="py-2 px-4">
			<FileStatistic :element-id="element.id" :file-statistics="fileStatistics" />
			<v-spacer />
			<v-btn
				:aria-label="$t('components.board.action.download')"
				:disabled="!isDownloadAllowed"
				data-testid="board-folder-element-edit-menu-download"
				class="float-right download-button"
				icon
				size="small"
				variant="text"
				@click="onDownload"
				@keydown.enter="onDownload"
			>
				<v-icon>{{ mdiTrayArrowDown }}</v-icon>
			</v-btn>
		</v-card-actions>
		<FolderAlerts v-else :alerts="alerts" />
	</v-card>
</template>

<script setup lang="ts">
import FileStatistic from "./FileStatistic.vue";
import { FolderAlert } from "./FolderAlert.enum";
import FolderAlerts from "./FolderAlerts.vue";
import FolderTitleInput from "./FolderTitleInput.vue";
import { useFolderAlerts } from "./useFolderAlerts.composable";
import { FileFolderElement } from "@/types/board/ContentElement";
import { FileRecordParent } from "@/types/file/File";
import { downloadFilesAsArchive } from "@/utils/fileHelper";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { useFileStorageApi } from "@data-file";
import { mdiFolderOpenOutline, mdiTrayArrowDown } from "@icons/material";
import { BoardMenu, BoardMenuScope, ContentElementBar } from "@ui-board";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { computed, onMounted, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

interface FolderContentElementProps {
	element: FileFolderElement;
	isEditMode: boolean;
	isNotFirstElement?: boolean;
	isNotLastElement?: boolean;
	columnIndex: number;
	rowIndex: number;
	elementIndex: number;
}

const { t } = useI18n();

const props = defineProps<FolderContentElementProps>();

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
}>();

const folderContentElement = ref(null);
const element = toRef(props, "element");
const { modelValue } = useContentElementState(props, { autoSaveDebounce: 100 });

const elementTitle = computed(() => element.value.content.title || t("components.cardElement.folderElement.untitled"));

const { tryGetParentStatisticFromApi, getStatisticByParentId, getFileRecordsByParentId, fetchFiles } =
	useFileStorageApi();

const { alerts, addAlert } = useFolderAlerts();

const fileStatistics = computed(() => {
	const statistics = getStatisticByParentId(props.element.id);

	return statistics;
});

onMounted(async () => {
	try {
		await tryGetParentStatisticFromApi(props.element.id, FileRecordParent.BOARDNODES);
	} catch {
		addAlert(FolderAlert.FILE_STORAGE_ERROR);
	}
});

const onUpdateTitle = (value: string) => {
	modelValue.value.title = value;
};

useBoardFocusHandler(element.value.id, folderContentElement);

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element", element.value.id);
	}
};

const onMoveUp = () => emit("move-up:edit");
const onMoveDown = () => emit("move-down:edit");

const onDownload = async () => {
	await fetchFiles(element.value.id, FileRecordParent.BOARDNODES);
	const fileRecords = getFileRecordsByParentId(element.value.id);
	const fileRecordIds = fileRecords.map((fr) => fr.id);
	downloadFilesAsArchive({ fileRecordIds, archiveName: elementTitle.value });
};

const isDownloadAllowed = computed(() => (fileStatistics.value?.fileCount ?? 0) > 0);

const router = useRouter();
const onTitleClick = () => {
	const folderRoute = `/folder/${element.value.id}`;

	router.push(folderRoute);
};
</script>

<style scoped>
.content-element-bar:focus {
	outline-offset: -10px;
}

.download-button {
	margin-right: -6px;
}
</style>
