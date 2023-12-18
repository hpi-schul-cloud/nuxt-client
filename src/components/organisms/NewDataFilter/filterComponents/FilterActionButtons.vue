<template>
	<div class="d-flex justify-space-between">
		<v-btn variant="flat" @click="onRemoveFilter">
			{{ t("common.actions.remove") }}
		</v-btn>
		<div>
			<v-btn variant="flat" @click="onCancel">
				{{ t("common.actions.cancel") }}
			</v-btn>
			<v-btn class="ml-2" variant="flat" color="primary" @click="onAddFilter">
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
