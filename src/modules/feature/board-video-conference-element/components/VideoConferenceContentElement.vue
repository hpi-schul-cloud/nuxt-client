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
				@refresh="onRefresh"
			>
				<BoardMenu
					:scope="BoardMenuScope.VIDEO_CONFERENCE_ELEMENT"
					has-background
					:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
				>
					<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
					<KebabMenuActionMoveDown
						v-if="isNotLastElement"
						@click="onMoveDown"
					/>
					<KebabMenuActionDelete
						:scope="BoardMenuScope.VIDEO_CONFERENCE_ELEMENT"
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
				>
					<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
					<KebabMenuActionMoveDown
						v-if="isNotLastElement"
						@click="onMoveDown"
					/>
					<KebabMenuActionDelete
						:scope="BoardMenuScope.VIDEO_CONFERENCE_ELEMENT"
						@click="onDelete"
					/>
				</BoardMenu>
			</VideoConferenceContentElementCreate>
			<VDialog
				ref="vDialog"
				v-model="isErrorDialogOpen"
				:max-width="480"
				data-testid="error-dialog"
				@click:outside="onCloseErrorDialog"
				@keydown.esc="onCloseErrorDialog"
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
								@click="onCloseErrorDialog"
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
							v-model="videoConferenceOptions.everyAttendeeJoinsMuted"
							data-testid="every-attendee-joins-muted"
							:label="
								t('pages.common.tools.configureVideoconferenceDialog.text.mute')
							"
							:hide-details="true"
						/>
						<VCheckbox
							v-model="videoConferenceOptions.moderatorMustApproveJoinRequests"
							data-testid="moderator-must-approve-join-requests"
							:label="
								t(
									'pages.common.tools.configureVideoconferenceDialog.text.waitingRoom'
								)
							"
							:hide-details="true"
						/>
						<VCheckbox
							v-model="videoConferenceOptions.everybodyJoinsAsModerator"
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
							@click="startVideoConference"
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
import {
	VideoConferenceElementResponse,
	VideoConferenceScope,
} from "@/serverApi/v3";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useContentElementState,
} from "@data-board";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import {
	computed,
	ComputedRef,
	onMounted,
	PropType,
	Ref,
	ref,
	toRef,
} from "vue";
import { useI18n } from "vue-i18n";
import VideoConferenceContentElementCreate from "./VideoConferenceContentElementCreate.vue";
import VideoConferenceContentElementDisplay from "./VideoConferenceContentElementDisplay.vue";
import {
	VideoConferenceInfo,
	VideoConferenceOptions,
	VideoConferenceState,
} from "@/store/types/video-conference";
import VideoConferenceModule from "@/store/video-conference";
import {
	injectStrict,
	AUTH_MODULE_KEY,
	VIDEO_CONFERENCE_MODULE_KEY,
} from "@/utils/inject";
import { useRoute } from "vue-router";
import AuthModule from "@/store/auth";

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

const route = useRoute();

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const videoConferenceModule: VideoConferenceModule = injectStrict(
	VIDEO_CONFERENCE_MODULE_KEY
);
const { isStudent, isTeacher } = useBoardPermissions();

const { t } = useI18n();
const videoConferenceElement = ref(null);
const element = toRef(props, "element");
const boardId = route.params.id;

const outlined = computed(() => {
	return props.isEditMode === true || computedElement.value.content.title !== ""
		? "outlined"
		: "text";
});

useBoardFocusHandler(element.value.id, videoConferenceElement);

const { modelValue, computedElement } = useContentElementState(props, {
	autoSaveDebounce: 100,
});

const ariaLabel = computed(() => {
	return `${t("components.cardElement.videoConferenceElement")}, ${t(
		"common.ariaLabel.newTab"
	)}`;
});

const videoConferenceInfo: ComputedRef<VideoConferenceInfo> = computed(
	() => videoConferenceModule.getVideoConferenceInfo
);

const videoConferenceOptions: ComputedRef<VideoConferenceOptions> = computed(
	() => {
		return videoConferenceModule.getVideoConferenceInfo.options;
	}
);

const canJoin: ComputedRef<boolean> = computed(
	() =>
		(isStudent || isTeacher) &&
		(!authModule.getUserRoles.includes("expert") ||
			authModule.getUserRoles.length > 1 ||
			isWaitingRoomActive.value)
);

const canStart: ComputedRef<boolean> = computed(() => isTeacher);

const hasParticipationPermission: ComputedRef<boolean> = computed(() => {
	return canJoin.value || canStart.value;
});

const isCreating = computed(
	() => props.isEditMode && !computedElement.value.content.title
);

const isHidden = computed(
	() => props.isEditMode === false && !computedElement.value.content.title
);

const isRefreshing: ComputedRef<boolean> = computed(
	() => videoConferenceModule.getLoading
);

const isRunning: ComputedRef<boolean> = computed(
	() => videoConferenceInfo.value.state === VideoConferenceState.RUNNING
);

const isWaitingRoomActive: ComputedRef<boolean> = computed(
	() => videoConferenceInfo.value.options.moderatorMustApproveJoinRequests
);

const isConfigurationDialogOpen: Ref<boolean> = ref(false);

onMounted(async () => {
	await videoConferenceModule.fetchVideoConferenceInfo({
		scope: VideoConferenceScope.VideoConferenceElement,
		scopeId: computedElement.value.id,
	});
});

const onRefresh = async () => {
	if (isRefreshing.value) {
		return;
	}

	await videoConferenceModule.fetchVideoConferenceInfo({
		scope: VideoConferenceScope.VideoConferenceElement,
		scopeId: computedElement.value.id,
	});
};

const onContentClick = async () => {
	if (!isRunning.value && canStart.value) {
		openConfigurationDiaolog();
	}

	if (isRunning.value && canJoin.value) {
		await joinVideoConference();
	}
};

const openConfigurationDiaolog = () => {
	isConfigurationDialogOpen.value = true;
};

const onCloseConfigurationDialog = () => {
	isConfigurationDialogOpen.value = false;
};

const onCreateTitle = (title: string) => {
	modelValue.value.title = title;
};

const onKeydownArrow = (event: KeyboardEvent) => {
	if (isCreating.value === false && props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};
const onMoveDown = () => emit("move-down:edit");
const onMoveUp = () => emit("move-up:edit");
const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element", computedElement.value.id);
	}
};

const startVideoConference = async () => {
	if (props.isEditMode) {
		return;
	}

	const logoutUrl: URL = new URL(`/boards/${boardId}`, window.location.origin);

	await videoConferenceModule.startVideoConference({
		scope: VideoConferenceScope.VideoConferenceElement,
		scopeId: computedElement.value.id,
		videoConferenceOptions: videoConferenceOptions.value,
		logoutUrl: logoutUrl.toString(),
	});

	await joinVideoConference();

	isConfigurationDialogOpen.value = false;
};

const joinVideoConference = async () => {
	const windowReference = window.open();

	videoConferenceModule
		.joinVideoConference({
			scope: VideoConferenceScope.VideoConferenceElement,
			scopeId: computedElement.value.id,
		})
		.then((response) => {
			if (response && windowReference) {
				windowReference.location = response.url;
			}
		});
};

const isErrorDialogOpen: ComputedRef<boolean> = computed(
	() => videoConferenceModule.getError !== null
);

const onCloseErrorDialog = () => {
	videoConferenceModule.resetError();
};
</script>
