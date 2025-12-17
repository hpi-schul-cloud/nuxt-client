<template>
	<VDialog
		v-model="isOpen"
		max-width="480"
		data-testid="video-conference-config-dialog"
		@keydown.esc="$emit('close')"
		@click:outside="$emit('close')"
	>
		<VCard ref="dialog-content" :ripple="false">
			<VCardTitle class="mx-4 pb-0">
				<h2 class="mt-3" data-testid="video-conference-config-dialog-title">
					{{ t("pages.common.tools.configureVideoconferenceDialog.title") }}
				</h2>
			</VCardTitle>

			<VCardText class="pt-0">
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
			</VCardText>

			<VCardActions class="mr-4 mb-3">
				<VBtn data-testid="dialog-cancel" variant="text" @click="$emit('close')">
					{{ t("common.actions.cancel") }}
				</VBtn>
				<VBtn
					data-testid="dialog-create"
					class="px-6"
					color="primary"
					variant="flat"
					@click="$emit('start-video-conference')"
				>
					{{ t("common.actions.create") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { useSafeFocusTrap } from "@/composables/safeFocusTrap";
import { VideoConferenceOptions } from "@/store/types/video-conference";
import { BoardContextType } from "@/types/board/BoardContext";
import { InfoAlert } from "@ui-alert";
import { computed, ComputedRef, ModelRef, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import { VCard } from "vuetify/components";

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

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const dialogContent = ref<VCard>();
useSafeFocusTrap(isOpen, dialogContent);

const { t } = useI18n();

defineEmits(["close", "start-video-conference"]);

const localOptions: ComputedRef<VideoConferenceOptions> = computed(() => props.options);

const showInfoAlert = computed(() => {
	if (props.boardParentType === BoardContextType.Course) {
		// courses can never have external participants - so the info alert is not needed
		return false;
	}

	const isWaitingRoomOptionDisabled = localOptions.value.moderatorMustApproveJoinRequests === false;

	return isWaitingRoomOptionDisabled;
});
</script>
