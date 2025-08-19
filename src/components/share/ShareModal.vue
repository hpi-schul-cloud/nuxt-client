<template>
	<v-custom-dialog
		:is-open="isOpen"
		data-testid="share-dialog"
		:size="480"
		has-buttons
		:buttons="isOpen ? actionButtons : []"
		@dialog-closed="onCloseDialog"
		@next="onNext()"
	>
		<template #title>
			<div ref="textTitle" class="text-h4 my-2 text-break">
				{{ modalTitle }}
			</div>
		</template>

		<template #content>
			<!--Fade-out animation ensures that the dialog shows the last visible step while closing-->
			<v-fade-transition>
				<div v-if="step === 'firstStep'">
					<p data-testid="share-options-info-text">
						{{ t(`components.molecules.share.${type}.options.infoText`) }}
					</p>
					<div
						v-if="showAlertInfo"
						class="d-flex flex-row pa-2 mb-4 rounded bg-blue-lighten-5"
					>
						<div class="mx-2">
							<v-icon color="info" :icon="mdiInformation" />
						</div>
						<div data-testid="share-options-table-header">
							{{ t("components.molecules.share.options.tableHeader.InfoText") }}
							<ul class="ml-6">
								<li
									v-for="bulletPoint in listItems"
									:key="bulletPoint.translation"
									:data-testId="bulletPoint.testId"
								>
									{{ t(bulletPoint.translation) }}
								</li>
							</ul>
						</div>
					</div>
					<share-modal-options-form
						:type="type"
						@share-options-change="onShareOptionsChange"
					/>
				</div>

				<div v-else-if="step === 'secondStep'">
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
import VCustomDialog, {
	VCustomDialogButton,
} from "@/components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@/components/share/ShareModalOptionsForm.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { ShareOptions } from "@/store/share";
import {
	injectStrict,
	NOTIFIER_MODULE_KEY,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
import { mdiInformation } from "@icons/material";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	type: {
		type: String as PropType<ShareTokenBodyParamsParentTypeEnum>,
		required: true,
	},
});

const { t } = useI18n();
const notifier = injectStrict(NOTIFIER_MODULE_KEY);
const shareModule = injectStrict(SHARE_MODULE_KEY);
const isOpen = computed(
	() =>
		shareModule.getIsShareModalOpen && shareModule.getParentType === props.type
);

type ShareModalStep = "firstStep" | "secondStep";

const step = computed<ShareModalStep>(() =>
	shareModule.getShareUrl === undefined ? "firstStep" : "secondStep"
);

const modalOptions: Record<
	ShareModalStep,
	{ title: string; actionButtons: VCustomDialogButton[] }
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

const shareUrl = computed(() => shareModule.getShareUrl ?? "");

const actionButtons = computed(() => {
	return modalOptions[step.value].actionButtons ?? [];
});

const shareOptions = ref<ShareOptions>();

const modalTitle = computed(() => modalOptions[step.value].title ?? "");

const onShareOptionsChange = (newValue: ShareOptions) => {
	shareOptions.value = newValue;
};
const onCloseDialog = () => {
	shareModule.resetShareFlow();
};
const onNext = () => {
	if (shareOptions.value) {
		shareModule.createShareUrl(shareOptions.value);
	}
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

const showAlertInfo = computed(() =>
	["course", "columnBoard", "lessons", "room"].includes(props.type)
);

const listItems = computed(() => {
	return [
		{
			translation:
				"components.molecules.shareImport.options.restrictions.infoText.personalData",
			type: ["course"],
			testId: "share-options-personal-data-text",
		},
		{
			translation:
				"components.molecules.shareImport.options.restrictions.infoText.roomMembershipsData",
			type: ["room"],
			testId: "share-options-room-memberships-data-text",
		},
		{
			translation:
				"components.molecules.shareImport.options.restrictions.infoText.geogebra",
			type: ["course", "lessons"],
		},
		{
			translation:
				"components.molecules.shareImport.options.restrictions.infoText.etherpad",
			type: ["course", "room", "columnBoard", "lessons"],
		},
		{
			translation:
				"components.molecules.shareImport.options.restrictions.infoText.whiteboard",
			type: ["course", "room", "columnBoard"],
		},
		{
			translation:
				"components.molecules.shareImport.options.ctlTools.infoText.unavailable",
			type: ["course", "room", "columnBoard"],
			testId: "share-modal-external-tools-info",
		},
		{
			translation:
				"components.molecules.shareImport.options.ctlTools.infoText.protected",
			type: ["course", "room", "columnBoard"],
			testId: "share-modal-external-tools-protected-parameter-info",
		},
		{
			translation:
				"components.molecules.shareImport.options.restrictions.infoText.courseFiles",
			type: ["course"],
			testId: "share-modal-coursefiles-info",
		},
		{
			translation:
				"components.molecules.shareImport.options.restrictions.infoText.courseGroups",
			type: ["course"],
		},
	].filter(({ type }) => type.includes(props.type));
});
</script>
