<template>
	<SvsDialog
		:model-value="isDialogOpen"
		is-open-state-managed-externally
		:title="currentStepTitle"
		:confirm-btn-lang-key="confirmBtnLangKey"
		:confirm-btn-disabled="!isActiveStepValid"
		data-testid="import-dialog"
		@confirm="onNext"
		@cancel="onCancel"
		@after-leave="resetDialog"
	>
		<template #content>
			<p data-testid="import-dialog-info-text">
				{{ text }}
			</p>
			<WarningAlert
				v-if="warnings.length > 0 && activeStep == 'rename'"
				class="mb-4"
				data-testid="import-dialog-warnings"
			>
				<p class="mb-1">
					{{ t("components.molecules.import.options.tableHeader.InfoText") }}
				</p>
				<ul class="ml-6">
					<li v-for="warning in warnings" :key="warning.testId" :data-testid="warning.testId">
						{{ warning.text }}
					</li>
				</ul>
			</WarningAlert>
			<template v-if="activeStep == 'select'">
				<p data-testid="import-dialog-destination-question">
					{{ destinationQuestion }}
				</p>
				<VSelect
					v-model="selectedDestinationId"
					:items="availableDestinations"
					item-value="id"
					item-title="name"
					:label="selectionLabel"
					:placeholder="selectionPlaceholder"
					:rules="[rules.required]"
					eager-validation
					:hint="selectionHint"
					persistent-hint
					data-testId="import-destination-select"
				/>
			</template>
			<template v-if="activeStep == 'rename'">
				<div class="mb-4">
					{{ t(`components.molecules.import.${props.shareTokenInfo.parentType}.rename`) }}
				</div>
				<VTextField
					v-model="newName"
					:label="t(`components.molecules.import.${props.shareTokenInfo.parentType}.label`)"
					:rules="[rules.required, rules.validateOnOpeningTag]"
					data-testid="import-dialog-name-input"
				/>
			</template>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { ImportDestination, ImportDestinationItem, ImportDestinationType } from "./types";
import { useImportContent } from "@/composables/copy-content.composable";
import { ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { isRequired, useOpeningTagValidator } from "@util-validators";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const props = defineProps<{
	shareTokenInfo: ShareTokenInfoResponse;
	availableDestinations: ImportDestinationItem[];
	destinationType: Extract<ImportDestinationType, "room" | "course">;
}>();

const emit = defineEmits<{
	(e: "confirm", payload: { newName: string; destination?: ImportDestination }): void;
	(e: "cancel"): void;
}>();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const hasSelectStep = computed(
	() =>
		props.shareTokenInfo.parentType === ShareTokenInfoResponseParentType.LESSONS ||
		props.shareTokenInfo.parentType === ShareTokenInfoResponseParentType.TASKS ||
		props.shareTokenInfo.parentType === ShareTokenInfoResponseParentType.COLUMN_BOARD
);
type StepType = "select" | "rename";
const steps: StepType[] = hasSelectStep.value ? ["select", "rename"] : ["rename"];
const stepIndex = ref(0);
const activeStep = computed(() => steps[stepIndex.value]);
const isLastStep = computed(() => stepIndex.value === steps.length - 1);

// form data
const selectedDestinationId = ref<string>();
const nameInput = ref<string | undefined>(undefined);
const newName = computed({
	get: () => nameInput.value ?? props.shareTokenInfo.parentName ?? "",
	set: (value) => (nameInput.value = value),
});

const resetDialog = () => {
	stepIndex.value = 0;
	selectedDestinationId.value = undefined;
	nameInput.value = undefined;
};

const rules = reactive({ required: isRequired(), validateOnOpeningTag });
const isSelectedDestinationValid = computed(() => !!selectedDestinationId.value);
const isNewNameValid = computed(
	() => rules.required(newName.value) === true && rules.validateOnOpeningTag(newName.value) === true
);

const isActiveStepValid = computed(() => {
	if (activeStep.value === "select") {
		return isSelectedDestinationValid.value;
	}

	if (activeStep.value === "rename") {
		return isNewNameValid.value;
	}

	return false;
});

const onNext = () => {
	if (!isLastStep.value) {
		stepIndex.value += 1;
		return;
	}

	emit("confirm", {
		newName: newName.value,
		destination: selectedDestinationId.value
			? { type: props.destinationType, id: selectedDestinationId.value }
			: undefined,
	});
};

const onCancel = () => {
	emit("cancel");
};

const currentStepTitle = computed(() =>
	t(`components.molecules.import.${props.shareTokenInfo.parentType}.options.title`)
);

const selectionLabel = computed(() =>
	t(props.destinationType === "room" ? "components.molecules.label.room" : "components.molecules.label.course")
);

const selectionPlaceholder = computed(() =>
	t(props.destinationType === "room" ? "common.labels.room" : "common.labels.course")
);

const selectionHint = computed(() => t(`common.labels.${props.destinationType}`));

const confirmBtnLangKey = computed(() => {
	if (activeStep.value === "select") {
		return "common.actions.continue";
	}

	return "common.actions.import";
});

const { text, warnings } = useImportContent(computed(() => props.shareTokenInfo.parentType));

const destinationQuestion = computed(() => {
	const originalName = props.shareTokenInfo.parentName;
	return t(`components.molecules.import.${props.shareTokenInfo.parentType}.question`, {
		title: originalName ? ` "${originalName}"` : "",
	});
});

watch(
	isDialogOpen,
	(isOpen) => {
		if (isOpen) {
			stepIndex.value = 0;
		}
	},
	{ immediate: true }
);
</script>
