<template>
	<KebabMenuAction
		:icon="mdiTrashCanOutline"
		:data-testid="attrs.dataTestId ?? 'kebab-menu-action-delete'"
		@click="onClick"
	>
		{{ t("components.board.action.delete") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import type { MessageSchema } from "@/locales/schema";
import { mdiTrashCanOutline } from "@icons/material";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	name?: string | undefined;
	scopeLanguageKey: keyof MessageSchema;
}>();
const emit = defineEmits(["click"]);

const attrs = useAttrs();
const { t } = useI18n();

const { askDeleteConfirmation } = useDeleteConfirmationDialog();

const onClick = (): void => {
	const promise = askDeleteConfirmation(props.name, props.scopeLanguageKey);
	emit("click", promise);
};
</script>
