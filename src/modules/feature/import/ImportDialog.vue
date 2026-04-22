<template>
	<SvsDialog
		v-model="isDialogOpen"
		:is-open-state-managed-externally="true"
		:title="currentStepTitle"
		:confirm-btn-lang-key="confirmBtnLangKey"
		:confirm-btn-disabled="!isActiveStepValid"
		data-testid="import-dialog"
		@cancel="isDialogOpen = false"
		@confirm="onConfirm"
	>
		<template #content>
			<p>
				{{ text }}
			</p>
			<WarningAlert v-if="warnings.length > 0" class="mb-4">
				<p class="mb-1">
					{{ t("feature-copy.copyInfo.text.alert.followingContent") }}
				</p>
				<ul class="ml-6">
					<li v-for="warning in warnings" :key="warning.testId" :data-testid="warning.testId">
						{{ warning.text }}
					</li>
				</ul>
			</WarningAlert>
			<template v-if="activeStep == 'select'">
				<VSelect
					v-model="selectedDestinationId"
					item-value="id"
					item-title="name"
					:items="availableDestinations"
					:placeholder="selectionPlaceholder"
					:rules="[rules.required]"
					:error="hasSelectStep && !isSelectedDestinationValid"
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
import { ImportDestinationItem, ImportDestinationType } from "./types";
import { useCopyContent } from "@/composables/copy-content.composable";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { useOpeningTagValidator } from "@util-validators";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const props = defineProps<{
	shareTokenInfo: ShareTokenInfoResponse;
	availableDestinations: ImportDestinationItem[];
	destinationType: ImportDestinationType;
}>();

const emit = defineEmits<{
	(e: "confirm", payload: { newName: string; destinationId?: string }): void;
}>();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

type StepType = "select" | "rename";
const activeStep = ref<StepType>("select");

const selectedDestinationId = ref<string>();

const nameInput = ref<string | undefined>(undefined);

const newName = computed({
	get: () => nameInput.value ?? props.shareTokenInfo.parentName ?? "",
	set: (value) => (nameInput.value = value),
});

const resetDialog = () => {
	activeStep.value = hasSelectStep.value ? "select" : "rename";
	selectedDestinationId.value = undefined;
	nameInput.value = undefined;
};

onMounted(() => {
	resetDialog();
});

watch(isDialogOpen, (isOpen) => {
	if (isOpen) {
		resetDialog();
	}
});

const rules = reactive({
	required: (value: string) => !!value || t("common.validation.required"),
	validateOnOpeningTag: (value: string) => validateOnOpeningTag(value),
});

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

const onConfirm = () => {
	// has next step? => goto next step
	if (activeStep.value === "select") {
		activeStep.value = "rename";
		return;
	}

	emit("confirm", { newName: newName.value, destinationId: selectedDestinationId.value });
};

const currentStepTitle = computed(() =>
	t(`components.molecules.import.${props.shareTokenInfo.parentType}.options.title`)
);

const selectionPlaceholder = computed(() => {
	if (!hasSelectStep.value) {
		return "";
	}
	return t(
		props.destinationType === "room"
			? `components.molecules.import.${props.shareTokenInfo.parentType}.options.selectRoom`
			: `components.molecules.import.${props.shareTokenInfo.parentType}.options.selectCourse`
	);
});

const selectionHint = computed(() => t(`common.labels.${props.destinationType}`));

const hasSelectStep = computed(
	() =>
		props.shareTokenInfo.parentType === ShareTokenInfoResponseParentType.LESSONS ||
		props.shareTokenInfo.parentType === ShareTokenInfoResponseParentType.TASKS ||
		props.shareTokenInfo.parentType === ShareTokenInfoResponseParentType.COLUMN_BOARD
);

const confirmBtnLangKey = computed(() => {
	if (activeStep.value === "select") {
		return "common.actions.continue";
	}

	return "common.actions.import";
});

const contentItemType = computed<ContentItemTypeEnum>(() => {
	switch (props.shareTokenInfo.parentType) {
		case ShareTokenInfoResponseParentType.COURSES:
			return ContentItemTypeEnum.Course;
		case ShareTokenInfoResponseParentType.LESSONS:
			return ContentItemTypeEnum.Lesson;
		case ShareTokenInfoResponseParentType.TASKS:
			return ContentItemTypeEnum.Task;
		case ShareTokenInfoResponseParentType.COLUMN_BOARD:
			return ContentItemTypeEnum.ColumnBoard;
		case ShareTokenInfoResponseParentType.ROOM:
			return ContentItemTypeEnum.Room;
		default:
			return ContentItemTypeEnum.Unknown;
	}
});

const { text, warnings } = useCopyContent(contentItemType);
</script>
