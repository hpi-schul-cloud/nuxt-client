<template>
	<Dialog
		v-model="isOpen"
		title="pages.common.tools.configureVideoconferenceDialog.title"
		data-testid="video-conference-config-dialog"
		confirm-btn-lang-key="common.actions.create"
		@cancel="$emit('close')"
		@confirm="$emit('start-video-conference')"
	>
		<template #content>
			<VCheckbox
				v-model="localOptions.everyAttendeeJoinsMuted"
				data-testid="every-attendee-joins-muted"
				:label="t('pages.common.tools.configureVideoconferenceDialog.text.mute')"
				:hide-details="true"
			/>
			<VCheckbox
				v-model="localOptions.moderatorMustApproveJoinRequests"
				data-testid="moderator-must-approve-join-requests"
				:label="t('pages.common.tools.configureVideoconferenceDialog.text.waitingRoom')"
				:hide-details="true"
			/>
			<InfoAlert v-if="showInfoAlert" class="mx-2 mt-n2">{{
				t("pages.common.tools.configureVideoconferenceDialog.info.waitingRoom")
			}}</InfoAlert>
			<VCheckbox
				v-model="localOptions.everybodyJoinsAsModerator"
				data-testid="everybody-joins-as-moderator"
				:label="t('pages.common.tools.configureVideoconferenceDialog.text.allModeratorPermission')"
				:hide-details="true"
			/>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { VideoConferenceOptions } from "@/store/types/video-conference";
import { BoardContextType } from "@/types/board/BoardContext";
import { InfoAlert } from "@ui-alert";
import { Dialog } from "@ui-dialog";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	options: {
		type: Object as PropType<VideoConferenceOptions>,
		required: true,
	},
	boardParentType: {
		type: String as PropType<BoardContextType | undefined>,
		required: false,
		default: undefined,
	},
});

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const { t } = useI18n();

defineEmits(["close", "start-video-conference"]);

const localOptions = computed(() => props.options);

const showInfoAlert = computed(() => {
	if (props.boardParentType === BoardContextType.Course) {
		// courses can never have external participants - so the info alert is not needed
		return false;
	}

	return localOptions.value.moderatorMustApproveJoinRequests === false;
});
</script>
