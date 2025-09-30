<template>
	<div>
		<InfoAlert
			v-if="shouldShowNoFeatureAlert"
			data-testid="vc-info-box-no-feature"
		>
			{{ notEnabledMessage }}
		</InfoAlert>

		<InfoAlert v-if="shouldShowInfoAlert" data-testid="vc-info-box-show">
			{{ alertMessage }}
		</InfoAlert>
		<InfoAlert
			v-if="shouldShowNoPermissionAlert"
			data-testid="vc-info-box-no-permission"
		>
			{{ noPermissionMessage }}
		</InfoAlert>
		<ContentElementBar
			:has-grey-background="true"
			:icon="mdiVideoOutline"
			:has-row-style="isSmallOrLargerListBoard"
			data-testid="board-video-conference-element"
			@click.stop="onContentClick"
		>
			<template #display>
				<VImg :src="imageSrc" alt="" cover />
			</template>
			<template #title>
				{{ title }}
			</template>
			<template v-if="isEditMode" #menu>
				<slot />
			</template>
			<template #statusInfo>
				<div
					v-if="isRunning && hasParticipationPermission"
					class="pulsating-dot my-auto"
					data-testid="vc-pulsating-dot"
				/>
			</template>
		</ContentElementBar>
	</div>
</template>

<script setup lang="ts">
import image from "@/assets/img/videoConference.svg";
import { computed, PropType, ref } from "vue";
import { mdiVideoOutline } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { injectStrict } from "@/utils/inject";
import { useDisplay } from "vuetify";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useI18n } from "vue-i18n";
import { BoardContextType } from "@/types/board/BoardContext";
import { InfoAlert } from "@ui-alert";

const emit = defineEmits(["click", "refresh"]);

const imageSrc = image;

const props = defineProps({
	boardParentType: {
		type: String as PropType<BoardContextType | undefined>,
		required: false,
		default: undefined,
	},
	canStart: {
		type: Boolean,
		required: true,
	},
	hasParticipationPermission: {
		type: Boolean,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isRunning: {
		type: Boolean,
		required: true,
	},
	isVideoConferenceEnabled: {
		type: Boolean,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(
	() => smAndUp.value && isListLayout.value
);

const shouldShowNoFeatureAlert = computed(
	() => props.canStart && !props.isVideoConferenceEnabled
);
const shouldShowInfoAlert = computed(() => !props.isRunning && !props.canStart);
const shouldShowNoPermissionAlert = computed(
	() => props.isRunning && !props.hasParticipationPermission
);

const alertMessage = computed(() => {
	if (props.isVideoConferenceEnabled) {
		return props.hasParticipationPermission
			? t("pages.videoConference.info.notStarted")
			: t("pages.videoConference.info.noPermission");
	} else {
		return t("pages.videoConference.info.notEnabledParticipants");
	}
});

const noPermissionMessage = computed(() => {
	if (props.isVideoConferenceEnabled) {
		return t("pages.videoConference.info.noPermission");
	} else {
		return t("pages.videoConference.info.notEnabledParticipants");
	}
});

const notEnabledMessage = computed(() => {
	if (props.boardParentType === BoardContextType.Course) {
		return t("pages.videoConference.info.courseParent.notEnabledTeacher");
	} else {
		return t("pages.videoConference.info.roomParent.notEnabledTeacher");
	}
});

const onContentClick = () => {
	if (!props.isVideoConferenceEnabled || !props.hasParticipationPermission)
		return;

	if (!props.isRunning && props.hasParticipationPermission && !props.canStart) {
		emit("refresh");
	} else {
		emit("click");
	}
};
</script>

<style lang="scss" scoped>
.menu {
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
}

$pulseIconColor: #15ba97;

.pulsating-dot {
	background: $pulseIconColor;
	border-radius: 50%;
	height: 20px;
	width: 20px;
	box-shadow: 0 0 0 0 $pulseIconColor;
	transform: scale(1);
	animation: pulse 1.5s 5;

	@keyframes pulse {
		0% {
			transform: scale(1);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		}
		30% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 $pulseIconColor;
		}
		100% {
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
}
</style>
