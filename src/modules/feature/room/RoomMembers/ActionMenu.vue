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
				<KebabMenuActionChangePermission
					v-if="isVisibleChangeRoleButton"
					@click="onRoleChange"
				/>
				<KebabMenuActionRemoveMember @click="onRemove" />
			</KebabMenuList>
		</VMenu>

		<VBtn
			ref="resetSelectedMembers"
			class="ml-2 mr-2"
			size="x-small"
			variant="text"
			:icon="mdiClose"
			:aria-label="t('pages.rooms.members.remove.ariaLabel')"
			@click="onReset"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	KebabMenuActionChangePermission,
	KebabMenuActionRemoveMember,
	KebabMenuList,
} from "@ui-kebab-menu";
import { mdiClose } from "@icons/material";
import { useI18n } from "vue-i18n";

const props = defineProps({
	selectedIds: {
		type: Array<string>,
		required: true,
	},
	isVisibleChangeRoleButton: {
		type: Boolean,
		default: false,
	},
});
const { t } = useI18n();
const emit = defineEmits<{
	(e: "remove:selected", selectedIds: string[]): void;
	(e: "change:role", selectedIds: string[]): void;
	(e: "reset:selected"): void;
}>();

const onRemove = () => {
	emit("remove:selected", props.selectedIds);
};

const onReset = () => {
	emit("reset:selected");
};

const onRoleChange = () => {
	emit("change:role", props.selectedIds);
};
</script>
