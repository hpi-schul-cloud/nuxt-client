<template>
	<div>
		<VCard
			class="mb-4"
			data-testid="video-conference-element"
			:class="{ 'd-none': isHidden }"
			:variant="outlined"
			ref="videoConferenceElement"
			:ripple="false"
			tabindex="0"
			target="_blank"
			link
			:aria-label="ariaLabel"
			@keydown.stop.up.down="onKeydownArrow"
			@keyup.enter="onContentEnter"
		>
			<VideoConferenceContentElementDisplay
				v-if="computedElement.content.title"
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
					:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
				>
					<BoardMenuActionMoveUp @click="onMoveUp" />
					<BoardMenuActionMoveDown @click="onMoveDown" />
					<BoardMenuActionDelete @click="onDelete" />
				</BoardMenu>
			</VideoConferenceContentElementDisplay>
			<VideoConferenceContentElementCreate
				v-if="isCreating"
				@create:title="onCreateTitle"
			>
				<BoardMenu
					:scope="BoardMenuScope.VIDEO_CONFERENCE_ELEMENT"
					has-background
				>
					<BoardMenuActionMoveUp @click="onMoveUp" />
					<BoardMenuActionMoveDown @click="onMoveDown" />
					<BoardMenuActionDelete @click="onDelete" />
				</BoardMenu>
			</VideoConferenceContentElementCreate>
			<VDialog
				ref="vDialog"
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
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, PropType, toRef } from "vue";
import { useRoute } from "vue-router";
import {
	useBoardFeatures,
	useBoardFocusHandler,
	useBoardPermissions,
	useContentElementState,
} from "@data-board";
import { useI18n } from "vue-i18n";
import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import { VideoConferenceConfigurationDialog } from "@ui-video-conference-configuration-dialog";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	BoardMenuScope,
} from "@ui-board";
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

if (isVideoConferenceEnabled.value) {
	onMounted(fetchVideoConferenceInfo);
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
		(isStudent || isTeacher) &&
		(!authModule.getUserRoles.includes("expert") ||
			authModule.getUserRoles.length > 1 ||
			isWaitingRoomActive.value)
);

const canStart = computed(() => isTeacher);
const isCreating = computed(
	() => props.isEditMode && !computedElement.value.content.title
);

const onContentClick = async () => {
	await fetchVideoConferenceInfo();
	if (isRunning.value && hasParticipationPermission.value) {
		await onJoinVideoConference();
	} else if (!isRunning.value && canStart.value) {
		isConfigurationDialogOpen.value = true;
	}
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
	await startVideoConference(
		videoConferenceInfo.value.options,
		logoutUrl.toString()
	);

	await onJoinVideoConference();
	isConfigurationDialogOpen.value = false;
};

const onJoinVideoConference = async () => {
	const windowReference = window.open();

	joinVideoConference().then((response: string | undefined) => {
		if (response && windowReference) {
			windowReference.location = response;
		}
	});
};

const onContentEnter = async () => {
	if (!props.isEditMode) {
		onContentClick();
	}
};
</script>
