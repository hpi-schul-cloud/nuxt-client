<template>
	<SvsDialog
		:model-value="isOpen"
		:is-open-state-managed-externally="true"
		:title="currentStepTitle"
		data-testid="import-dialog"
		@cancel="emit('cancel')"
	>
		<template #content>
			<template v-if="activeStep === 'selectDestination'">
				<p>Select Destination</p>
			</template>

			<template v-if="activeStep === 'import'">
				<p>Import</p>
			</template>

			<template v-if="activeStep === 'importCard'">
				<p>Import Card</p>
			</template>
		</template>

		<template #actions>
			<SvsDialogBtnCancel @click="emit('cancel')" />

			<SvsDialogBtnConfirm
				v-if="activeStep === 'selectDestination'"
				text-lang-key="common.actions.continue"
				@click="emit('next', { destinationId: 'selectedDestinationId' })"
			/>
			<SvsDialogBtnConfirm
				v-if="activeStep === 'import'"
				text-lang-key="common.actions.import"
				@click="emit('confirm', { newName: 'New Name' })"
			/>
			<SvsDialogBtnConfirm
				v-if="activeStep === 'importCard'"
				text-lang-key="common.actions.import"
				@click="emit('confirmCard', { destinationId: 'cardDestinationId' })"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { StepType } from "./types";
import { ShareTokenInfoResponseParentType } from "@api-server";
import { SvsDialog, SvsDialogBtnCancel, SvsDialogBtnConfirm } from "@ui-dialog";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
	isOpen: boolean;
	activeStep: StepType;
	importItemType: ShareTokenInfoResponseParentType;
}>();

const emit = defineEmits<{
	(e: "cancel"): void;
	(e: "next", payload: { destinationId: string }): void;
	(e: "confirm", payload: { newName: string }): void;
	(e: "confirmCard", payload: { destinationId: string }): void;
}>();

const currentStepTitle = computed(() => t(`components.molecules.import.${props.importItemType}.options.title`));
</script>
