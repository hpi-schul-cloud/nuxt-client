<template>
	<div class="mr-2 pa-0 pl-4" data-testid="multi-action-menu">
		<span class="d-inline-flex selected-count">
			{{ selectedIds.length }}
			{{ t("pages.administration.selected") }}
		</span>

		<v-menu>
			<template v-slot:activator="{ props }">
				<v-btn
					v-bind="props"
					color="primary"
					class="ml-4"
					density="comfortable"
					elevation="0"
					data-testid="action-menu-button"
				>
					{{ t("pages.rooms.members.tableHeader.actions") }}
				</v-btn>
			</template>

			<v-list>
				<KebabMenuActionChangePermission
					v-if="isVisibleChangeRoleButton"
					@click="onRoleChange"
				/>
				<KebabMenuActionRemoveMember @click="onRemove" />
			</v-list>
		</v-menu>

		<v-btn
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
