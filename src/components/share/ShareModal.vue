<template>
	<Dialog :model-value="isOpen" :title="modalTitle" data-testid="share-dialog">
		<template #content>
			<!--Fade-out animation ensures that the dialog shows the last visible step while closing-->
			<v-fade-transition>
				<div v-if="step === 'firstStep' && isOpen">
					<p data-testid="share-options-info-text">
						{{ t(`components.molecules.share.${type}.options.infoText`) }}
					</p>
					<InfoAlert v-if="showAlertInfo" class="mb-4" data-testid="share-info-copyright-data-protection">
						{{ t("components.molecules.share.checkPrivacyAndCopyright") }}
					</InfoAlert>
					<WarningAlert v-if="showAlertInfo">
						<div data-testid="share-options-table-header">
							{{ t("components.molecules.share.options.tableHeader.InfoText") }}
							<ul class="ml-6">
								<li v-if="showRoomInfo" data-testid="share-modal-room-member-permission">
									{{ t("components.molecules.shareImport.options.restrictions.infoText.roomMembershipsData") }}
								</li>
								<li v-if="showCourseInfo" data-testid="share-modal-course-member-permission">
									{{ t("components.molecules.copyResult.membersAndPermissions") }}
								</li>
								<li v-if="showCourseInfo || showLessonInfo" data-testid="share-modal-geogebra">
									{{ t("components.molecules.shareImport.options.restrictions.infoText.geogebra") }}
								</li>
								<li
									v-if="showCourseInfo || showRoomInfo || showBoardInfo || showLessonInfo"
									data-testid="share-modal-content-etherpad"
								>
									{{ t("components.molecules.shareImport.options.restrictions.infoText.etherpad") }}
								</li>
								<li v-if="showCourseInfo || showRoomInfo || showBoardInfo" data-testid="share-modal-content-whiteboard">
									{{ t("components.molecules.shareImport.options.restrictions.infoText.whiteboard") }}
								</li>
								<li
									v-if="showCourseInfo || showRoomInfo || showBoardInfo"
									data-testid="share-modal-external-tools-info"
								>
									{{ t("components.molecules.shareImport.options.ctlTools.infoText.unavailable") }}
								</li>
								<li
									v-if="showCourseInfo || showRoomInfo || showBoardInfo"
									data-testid="share-modal-external-tools-protected-parameter-info"
								>
									{{ t("components.molecules.shareImport.options.ctlTools.infoText.protected") }}
								</li>
								<li v-if="showCourseInfo" data-testid="share-modal-coursefiles-info">
									{{ t("components.molecules.shareImport.options.restrictions.infoText.courseFiles") }}
								</li>
								<li v-if="showCourseInfo">
									{{ t("components.molecules.shareImport.options.restrictions.infoText.courseGroups") }}
								</li>
							</ul>
						</div>
					</WarningAlert>
					<share-modal-options-form :type="type" @share-options-change="onShareOptionsChange" />
				</div>
				<div v-if="step === 'secondStep' && isOpen">
					<share-modal-result :share-url="shareUrl" :type="type" @done="onDone" @copied="onCopy" />
				</div>
			</v-fade-transition>
		</template>
		<template #actions>
			<template v-if="step === 'firstStep'">
				<DialogBtnCancel data-testid="share-dialog-cancel" @click="onCloseDialog" />
				<DialogBtnConfirm data-testid="share-dialog-next" text-lang-key="common.actions.continue" @click="onNext" />
			</template>
			<template v-else>
				<DialogBtnClose data-testid="share-dialog-close" @click="onCloseDialog" />
			</template>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import ShareModalOptionsForm from "@/components/share/ShareModalOptionsForm.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { ShareOptions } from "@/store/share";
import { injectStrict, SHARE_MODULE_KEY } from "@/utils/inject";
import { notifySuccess } from "@data-app";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { Dialog, DialogBtnCancel, DialogBtnClose, DialogBtnConfirm } from "@ui-dialog";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	type: {
		type: String as PropType<ShareTokenBodyParamsParentTypeEnum>,
		required: true,
	},
});

const { t } = useI18n();
const shareModule = injectStrict(SHARE_MODULE_KEY);
const isOpen = computed({
	get: () => shareModule.getIsShareModalOpen && shareModule.getParentType === props.type,
	set: () => shareModule.resetShareFlow(),
});

type ShareModalStep = "firstStep" | "secondStep";

const step = computed<ShareModalStep>(() => (shareModule.getShareUrl === undefined ? "firstStep" : "secondStep"));

const shareUrl = computed(() => shareModule.getShareUrl ?? "");

const shareOptions = ref<ShareOptions>();

const modalTitle = computed(() => {
	if (step.value === "firstStep") {
		return t("components.molecules.share.options.title");
	}
	if (step.value === "secondStep") {
		return t("components.molecules.share.result.title");
	}
	return undefined;
});

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
	notifySuccess(t("common.words.copiedToClipboard"));
};

const showAlertInfo = computed(
	() =>
		props.type === ShareTokenBodyParamsParentTypeEnum.Courses ||
		props.type === ShareTokenBodyParamsParentTypeEnum.ColumnBoard ||
		props.type === ShareTokenBodyParamsParentTypeEnum.Lessons ||
		props.type === ShareTokenBodyParamsParentTypeEnum.Room ||
		props.type === ShareTokenBodyParamsParentTypeEnum.Card
);

const showCourseInfo = computed(() => props.type === ShareTokenBodyParamsParentTypeEnum.Courses);

const showBoardInfo = computed(
	() =>
		props.type === ShareTokenBodyParamsParentTypeEnum.ColumnBoard ||
		props.type === ShareTokenBodyParamsParentTypeEnum.Card
);

const showLessonInfo = computed(() => props.type === ShareTokenBodyParamsParentTypeEnum.Lessons);

const showRoomInfo = computed(() => props.type === ShareTokenBodyParamsParentTypeEnum.Room);
</script>
