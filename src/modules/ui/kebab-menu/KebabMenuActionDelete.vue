<template>
	<KebabMenuAction
		:icon="mdiTrashCanOutline"
		data-testid="kebab-menu-action-delete"
		@click="onClick"
	>
		{{ title ? title : t("components.board.action.delete") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import type { MessageSchema } from "@/locales/schema";
import { mdiTrashCanOutline } from "@icons/material";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { useI18n } from "vue-i18n";
import KebabMenuAction from "./KebabMenuAction.vue";

type Props = {
	name?: string | undefined;
	scopeLanguageKey: keyof MessageSchema;
	skipDeleteConfirmation?: boolean;
	title?: string | undefined;
};

const props = withDefaults(defineProps<Props>(), {
	name: undefined,
	skipDeleteConfirmation: false,
	title: undefined,
});

const { t } = useI18n();
const emit = defineEmits(["click"]);

const { askDeleteConfirmation } = useDeleteConfirmationDialog();

const onClick = (): void => {
	const promise = askDeleteConfirmation(props.name, props.scopeLanguageKey);
	emit("click", promise);
};
</script>
