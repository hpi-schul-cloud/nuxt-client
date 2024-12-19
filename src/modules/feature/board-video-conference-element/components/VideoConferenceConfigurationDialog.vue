<template>
	<VDialog
		v-model="isOpen"
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
	</VDialog>
</template>

<script setup lang="ts">
import { ModelRef, PropType, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { VideoConferenceOptions } from "@/store/types/video-conference";

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

const emit = defineEmits(["close", "update:options", "start-video-conference"]);

const localOptions = ref<VideoConferenceOptions>({
	everyAttendeeJoinsMuted: false,
	everybodyJoinsAsModerator: false,
	moderatorMustApproveJoinRequests: true,
});

watch(
	() => props.options,
	(newOptions) => {
		localOptions.value = { ...newOptions };
	},
	{ immediate: true }
);

watch(
	() => localOptions.value,
	(newLocalOptions) => {
		emit("update:options", newLocalOptions);
	},
	{ deep: true }
);
</script>
