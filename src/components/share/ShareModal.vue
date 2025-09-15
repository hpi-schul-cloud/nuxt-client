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
			<h2 class="mt-2 text-break">
				{{ modalTitle }}
			</h2>
		</template>

		<template #content>
			<!--Fade-out animation ensures that the dialog shows the last visible step while closing-->
			<v-fade-transition>
				<div v-if="step === 'firstStep' && isOpen">
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
									v-if="showCourseInfo"
									data-testid="share-options-personal-data-text"
								>
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.personalData"
										)
									}}
								</li>
								<li
									v-if="showRoomInfo"
									data-testid="share-options-room-memberships-data-text"
								>
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.roomMembershipsData"
										)
									}}
								</li>
								<li v-if="showCourseInfo || showLessonInfo">
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.geogebra"
										)
									}}
								</li>
								<li
									v-if="
										showCourseInfo ||
										showRoomInfo ||
										showBoardInfo ||
										showLessonInfo
									"
								>
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.etherpad"
										)
									}}
								</li>
								<li v-if="showCourseInfo || showRoomInfo || showBoardInfo">
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.whiteboard"
										)
									}}
								</li>
								<li
									v-if="showCourseInfo || showRoomInfo || showBoardInfo"
									data-testid="share-modal-external-tools-info"
								>
									{{
										t(
											"components.molecules.shareImport.options.ctlTools.infoText.unavailable"
										)
									}}
								</li>
								<li
									v-if="showCourseInfo || showRoomInfo || showBoardInfo"
									data-testid="share-modal-external-tools-protected-parameter-info"
								>
									{{
										t(
											"components.molecules.shareImport.options.ctlTools.infoText.protected"
										)
									}}
								</li>
								<li
									v-if="showCourseInfo"
									data-testid="share-modal-coursefiles-info"
								>
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.courseFiles"
										)
									}}
								</li>
								<li v-if="showCourseInfo">
									{{
										t(
											"components.molecules.shareImport.options.restrictions.infoText.courseGroups"
										)
									}}
								</li>
							</ul>
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
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
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

type VDialogButtonActions =
	| "back"
	| "edit"
	| "cancel"
	| "confirm"
	| "close"
	| "next";

const props = defineProps({
	type: {
		type: String as PropType<ShareTokenBodyParamsParentTypeEnum>,
		required: true,
	},
});

const { t } = useI18n();
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
	{ title: string; actionButtons: VDialogButtonActions[] }
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

const showAlertInfo = computed(() => {
	return (
		props.type === "courses" ||
		props.type === "columnBoard" ||
		props.type === "lessons" ||
		props.type === "room"
	);
});

const showCourseInfo = computed(() => {
	return props.type === "courses";
});

const showBoardInfo = computed(() => {
	return props.type === "columnBoard";
});

const showLessonInfo = computed(() => {
	return props.type === "lessons";
});

const showRoomInfo = computed(() => {
	return props.type === "room";
});
</script>
