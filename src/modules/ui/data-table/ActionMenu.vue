<template>
	<div class="pa-0 pl-4" data-testid="multi-action-menu">
		<span class="d-inline-flex selected-count text-no-wrap">
			{{ selectedIds.length }}
			{{ t("pages.administration.selected") }}
		</span>

		<VMenu>
			<template #activator="{ props: menuProps }">
				<VBtn
					v-bind="menuProps"
					color="primary"
					class="ml-4"
					density="comfortable"
					elevation="0"
					data-testid="action-menu-button"
					:aria-label="
						t('ui.actionMenu.selectedRows', {
							count: selectedIds.length,
						})
					"
				>
					{{ t("ui.actionMenu.actions") }}
				</VBtn>
			</template>

			<KebabMenuList>
				<slot />
			</KebabMenuList>
		</VMenu>

		<VBtn
			class="ml-2 mr-2"
			size="x-small"
			variant="text"
			:icon="mdiClose"
			:aria-label="t('ui.actionMenu.select.none')"
			@click="onReset"
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiClose } from "@icons/material";
import { KebabMenuList } from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	selectedIds: {
		type: Array<string>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "reset:selected"): void;
}>();

const onReset = () => {
	emit("reset:selected");
};
</script>
