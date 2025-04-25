<template>
	<v-card ref="inviteMembersContent">
		<template #title>
			<h2 class="text-h4 mt-2">
				{{ modalTitle }}
			</h2>
		</template>

		<template #text>
			<template v-if="step === 'prepare'">
				<p>
					Im nächsten Schritt wird ein Link erstellt, mit dem der Raum betreten
					werden kann.
				</p>

				<InfoAlert>
					Lernende anderer Schulen müssen immer durch eine aufsichtsführende
					Lernbegleitung ihrer Schule zum Raum hinzugefügt werden.
				</InfoAlert>

				<div class="mt-4">
					<v-text-field
						v-model="formData.description"
						class="mb-2"
						label="Beschreibung (optional)"
						hint="Wird in der Link-Übersicht angezeigt"
						persistent-hint
					/>

					<v-checkbox v-model="formData.onlySchoolMembers" hide-details>
						<template #label>
							<div class="mt-5">
								Link nur für Nutzende der folgenden Schule gültig [{{
									schoolName
								}}]
							</div>
						</template>
					</v-checkbox>

					<v-checkbox
						v-model="formData.validForStudents"
						label="Link auch für Lernende gültig"
						hide-details
					/>

					<div class="d-flex align-center justify-start my-n4">
						<v-checkbox label="Link läuft ab am" hide-details class="mr-2" />

						<date-picker
							class="mr-2 mt-2"
							:date="dateObject.toDateString()"
							data-testid="date-picker-until"
							style="max-width: 120px"
						/>
					</div>

					<v-checkbox
						v-model="formData.isConfirmationNeeded"
						hide-details
						class="my-n6"
					>
						<template #label>
							<div class="mt-5">
								Betreten des Raums nur nach Bestätigung möglich (weitere
								Informationen)
							</div>
						</template>
					</v-checkbox>
				</div>
			</template>
			<template v-else>
				<ShareModalResult
					share-url="https://www.schul.cloud/room/1234567890"
					type="roomMemberInvitation"
				/>
			</template>
		</template>

		<template #actions>
			<v-spacer />
			<div v-if="step === 'prepare'" class="mr-4 mb-3">
				<v-btn
					ref="cancelButton"
					class="ms-auto mr-2"
					color="primary"
					:text="t('common.actions.cancel')"
					data-testid="invite-participant-cancel-btn"
					@click="onClose"
				/>
				<v-btn
					ref="addButton"
					class="ms-auto"
					color="primary"
					variant="flat"
					:text="t('common.actions.continue')"
					data-testid="invite-participant-save-btn"
					@click="onInviteMembers"
				/>
			</div>

			<div v-else class="mr-4 mb-3">
				<v-btn
					ref="closeButton"
					class="ms-auto"
					variant="outlined"
					:text="t('common.labels.close')"
					data-testid="invite-participant-close-btn"
					@click="onClose"
				/>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { VCard } from "vuetify/lib/components/index.mjs";
import { InfoAlert } from "@ui-alert";
import { DatePicker } from "@ui-date-time-picker";
import ShareModalResult from "@/components/share/ShareModalResult.vue";

defineProps({
	schoolName: {
		type: String,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { t } = useI18n();
type InvitationStep = "prepare" | "share";

const formData = ref({
	description: "",
	onlySchoolMembers: false,
	validForStudents: false,
	validUntil: "",
	isConfirmationNeeded: false,
});
const step = ref<InvitationStep>("prepare");
const dateObject = ref<Date>(new Date());

const modalTitle = computed(() => {
	return step.value === "prepare"
		? t("pages.rooms.members.inviteMember.firstStep.title")
		: t("pages.rooms.members.inviteMember.secondStep.title");
});

const onClose = () => emit("close");

const onInviteMembers = () => {
	setTimeout(() => {
		step.value = "share";
	}, 1000);
};

const inviteMembersContent = ref<VCard>();
useFocusTrap(inviteMembersContent, {
	immediate: true,
});
</script>
<style lang="scss" scoped></style>
