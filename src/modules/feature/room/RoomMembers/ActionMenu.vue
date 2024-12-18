<template>
	<div class="mr-2 pa-0 pl-4 multi-action-menu" data-testid="multi-action-menu">
		<span class="d-inline-flex">
			{{ selectedIds.length }}
			{{ t("pages.administration.selected") }}
		</span>
		<v-btn
			ref="removeSelectedMembers"
			class="ml-2"
			size="x-small"
			variant="text"
			:icon="mdiTrashCanOutline"
			:aria-label="t('pages.rooms.members.multipleRemove.ariaLabel')"
			@click="onRemove"
		/>

		<v-btn
			ref="resetSelectedMembers"
			class="ml-8 mr-2"
			size="x-small"
			variant="text"
			:icon="mdiClose"
			:aria-label="t('pages.rooms.members.remove.ariaLabel')"
			@click="onReset"
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiClose, mdiTrashCanOutline } from "@icons/material";
import { useI18n } from "vue-i18n";

const props = defineProps({
	selectedIds: {
		type: Array<string>,
		required: true,
	},
});
const { t } = useI18n();
const emit = defineEmits(["remove:selected", "reset:selected"]);

const onRemove = () => {
	emit("remove:selected", props.selectedIds);
};

const onReset = () => {
	emit("reset:selected");
};
</script>
