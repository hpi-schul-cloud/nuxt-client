<template>
	<KebabMenuAction
		:icon="mdiTrashCanOutline"
		data-testid="kebab-menu-action-delete"
		@click="onClick"
	>
		{{ t("components.board.action.delete") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import type { MessageSchema } from "@/locales/schema";
import { mdiTrashCanOutline } from "@icons/material";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { useI18n } from "vue-i18n";
import KebabMenuAction from "./KebabMenuAction.vue";
import { PropType } from "vue";
const { t } = useI18n();

const props = defineProps({
	name: { type: String, required: false, default: undefined },
	scopeLanguageKey: {
		type: String as PropType<keyof MessageSchema>,
		required: true,
	},
	skipDeleteConfirmation: { type: Boolean, default: () => false },
});

const emit = defineEmits(["click"]);

const { askDeleteConfirmation } = useDeleteConfirmationDialog();

const onClick = (): void => {
	const promise = askDeleteConfirmation(props.name, props.scopeLanguageKey);
	emit("click", promise);
};
</script>
