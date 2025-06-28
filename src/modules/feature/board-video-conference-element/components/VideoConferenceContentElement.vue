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
			:is-running="isRunning"
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
				<KebabMenuActionDelete
					scope-language-key="components.cardElement.videoConferenceElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</VideoConferenceContentElementDisplay>
		<VideoConferenceContentElementCreate
			v-if="isCreating"
			@create:title="onCreateTitle"
		>
			<BoardMenu
				:scope="BoardMenuScope.VIDEO_CONFERENCE_ELEMENT"
				has-background
				:data-testid="`element-create-menu-${columnIndex}-${rowIndex}-${elementIndex}`"
			>
				<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
				<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
				<KebabMenuActionDelete
					scope-language-key="components.cardElement.videoConferenceElement"
					@click="onDelete"
				/>
			</BoardMenu>
		</VideoConferenceContentElementCreate>
		<VDialog
			ref="errorDialog"
			v-model="isErrorDialogOpen"
			:max-width="480"
			data-testid="error-dialog"
			@click:outside="resetError"
			@keydown.esc="resetError"
		>
			<VCard :ripple="false">
				<VCardTitle data-testid="dialog-title" class="dialog-title px-6 pt-4">
					<h2 class="text-h4 my-2 text-break-word">
						{{ t("error.generic") }}
					</h2>
				</VCardTitle>
				<VCardActions class="action-buttons px-6">
					<div class="button-section button-right">
						<VBtn
							data-testid="dialog-close"
							variant="outlined"
							@click="resetError"
						>
							{{ t("common.labels.close") }}
						</VBtn>
					</div>
				</VCardActions>
			</VCard>
		</VDialog>
		<VideoConferenceConfigurationDialog
			:is-open="isConfigurationDialogOpen"
			:options="videoConferenceInfo.options"
			@close="onCloseConfigurationDialog"
			@start-video-conference="onStartVideoConference"
		/>
	</VCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, PropType, toRef } from "vue";
import { useRoute } from "vue-router";
import {
	useBoardFeatures,
	useBoardFocusHandler,
	useBoardPermissions,
	useContentElementState,
	useSharedBoardPageInformation,
} from "@data-board";
import { useI18n } from "vue-i18n";
import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import { BoardMenuScope } from "@ui-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import {
	BoardFeature,
	VideoConferenceElementResponse,
	VideoConferenceScope,
} from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useVideoConference } from "../composables/VideoConference.composable";

const props = defineProps({
	element: {
		type: Object as PropType<VideoConferenceElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isNotFirstElement: { type: Boolean, requried: false },
	isNotLastElement: { type: Boolean, requried: false },
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});
const emit = defineEmits([
	"delete:element",
	"move-down:edit",
	"move-up:edit",
	"move-keyboard:edit",
]);

const element = toRef(props, "element");
const videoConferenceElement = ref(null);

const {
	videoConferenceInfo,
	error,
	isRunning,
	isWaitingRoomActive,
	fetchVideoConferenceInfo,
	startVideoConference,
	joinVideoConference,
	resetError,
} = useVideoConference(
	VideoConferenceScope.VideoConferenceElement,
	element.value.id
);

const { isFeatureEnabled } = useBoardFeatures();
const isVideoConferenceEnabled = computed(() =>
	isFeatureEnabled(BoardFeature.Videoconference)
);

useBoardFocusHandler(element.value.id, videoConferenceElement);

const { contextType } = useSharedBoardPageInformation();

const preFetchedUrl = ref<string | undefined>(undefined);

if (isVideoConferenceEnabled.value) {
	onMounted(async () => {
		await fetchVideoConferenceInfo();
		if (isRunning.value) {
			preFetchedUrl.value = await joinVideoConference();
		}
	});
}

const { modelValue, computedElement } = useContentElementState(props, {
	autoSaveDebounce: 100,
});
const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const route = useRoute();
const boardId = route.params.id;
const { isTeacher, isStudent } = useBoardPermissions();
const { t } = useI18n();

const isHidden = computed(
	() => !props.isEditMode && !computedElement.value.content.title
);
const outlined = computed(() =>
	props.isEditMode || computedElement.value.content.title ? "outlined" : "text"
);
const ariaLabel = computed(
	() =>
		`${t("components.cardElement.videoConferenceElement")}, ${t("common.ariaLabel.newTab")}`
);
const isConfigurationDialogOpen = ref(false);
const isErrorDialogOpen = computed(() => !!error.value);
const hasParticipationPermission = computed(
	() => canJoin.value || canStart.value
);

const canJoin = computed(
	() =>
		(isStudent.value || isTeacher.value) &&
		(!authModule.getUserRoles.includes("expert") ||
			authModule.getUserRoles.length > 1 ||
			isWaitingRoomActive.value)
);

const { hasEditPermission } = useBoardPermissions();
const canStart = computed(() => hasEditPermission.value);
const isCreating = computed(
	() => props.isEditMode && !computedElement.value.content.title
);

const boardParentType = computed(() => contextType.value);

const onContentClick = async () => {
	if (
		isRunning.value &&
		preFetchedUrl.value &&
		hasParticipationPermission.value
	) {
		window.open(preFetchedUrl.value, "_blank");
	} else if (!isRunning.value && canStart.value) {
		isConfigurationDialogOpen.value = true;
	}

	await fetchVideoConferenceInfo();
};

const onCloseConfigurationDialog = () =>
	(isConfigurationDialogOpen.value = false);
const onCreateTitle = (title: string) => (modelValue.value.title = title);
const onKeydownArrow = (event: KeyboardEvent) => {
	if (!isCreating.value && props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};
const onMoveDown = () => emit("move-down:edit");
const onMoveUp = () => emit("move-up:edit");
const onDelete = async (confirmation: Promise<boolean>) => {
	if (await confirmation) emit("delete:element", computedElement.value.id);
};
const onStartVideoConference = async () => {
	const logoutUrl: URL = new URL(`/boards/${boardId}`, window.location.origin);
	const windowReference = window.open();

	await startVideoConference(
		videoConferenceInfo.value.options,
		logoutUrl.toString()
	);

	joinVideoConference().then((response: string | undefined) => {
		if (response && windowReference) {
			windowReference.location = response;
			preFetchedUrl.value = response;
		}
	});
	isConfigurationDialogOpen.value = false;
};

const onContentEnter = async () => {
	if (!props.isEditMode) {
		onContentClick();
	}
};

const tabIndex = computed(() => {
	return !isCreating.value && (canStart.value || isRunning.value)
		? 0
		: undefined;
});
</script>

<style scoped lang="scss">
.video-conference-element:focus {
	outline-offset: 2px;
}
</style>
