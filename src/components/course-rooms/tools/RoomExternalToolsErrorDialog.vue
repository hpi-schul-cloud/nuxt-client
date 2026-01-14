<template>
	<Dialog
		v-if="selectedItem.status"
		:model-value="isOpen"
		:title="t(getTitle, { toolName: selectedItem.name })"
		identifier="error-dialog"
	>
		<template #content>
			<p>{{ t(getText, { toolName: selectedItem.name }) }}</p>
		</template>
		<template #actions>
			<VBtn data-testid="error-dialog-close-btn" variant="outlined" @click="onClose">
				{{ t("common.labels.close") }}
			</VBtn>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { ExternalToolDisplayData, useContextExternalToolConfigurationStatus } from "@data-external-tool";
import { Dialog } from "@ui-dialog";
import { computed, ComputedRef, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	selectedItem: {
		type: Object as PropType<ExternalToolDisplayData>,
		required: true,
	},
	isOpen: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "closed"): void;
}>();

const { determineDeactivatedTranslationKey, determineToolStatusTranslationKey, determineNotLicensedTranslationKey } =
	useContextExternalToolConfigurationStatus();

const { t } = useI18n();

const onClose = () => {
	emit("closed");
};

const isToolOutdated: ComputedRef<boolean> = computed(
	() => props.selectedItem.status.isOutdatedOnScopeContext || props.selectedItem.status.isOutdatedOnScopeSchool
);

const isToolIncomplete: ComputedRef<boolean> = computed(() => props.selectedItem.status.isIncompleteOnScopeContext);

const getTitle: ComputedRef<string> = computed(() => {
	if (props.selectedItem.status.isDeactivated) {
		return "pages.rooms.tools.deactivatedDialog.title";
	}

	if (props.selectedItem.status.isNotLicensed) {
		return "pages.rooms.tools.notLicensedDialog.title";
	}

	if (isToolIncomplete.value) {
		return "pages.rooms.tools.incompleteDialog.title";
	}

	if (isToolOutdated.value) {
		return "pages.rooms.tools.outdatedDialog.title";
	}

	return "error.generic";
});

const getText: ComputedRef<string> = computed(() => {
	if (!props.selectedItem) {
		return "";
	}

	if (props.selectedItem.status.isDeactivated) {
		return determineDeactivatedTranslationKey();
	} else if (props.selectedItem.status.isNotLicensed) {
		return determineNotLicensedTranslationKey();
	} else {
		return determineToolStatusTranslationKey(props.selectedItem.status);
	}
});
</script>
