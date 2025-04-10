<template>
	<KebabMenu
		class="mx-2"
		:aria-label="t('pages.folder.ariaLabels.menu')"
		data-testid="folder-menu"
	>
		<KebabMenuActionRename
			:aria-label="t('pages.folder.ariaLabels.menu.action.edit')"
			@click="() => $emit('folder:edit')"
		/>
		<KebabMenuActionDelete
			scope-language-key="common.labels.room"
			:aria-label="t('pages.folder.ariaLabels.menu.action.delete')"
			:name="folderName"
			@click="onDeleteFolder"
		/>
	</KebabMenu>
</template>

<script setup lang="ts">
import {
	KebabMenu,
	KebabMenuActionDelete,
	KebabMenuActionRename,
} from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emit = defineEmits(["folder:edit", "folder:delete"]);

defineProps({
	folderName: { type: String, required: false, default: undefined },
});

const onDeleteFolder = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("folder:delete");
	}
};
</script>
