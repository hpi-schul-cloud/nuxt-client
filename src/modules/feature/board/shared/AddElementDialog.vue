<template>
	<VDialog
		v-model="isDialogOpen"
		data-testid="element-type-selection"
		:width="dialogWidth"
	>
		<VCard>
			<VCardTitle class="text-h4 text-break px-6 pt-4">
				{{ $t("components.elementTypeSelection.dialog.title") }}
			</VCardTitle>
			<VCardText class="d-flex justify-center">
				<div
					class="d-flex flex-row flex-wrap align-items-center"
					:class="{
						'justify-space-between': submissionsEnabled,
					}"
				>
					<ExtendedIconBtn
						v-for="(item, key) in elementTypeOptions"
						:key="key"
						:data-testid="item.testId"
						:icon="item.icon"
						:label="item.label"
						@click.stop="item.action"
					/>
				</div>
			</VCardText>
			<VCardActions class="mb-2 px-6">
				<VBtn
					data-testid="dialog-close"
					variant="outlined"
					@click.stop="closeDialog"
				>
					{{ $t("common.labels.close") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { computed, ComputedRef } from "vue";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const { isDialogOpen, closeDialog, elementTypeOptions } =
	useSharedElementTypeSelection();

const submissionsEnabled = computed(
	() => envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED
);

const dialogWidth: ComputedRef<number> = computed(() =>
	elementTypeOptions.value.length >= 3 ? 426 : 320
);
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
