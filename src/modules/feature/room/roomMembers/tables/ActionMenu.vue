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
						t('pages.rooms.members.actionMenu.selectedMembers', {
							count: selectedIds.length,
						})
					"
				>
					{{ t("pages.rooms.members.tableHeader.actions") }}
				</VBtn>
			</template>

			<KebabMenuList>
				<slot />
			</KebabMenuList>
		</VMenu>

		<VBtn
			ref="resetSelectedMembers"
			class="ml-2 mr-2"
			size="x-small"
			variant="text"
			:icon="mdiClose"
			:aria-label="t('pages.rooms.members.select.none')"
			@click="onReset"
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiClose } from "@icons/material";
import { useI18n } from "vue-i18n";
import { KebabMenuList } from "@ui-kebab-menu";
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
