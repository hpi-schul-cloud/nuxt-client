<template>
	<v-dialog
		v-model="isOpen"
		data-testid="sharedialog"
		max-width="480"
		@after-leave="onCleanUp"
	>
		<v-card data-testid="copy-info-dialog">
			<UseFocusTrap>
				<v-card-title class="text-h4 my-2 text-break px-6 pt-4">
					{{ modalTitle }}
				</v-card-title>
				<v-card-text class="pt-2 px-6">
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
								{{
									t("components.molecules.share.options.tableHeader.InfoText")
								}}
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
							@done="onCloseDialogOrDone"
							@copied="onCopy"
						/>
					</div>
				</v-card-text>
				<v-card-actions class="px-6 pb-4">
					<v-spacer />
					<template v-if="step === 'firstStep'">
						<v-btn variant="text" @click="onCloseDialogOrDone">
							{{ t("common.actions.cancel") }}
						</v-btn>
						<v-btn variant="flat" color="primary" @click="onNext">
							{{ t("common.actions.continue") }}
						</v-btn>
					</template>
					<template v-else-if="step === 'secondStep'">
						<v-btn variant="flat" color="primary" @click="onCloseDialogOrDone">
							{{ t("common.labels.close") }}
						</v-btn>
					</template>
				</v-card-actions>
			</UseFocusTrap>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import ShareModalOptionsForm from "@/components/share/ShareModalOptionsForm.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { ShareOptions } from "@/store/share";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
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

const step = ref<ShareModalStep>("firstStep");
const shareUrl = computed(() => shareModule.getShareUrl ?? "");
const shareOptions = ref<ShareOptions>();

const modalTitle = computed(() =>
	step.value === "firstStep"
		? t("components.molecules.share.options.title")
		: t("components.molecules.share.result.title")
);

const onShareOptionsChange = (newValue: ShareOptions) => {
	shareOptions.value = { hasExpiryDate: newValue.hasExpiryDate, isSchoolInternal: newValue.isSchoolInternal };
	console.log("now we should have the new value", newValue);
};
const onCloseDialogOrDone = () => {
	shareModule.resetShareFlow();
};

const onCleanUp = () => {
	step.value = "firstStep";
};

const onNext = () => {
		// shareModule.createShareUrl({ isSchoolInternal: false, hasExpiryDate: false });
		// but why is there no value available here yet?
	if (shareOptions.value) {
		shareModule.createShareUrl(shareOptions.value);
		step.value = "secondStep";
	}
};

const onCopy = () => {
	notifier.show({
		text: t("common.words.copiedToClipboard"),
		status: "success",
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
