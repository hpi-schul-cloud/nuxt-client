<template>
	<VCard
		ref="videoConferenceElement"
		class="mb-4 video-conference-element"
		data-testid="video-conference-element"
		:class="{ 'd-none': isHidden }"
		:variant="outlined"
		:ripple="false"
		:tabindex="tabIndex"
		target="_blank"
		link
		:aria-label="ariaLabel"
		@keydown.stop.up.down="onKeydownArrow"
		@keyup.enter="onContentEnter"
	>
		<VideoConferenceContentElementDisplay
			v-if="computedElement.content.title"
			:board-parent-type="boardParentType"
			:title="computedElement.content.title"
			:has-participation-permission="hasParticipationPermission"
			:is-video-conference-enabled="isVideoConferenceEnabled"
			:can-start="canStart"
			:can-join="canJoin"
			:is-running="isConferenceRunning"
			:is-edit-mode="isEditMode"
			@click="onContentClick"
			@refresh="fetchVideoConferenceInfo"
		>
			<BoardMenu
				:scope="BoardMenuScope.VIDEO_CONFERENCE_ELEMENT"
				has-background
				:data-testid="`element-display-menu-${columnIndex}-${rowIndex}-${elementIndex}`"
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete @click="onDelete" />
			</BoardMenu>
		</VideoConferenceContentElementDisplay>
		<VideoConferenceContentElementCreate v-if="isCreating" @create:title="onCreateTitle">
			<BoardMenu
				:scope="BoardMenuScope.VIDEO_CONFERENCE_ELEMENT"
				has-background
				:data-testid="`element-create-menu-${columnIndex}-${rowIndex}-${elementIndex}`"
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete @click="onDelete" />
			</BoardMenu>
		</VideoConferenceContentElementCreate>
		<SvsDialog
			:model-value="isErrorDialogOpen"
			title="error.generic"
			data-testid="error-dialog"
			no-confirm
			cancel-btn-lang-key="common.labels.close"
			@cancel="onDismissError"
		/>
		<VideoConferenceConfigurationDialog
			:board-parent-type="boardParentType"
			:is-open="isConfigurationDialogOpen"
			:options="videoConferenceInfo.options"
			@close="onCloseConfigurationDialog"
			@start-video-conference="onStartVideoConference"
		/>
	</VCard>
</template>

<script setup lang="ts">
import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { BoardFeature, VideoConferenceElementResponse, VideoConferenceScope } from "@api-server";
import { useVideoConference } from "@data-access";
import { useAppStoreRefs } from "@data-app";
import {
	useBoardAllowedOperations,
	useBoardFeatures,
	useBoardFocusHandler,
	useContentElementState,
	useSharedBoardPageInformation,
} from "@data-board";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import { SvsDialog } from "@ui-dialog";
import { KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { computed, onMounted, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	element: {
		type: Object as PropType<VideoConferenceElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isNotFirstElement: { type: Boolean, required: false },
	isNotLastElement: { type: Boolean, required: false },
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits(["delete:element", "move-down:edit", "move-up:edit", "move-keyboard:edit"]);

const { allowedOperations } = useBoardAllowedOperations();

const element = toRef(props, "element");
const videoConferenceElement = ref(null);

const {
	videoConferenceInfo,
	fetchError,
	startError,
	joinError,
	isConferenceRunning,
	isWaitingRoomActive,
	fetchVideoConferenceInfo,
	startVideoConference,
	joinVideoConference,
} = useVideoConference(VideoConferenceScope.VIDEO_CONFERENCE_ELEMENT, element.value.id, false);

const { isFeatureEnabled } = useBoardFeatures();
const isVideoConferenceEnabled = computed(() => isFeatureEnabled(BoardFeature.VIDEOCONFERENCE));

useBoardFocusHandler(element.value.id, videoConferenceElement);

const { contextType } = useSharedBoardPageInformation();

const preFetchedUrl = ref<string | undefined>(undefined);

const { isStudent, isTeacher, isExternalPerson } = useAppStoreRefs();
const canStart = computed(() => allowedOperations.value.manageVideoConference);
const canJoin = computed(
	() => isStudent.value || isTeacher.value || (isExternalPerson.value && isWaitingRoomActive.value)
);

if (isVideoConferenceEnabled.value) {
	onMounted(async () => {
		await fetchVideoConferenceInfo();
		if (isConferenceRunning.value && (canStart.value || canJoin.value)) {
			const taskResult = await joinVideoConference();
			preFetchedUrl.value = taskResult?.result?.data.url;
		}
	});
}

const { modelValue, computedElement } = useContentElementState(props, {
	autoSaveDebounce: 100,
});

const { t } = useI18n();

const isHidden = computed(() => !props.isEditMode && !computedElement.value.content.title);
const outlined = computed(() => (props.isEditMode || computedElement.value.content.title ? "outlined" : "text"));
const ariaLabel = computed(
	() => `${t("components.cardElement.videoConferenceElement")}, ${t("common.ariaLabel.newTab")}`
);
const isConfigurationDialogOpen = ref(false);

const errorDismissed = ref(false);
const isErrorDialogOpen = computed(
	() => (!!fetchError.value || !!startError.value || !!joinError.value) && !errorDismissed.value
);
const onDismissError = () => {
	errorDismissed.value = true;
};

const hasParticipationPermission = computed(() => canJoin.value || canStart.value);
const isCreating = computed(() => props.isEditMode && !computedElement.value.content.title);
const boardParentType = computed(() => contextType.value);

const onContentClick = async () => {
	if (isConferenceRunning.value && preFetchedUrl.value && hasParticipationPermission.value) {
		globalThis.open(preFetchedUrl.value, "_blank");
	} else if (!isConferenceRunning.value && canStart.value) {
		isConfigurationDialogOpen.value = true;
	}
	errorDismissed.value = false;
	await fetchVideoConferenceInfo();
};

const onCloseConfigurationDialog = () => (isConfigurationDialogOpen.value = false);
const onCreateTitle = (title: string) => (modelValue.value.title = title);
const onKeydownArrow = (event: KeyboardEvent) => {
	if (!isCreating.value && props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};
const onMoveDown = () => emit("move-down:edit");
const onMoveUp = () => emit("move-up:edit");
const onDelete = async () => {
	if (await askDeletionForType("components.cardElement.videoConferenceElement"))
		emit("delete:element", computedElement.value.id);
};

const onStartVideoConference = async () => {
	const windowReference = window.open();
	errorDismissed.value = false;

	await startVideoConference(videoConferenceInfo.value.options);

	if (!startError.value) {
		joinVideoConference().then((taskResult) => {
			const url = taskResult?.result?.data.url;
			if (url && windowReference) {
				windowReference.location = url;
				preFetchedUrl.value = url;
			}
		});
	}

	isConfigurationDialogOpen.value = false;
};

const onContentEnter = async () => {
	if (!props.isEditMode) {
		await onContentClick();
	}
};

const tabIndex = computed(() => (!isCreating.value && (canStart.value || isConferenceRunning.value) ? 0 : undefined));
</script>

<style scoped lang="scss">
.video-conference-element:focus {
	outline-offset: 2px;
}
</style>
