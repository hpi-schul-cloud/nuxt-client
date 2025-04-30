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
			:aria-label="t('pages.folder.ariaLabels.menu.action.delete')"
			:name="folderName"
			scope-language-key="components.cardElement.folderElement"
			@click="(confirmationPromise) => $emit('delete', confirmationPromise)"
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

defineEmits(["delete"]);
</script>
