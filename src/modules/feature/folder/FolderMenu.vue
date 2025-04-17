<template>
	<KebabMenu
		class="mx-2"
		:aria-label="t('pages.folder.ariaLabels.menu')"
		data-testid="folder-menu"
	>
		<KebabMenuActionRename
			:aria-label="t('pages.folder.ariaLabels.menu.action.edit')"
		/>
		<KebabMenuActionDelete
			scope-language-key="common.labels.room"
			:aria-label="t('pages.folder.ariaLabels.menu.action.delete')"
			:name="folderName"
			@click="$emit('delete')"
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

defineProps({
	folderName: { type: String, required: false, default: undefined },
});
</script>
