<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="share-dialog"
		:size="480"
		has-buttons
		:buttons="isOpen ? actionButtons : []"
		@dialog-closed="onCloseDialog"
		@next="onNext(shareOptions)"
	>
		<template #title>
			<div ref="textTitle" class="text-h4 my-2 text-break">
				{{ modalTitle }}
			</div>
		</template>

		<template #content>
			<!--Fade-out animation ensures that the dialog shows the last visible step while closing-->
			<v-fade-transition>
				<div v-if="step === 'firstStep' && isOpen">
					<div class="d-flex flex-row pa-2 mb-4 rounded bg-blue-lighten-5">
						<div class="mx-2">
							<v-icon color="info" :icon="mdiInformation" />
						</div>
						<div>
							{{ t(`components.molecules.share.${type}.options.infoText`) }}
							<br />
							{{ t("components.molecules.copyResult.courseFiles.info") }}
							<div
								data-testid="share-modal-external-tools-info"
								v-if="ctlToolsEnabled"
							>
								{{
									t(
										`components.molecules.share.courses.options.ctlTools.infotext`
									)
								}}
							</div>
						</div>
					</div>
					<share-modal-options-form
						:type="type"
						@share-options-change="onShareOptionsChange"
					/>
				</div>

				<div v-if="step === 'secondStep' && isOpen">
					<share-modal-result
						:share-url="shareUrl"
						:type="type"
						@done="onDone"
						@copied="onCopy"
					/>
				</div>
			</v-fade-transition>
		</template>
	</v-custom-dialog>
</template>

<script setup lang="ts">
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@/components/share/ShareModalOptionsForm.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import { mdiInformation } from "@icons/material";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	type: {
		type: String,
		required: true,
		validator: (type) =>
			Object.values(ShareTokenBodyParamsParentTypeEnum).includes(type),
	},
});

const { t } = useI18n();
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const notifier = injectStrict(NOTIFIER_MODULE_KEY);
const shareModule = injectStrict(SHARE_MODULE_KEY);
const isOpen = computed({
	get: () =>
		shareModule.getIsShareModalOpen && shareModule.getParentType === props.type,
	set: () => shareModule.resetShareFlow(),
});

type ShareModalStep = "firstStep" | "secondStep";

const step = computed<ShareModalStep>(() =>
	shareModule.getShareUrl === undefined ? "firstStep" : "secondStep"
);

const modalOptions: Record<
	ShareModalStep,
	{ title: string; actionButtons: string[] }
> = {
	firstStep: {
		title: t("components.molecules.share.options.title"),
		actionButtons: ["cancel", "next"],
	},
	secondStep: {
		title: t("components.molecules.share.result.title"),
		actionButtons: ["close"],
	},
};

const shareUrl = computed(() => shareModule.getShareUrl);

const actionButtons = computed(() => {
	return modalOptions[step.value].actionButtons ?? [];
});

const shareOptions = ref(undefined);

const modalTitle = computed(() => modalOptions[step.value].title ?? "");

const onShareOptionsChange = (newValue) => {
	shareOptions.value = newValue;
};
const onCloseDialog = () => {
	shareModule.resetShareFlow();
};
const onNext = (newValue) => {
	shareModule.createShareUrl(newValue);
};
const onDone = () => {
	shareModule.resetShareFlow();
};
const onCopy = () => {
	notifier.show({
		text: t("common.words.copiedToClipboard"),
		status: "success",
		timeout: 5000,
	});
};

const ctlToolsEnabled = computed(() => {
	return envConfigModule.getCtlToolsTabEnabled;
});
</script>
