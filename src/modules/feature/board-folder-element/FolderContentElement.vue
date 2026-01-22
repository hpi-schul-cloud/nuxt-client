<template>
	<VCard
		ref="folderContentElement"
		class="mb-4"
		data-testid="board-folder-element"
		variant="outlined"
		:ripple="false"
		:tabindex="isEditMode ? 0 : undefined"
		:aria-label="t('components.cardElement.folderElement') + ' ' + elementTitle"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<ContentElementBar :has-grey-background="true" :icon="mdiFolderOpenOutline" @click="onTitleClick">
			<template #title>
				<RouterLink
					class="folder-title"
					:aria-label="t('components.cardElement.folderElement') + ' ' + elementTitle"
					:to="folderRoute"
				>
					{{ elementTitle }}
				</RouterLink>
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
		<VCardText v-if="isEditMode">
			<FolderTitleInput
				:data-testid="`folder-title-input-${columnIndex}-${rowIndex}-${elementIndex}`"
				:title="element.content.title"
				@update:title="onUpdateTitle"
			/>
		</VCardText>
		<VCardActions v-if="alerts.length === 0" class="py-2 pl-4">
			<FileStatistic :element-id="element.id" :file-statistics="fileStatistics" />
			<v-spacer />
			<VBtn
				:aria-label="t('components.board.action.download')"
				:disabled="!isDownloadAllowed"
				data-testid="board-folder-element-download-button"
				class="float-right download-button"
				:icon="mdiTrayArrowDown"
				size="small"
				variant="text"
				@click="onDownload"
				@keydown.enter="onDownload"
			/>
		</VCardActions>
		<FolderAlerts v-else :alerts="alerts" />
	</VCard>
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
import dayjs from "dayjs";
import { computed, onMounted, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, useRouter } from "vue-router";

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

	const now = dayjs().format("YYYYMMDD");
	const archiveName = `${now}_${elementTitle.value}`;

	downloadFilesAsArchive({ fileRecordIds, archiveName });
};

const isDownloadAllowed = computed(() => (fileStatistics.value?.fileCount ?? 0) > 0);

const router = useRouter();
const folderRoute = computed(() => `/folder/${element.value.id}`);
const onTitleClick = () => router.push(folderRoute.value);
</script>

<style scoped lang="scss">
.download-button {
	padding-right: 10px;
}
.folder-title:focus {
	outline: 2px solid -webkit-focus-ring-color;
	outline-offset: -1px;
}
</style>
