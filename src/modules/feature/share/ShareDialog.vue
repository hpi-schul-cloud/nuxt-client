<template>
	<SvsDialog
		:model-value="isOpen"
		is-open-state-managed-externally
		:title="currentStepTitle"
		confirm-btn-lang-key="common.actions.continue"
		:no-confirm="activeStep === 'showResult'"
		:is-loading="isLoading"
		:are-actions-disabled="isLoading"
		:cancel-btn-lang-key="cancelBtnLangKey"
		data-testid="share-dialog"
		@confirm="onNext"
		@cancel="onCancel"
		@after-leave="onAfterLeave"
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
				<ShareDialogResult :share-url="shareUrl" :type="shareItemType" @done="emit('complete')" @copied="onCopy" />
			</template>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import ShareDialogResult from "./ShareDialogResult.vue";
import { useShareContent } from "@/composables/copy-content.composable";
import { notifySuccess } from "@data-app";
import { ShareDialogProps } from "@feature-dialog";
import { ShareOptions } from "@feature-share";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<ShareDialogProps>();
const emit = defineEmits<{
	complete: [];
	cancel: [];
	"after-leave": [];
}>();

const isOpen = defineModel<boolean>({ default: false });

type StepType = "askOptions" | "showResult";
const steps: StepType[] = ["askOptions", "showResult"];
const stepIndex = ref(0);
const activeStep = computed(() => steps[stepIndex.value]);

const shareOptions = reactive<ShareOptions>({ isSchoolInternal: true, hasExpiryDate: true });

const shareUrl = ref<string>();
const isLoading = ref(false);

const currentStepTitle = computed(() =>
	activeStep.value === "askOptions"
		? t("components.molecules.share.options.title")
		: t("components.molecules.share.result.title")
);

const cancelBtnLangKey = computed(() =>
	activeStep.value === "askOptions" ? "common.actions.cancel" : "common.labels.close"
);

const { text, warnings } = useShareContent(computed(() => props.shareItemType));

const onNext = async () => {
	if (isLoading.value) return;
	isLoading.value = true;
	try {
		shareUrl.value = await props.onConfirm({ ...shareOptions });
		stepIndex.value += 1;
	} catch {
		emit("cancel");
	} finally {
		isLoading.value = false;
	}
};

const onCancel = () => {
	if (activeStep.value === "askOptions") {
		emit("cancel");
	} else {
		emit("complete");
	}
};

const onCopy = () => {
	notifySuccess(t("common.words.copiedToClipboard"));
};

const onAfterLeave = () => {
	stepIndex.value = 0;
	shareUrl.value = undefined;
	shareOptions.isSchoolInternal = true;
	shareOptions.hasExpiryDate = true;
	emit("after-leave");
};
</script>
