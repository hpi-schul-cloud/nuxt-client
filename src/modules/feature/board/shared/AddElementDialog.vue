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
			<VCardText
				class="d-flex flex-row flex-wrap align-items-center justify-space-between"
			>
				<ExtendedIconBtn
					v-for="(item, key) in elementTypeOptions"
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
					{{ $t("common.labels.close") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
	<VDialog v-model="isAppointmentFinderDialogOpen">
		<VCard class="appointmentFinderDialog">
			<iframe
				src="http://localhost:4200/#/home"
				class="appointmentFinderIframe"
			/>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";

const {
	isDialogOpen,
	closeDialog,
	elementTypeOptions,
	isAppointmentFinderDialogOpen,
} = useSharedElementTypeSelection();

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

.appointmentFinderDialog {
	height: 90vh;
}

.appointmentFinderIframe {
	width: 100%;
	height: 100%;
}
</style>
