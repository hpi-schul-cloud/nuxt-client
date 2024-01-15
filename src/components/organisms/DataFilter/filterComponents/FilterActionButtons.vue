<template>
	<div class="d-flex justify-space-between">
		<v-btn
			variant="flat"
			@click="onRemoveFilter"
			data-testid="remove-filter-button"
		>
			{{ t("common.actions.remove") }}
		</v-btn>
		<div>
			<v-btn
				variant="flat"
				@click="onCancel"
				data-testid="cancel-filter-button"
			>
				{{ t("common.actions.cancel") }}
			</v-btn>
			<v-btn
				id="add-filter-button"
				class="ml-2"
				variant="flat"
				color="primary"
				@click="onAddFilter"
				data-testid="add-filter-button"
			>
				{{ t("common.actions.add") }}
			</v-btn>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const emit = defineEmits(["remove:filter", "update:filter", "dialog-closed"]);
const { t } = useI18n();

const onRemoveFilter = () => {
	emit("remove:filter");
};
const onCancel = () => {
	emit("dialog-closed");
};
const onAddFilter = () => {
	emit("update:filter");
};
</script>
