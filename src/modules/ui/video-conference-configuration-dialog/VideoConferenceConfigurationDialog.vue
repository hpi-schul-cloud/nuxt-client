<template>
	<VDialog
		v-model="isOpen"
		max-width="480"
		data-testid="video-conference-config-dialog"
		@keydown.esc="$emit('close')"
	>
		<UseFocusTrap>
			<VCard :ripple="false">
				<VCardTitle>
					<h2
						class="text-h4 my-2"
						data-testid="video-conference-config-dialog-title"
					>
						{{ t("pages.common.tools.configureVideoconferenceDialog.title") }}
					</h2>
				</VCardTitle>
				<VCardText>
					<VCheckbox
						v-model="localOptions.everyAttendeeJoinsMuted"
						data-testid="every-attendee-joins-muted"
						:label="
							t('pages.common.tools.configureVideoconferenceDialog.text.mute')
						"
						:hide-details="true"
					/>
					<VCheckbox
						v-model="localOptions.moderatorMustApproveJoinRequests"
						data-testid="moderator-must-approve-join-requests"
						:label="
							t(
								'pages.common.tools.configureVideoconferenceDialog.text.waitingRoom'
							)
						"
						:hide-details="true"
					/>
					<VCheckbox
						v-model="localOptions.everybodyJoinsAsModerator"
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
						@click="$emit('close')"
					>
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
		</UseFocusTrap>
	</VDialog>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ModelRef, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { VideoConferenceOptions } from "@/store/types/video-conference";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";

// TODO: BC-9692
const props = defineProps({
	options: {
		type: Object as PropType<VideoConferenceOptions>,
		required: true,
	},
});

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const { t } = useI18n();

defineEmits(["close", "start-video-conference"]);

const localOptions: ComputedRef<VideoConferenceOptions> = computed(
	() => props.options
);
</script>
