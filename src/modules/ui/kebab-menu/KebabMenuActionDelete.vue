<template>
	<KebabMenuAction :icon="mdiTrashCanOutline" data-testid="kebab-menu-action-delete" @click="emit('click')">
		{{ t("components.board.action.delete") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiTrashCanOutline } from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emit = defineEmits(["click"]);
</script>
