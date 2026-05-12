<template>
	<SvsDialog
		:model-value="isDialogOpen"
		is-open-state-managed-externally
		:title="currentStepTitle"
		confirm-btn-lang-key="common.actions.continue"
		:no-confirm="activeStep === 'showResult'"
		:cancel-btn-lang-key="cancelBtnLangKey"
		data-testid="share-dialog"
		@confirm="onNext"
		@cancel="onCancel"
		@after-leave="resetDialog"
	>
		<template #content>
			<template v-if="activeStep === 'askOptions'">
				<p data-testid="share-options-info-text">
					{{ text }}
				</p>
				<InfoAlert class="mb-4" data-testid="share-info-copyright-data-protection">
					{{ t("components.molecules.share.checkPrivacyAndCopyright") }}
				</InfoAlert>
				<WarningAlert v-if="warnings.length > 0" class="mb-4" data-testid="share-dialog-warnings">
					<p class="mb-1" data-testid="share-options-table-header">
						{{ t("components.molecules.share.options.tableHeader.InfoText") }}
					</p>
					<ul class="ml-6">
						<li v-for="warning in warnings" :key="warning.testId" :data-testid="warning.testId">
							{{ warning.text }}
						</li>
					</ul>
				</WarningAlert>
				<v-checkbox
					v-model="shareOptions.isSchoolInternal"
					data-testId="isSchoolInternal"
					:label="t('components.molecules.share.options.schoolInternally')"
					:hide-details="true"
					density="comfortable"
				/>
				<v-checkbox
					v-model="shareOptions.hasExpiryDate"
					data-testId="hasExpiryDate"
					:label="t('components.molecules.share.options.expiresInDays')"
					:hide-details="true"
					density="comfortable"
				/>
			</template>
			<template v-if="activeStep === 'showResult' && shareUrl">
				<ShareDialogResult :share-url="shareUrl" :type="shareItemType" @done="onDone" @copied="onCopy" />
			</template>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import ShareDialogResult from "./ShareDialogResult.vue";
import { useShareContent } from "@/composables/copy-content.composable";
import { ShareOptions } from "@/store/share";
import { ShareTokenBodyParamsParentType } from "@api-server";
import { notifySuccess } from "@data-app";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
	shareItemType: ShareTokenBodyParamsParentType;
	shareUrl?: string;
}>();

const emit = defineEmits<{
	(e: "confirm", payload: ShareOptions): void;
	(e: "cancel"): void;
	(e: "done"): void;
}>();

const isDialogOpen = defineModel("is-open", {
	type: Boolean,
	default: false,
});

type StepType = "askOptions" | "showResult";
const steps: StepType[] = ["askOptions", "showResult"];
const stepIndex = ref(0);
const activeStep = computed(() => steps[stepIndex.value]);
const isLastStep = computed(() => stepIndex.value === steps.length - 1);

const shareOptions = reactive<ShareOptions>({ isSchoolInternal: true, hasExpiryDate: true });

const currentStepTitle = computed((): string => {
	if (activeStep.value === "askOptions") {
		return t("components.molecules.share.options.title");
	}
	return t("components.molecules.share.result.title");
});

const cancelBtnLangKey = computed(() =>
	activeStep.value === "askOptions" ? "common.actions.cancel" : "common.labels.close"
);

const { text, warnings } = useShareContent(computed(() => props.shareItemType));

const onNext = () => {
	if (!isLastStep.value) {
		stepIndex.value += 1;
		emit("confirm", { ...shareOptions });
	}
};

const onCancel = () => {
	if (activeStep.value === "askOptions") {
		emit("cancel");
	} else {
		emit("done");
	}
};

const onDone = () => {
	emit("done");
};

const onCopy = () => {
	notifySuccess(t("common.words.copiedToClipboard"));
};

const resetDialog = () => {
	stepIndex.value = 0;
	shareOptions.isSchoolInternal = true;
	shareOptions.hasExpiryDate = true;
};

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
