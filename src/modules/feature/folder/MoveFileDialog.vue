<template>
	<SvsDialog
		v-model="isDialogOpen"
		title="pages.folder.moveDialog.title"
		data-testid="move-file-dialog"
		@confirm="onConfirm"
		@cancel="onCancel"
	>
		<template #content>
			<VSelect
				v-model="selectedFolderId"
				data-testid="move-dialog-select"
				:items="options"
				item-title="title"
				item-value="value"
				:label="t('pages.folder.moveDialog.targetLabel')"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { SvsDialog } from "@ui-dialog";
import { computed, PropType, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const ROOT_VALUE = "__root__";

const props = defineProps({
	availableFolders: {
		type: Array as PropType<FileRecord[]>,
		default: () => [],
	},
	isAtRoot: {
		type: Boolean,
		default: true,
	},
});

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const emit = defineEmits<{
	(e: "confirm", targetFolderId: string | undefined): void;
	(e: "cancel"): void;
}>();

const { t } = useI18n();

const options = computed(() => {
	const folderOptions = props.availableFolders.map((folder) => ({ title: folder.name, value: folder.id }));

	if (!props.isAtRoot) {
		return [{ title: t("pages.folder.moveDialog.rootLevel"), value: ROOT_VALUE }, ...folderOptions];
	}

	return folderOptions;
});

const selectedFolderId = ref<string>(ROOT_VALUE);

watch(isDialogOpen, (open) => {
	if (open) {
		selectedFolderId.value = options.value[0]?.value ?? ROOT_VALUE;
	}
});

const onConfirm = () => {
	emit("confirm", selectedFolderId.value === ROOT_VALUE ? undefined : selectedFolderId.value);
};

const onCancel = () => {
	emit("cancel");
};
</script>
