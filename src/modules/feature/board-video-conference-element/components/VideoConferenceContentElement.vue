<template>
	<div>
		<VCard
			class="mb-4"
			data-testid="video-conference-element"
			:class="{ 'd-none': isHidden }"
			:variant="outlined"
			ref="videoConferenceElement"
			:ripple="false"
			target="_blank"
			:aria-label="ariaLabel"
			@keydown.stop.up.down="onKeydownArrow"
		>
			<VideoConferenceContentElementDisplay
				v-if="computedElement.content.title"
				:title="computedElement.content.title"
				:has-participation-permission="hasParticipationPermission"
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

			<VDialog
				v-model="isConfigurationDialogOpen"
				max-width="480"
				data-testid="videoconference-config-dialog"
			>
				<VCard :ripple="false">
					<VCardTitle>
						<h2
							class="text-h4 my-2"
							data-testid="videoconference-config-dialog-title"
						>
							{{ t("pages.common.tools.configureVideoconferenceDialog.title") }}
						</h2>
					</VCardTitle>
					<VCardText>
						<VCheckbox
							v-model="videoConferenceInfo.options.everyAttendeeJoinsMuted"
							data-testid="every-attendee-joins-muted"
							:label="
								t('pages.common.tools.configureVideoconferenceDialog.text.mute')
							"
							:hide-details="true"
						/>
						<VCheckbox
							v-model="
								videoConferenceInfo.options.moderatorMustApproveJoinRequests
							"
							data-testid="moderator-must-approve-join-requests"
							:label="
								t(
									'pages.common.tools.configureVideoconferenceDialog.text.waitingRoom'
								)
							"
							:hide-details="true"
						/>
						<VCheckbox
							v-model="videoConferenceInfo.options.everybodyJoinsAsModerator"
							data-testid="everybody-joins-as-moderator"
							:label="
								t(
									'pages.common.tools.configureVideoconferenceDialog.text.allModeratorPermission'
								)
							"
							:hide-details="true"
						/>
					</VCardText>
					<VCardActions>
						<VSpacer />
						<VBtn
							data-testid="dialog-cancel"
							variant="text"
							@click="onCloseConfigurationDialog"
						>
							{{ t("common.actions.cancel") }}
						</VBtn>
						<VBtn
							data-testid="dialog-create"
							class="px-6"
							color="primary"
							variant="flat"
							@click="onStartVideoConference"
						>
							{{ t("common.actions.create") }}
						</VBtn>
					</VCardActions>
				</VCard>
			</VDialog>
		</VCard>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, PropType, toRef } from "vue";
import { useRoute } from "vue-router";

import {
	useBoardFocusHandler,
	useBoardPermissions,
	useContentElementState,
} from "@data-board";
import { useI18n } from "vue-i18n";
import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	BoardMenuScope,
} from "@ui-board";
import {
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

const { modelValue, computedElement } = useContentElementState(props, {
	autoSaveDebounce: 100,
});
const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const route = useRoute();
const boardId = route.params.id;
const element = toRef(props, "element");
const { isTeacher, isStudent } = useBoardPermissions();
const { t } = useI18n();
const videoConferenceElement = ref(null);

useBoardFocusHandler(element.value.id, videoConferenceElement);

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

onMounted(fetchVideoConferenceInfo);

const onContentClick = async () => {
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
</script>
