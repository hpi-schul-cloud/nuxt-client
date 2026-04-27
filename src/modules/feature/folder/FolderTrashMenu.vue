<template>
	<KebabMenu class="mx-2" :aria-label="t('pages.folder.trash.ariaLabels.menu')" data-testid="folder-trash-menu">
		<KebabMenuAction :icon="mdiDelete" data-testid="folder-trash-menu-empty" @click="$emit('empty-trash')">
			{{ t("pages.folder.trash.emptyTrash") }}
		</KebabMenuAction>
	</KebabMenu>
</template>

<script setup lang="ts">
import { mdiDelete } from "@icons/material";
import { KebabMenu, KebabMenuAction } from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineEmits(["empty-trash"]);
</script>
