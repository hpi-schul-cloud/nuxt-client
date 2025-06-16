<template>
	<VDialog
		v-model="isDialogOpen"
		data-testid="element-type-selection"
		:width="dialogWidth"
	>
		<VCard :loading="isDialogLoading">
			<VCardTitle class="text-h4 text-break px-6 pt-4">
				{{ t("components.elementTypeSelection.dialog.title") }}
			</VCardTitle>
			<VCardText class="d-flex flex-row flex-wrap align-items-center">
				<ExtendedIconBtn
					v-for="(item, key) in staticElementTypeOptions"
					:key="key"
					:data-testid="item.testId"
					:icon="item.icon"
					:label="item.label"
					@click.stop="item.action"
				/>
				<ExtendedIconBtn
					v-for="(item, key) in dynamicElementTypeOptions"
					:key="key"
					:data-testid="item.testId"
					:icon="item.icon"
					:label="item.label"
					@click.stop="item.action"
				/>
			</VCardText>
			<VCardActions class="mb-2 px-6">
				<VBtn
					data-testid="dialog-close"
					variant="outlined"
					@click.stop="closeDialog"
				>
					{{ t("common.labels.close") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { ExtendedIconBtn } from "@ui-extended-icon-btn";
import { computed, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

const {
	isDialogOpen,
	isDialogLoading,
	closeDialog,
	staticElementTypeOptions,
	dynamicElementTypeOptions,
} = useSharedElementTypeSelection();

const { t } = useI18n();

const dialogWidth: ComputedRef<number> = computed(() => {
	const totalOptions =
		staticElementTypeOptions.value.length +
		dynamicElementTypeOptions.value.length;
	return totalOptions >= 3 ? 426 : 320;
});
</script>

<style scoped>
.subtitle {
	overflow-wrap: break-word;
	white-space: normal;
}

.button-max-width {
	max-width: 100px;
}
</style>
