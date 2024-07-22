<template>
	<v-custom-dialog
		v-if="selectedItem.status"
		:is-open="$props.isOpen"
		:has-buttons="true"
		:buttons="['close']"
		data-testId="error-dialog"
		@dialog-closed="onCloseCustomDialog"
	>
		<template #title>
			<h2 class="text-h4 my-2">
				{{ $t(getTitle, { toolName: selectedItem.name }) }}
			</h2>
		</template>
		<template #content>
			<RenderHTML
				:html="$t(getText, { toolName: selectedItem.name })"
				component="p"
				class="text-md mt-2"
			/>
		</template>
	</v-custom-dialog>
</template>
<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import {
	ExternalToolDisplayData,
	useContextExternalToolConfigurationStatus,
} from "@data-external-tool";
import { RenderHTML } from "@feature-render-html";
import { computed, ComputedRef, PropType } from "vue";

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

const {
	determineDeactivatedTranslationKey,
	determineToolStatusTranslationKey,
	determineNotLicensedTranslationKey,
} = useContextExternalToolConfigurationStatus();

const onCloseCustomDialog = () => {
	emit("closed");
};

const isToolOutdated: ComputedRef<boolean> = computed(() => {
	return (
		props.selectedItem.status.isOutdatedOnScopeContext ||
		props.selectedItem.status.isOutdatedOnScopeSchool
	);
});

const isToolIncomplete: ComputedRef<boolean> = computed(() => {
	return props.selectedItem.status.isIncompleteOnScopeContext;
});

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
