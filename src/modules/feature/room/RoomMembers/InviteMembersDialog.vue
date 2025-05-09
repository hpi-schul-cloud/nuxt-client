<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-invite-participants"
		max-width="480"
		@keydown.esc="onClose"
	>
		<v-card ref="inviteMembersContent">
			<template #title>
				<h2 class="text-h4 mt-2">
					{{ modalTitle }}
				</h2>
			</template>

			<template #text>
				<template v-if="invitationStep === 'prepare'">
					<p>
						{{ t("pages.rooms.members.inviteMember.firstStep.subTitle") }}
					</p>

					<InfoAlert>
						{{ t("pages.rooms.members.inviteMember.infoAlert.text") }}
					</InfoAlert>

					<div class="mt-5">
						<v-text-field
							v-model="formData.title"
							class="mb-2"
							:label="
								t('pages.rooms.members.inviteMember.form.description.label')
							"
							:hint="
								t('pages.rooms.members.inviteMember.form.description.hint')
							"
							persistent-hint
						/>

						<v-checkbox
							v-model="formData.restrictedToCreatorSchool"
							hide-details
						>
							<template #label>
								<div class="mt-6">
									{{
										t(
											"pages.rooms.members.inviteMember.form.onlySchoolMembers.label"
										)
									}}
									<span class="d-inline-block">
										{{ schoolName }}
									</span>
								</div>
							</template>
						</v-checkbox>

						<v-checkbox
							v-model="formData.isAlsoForStudents"
							:disabled="!formData.restrictedToCreatorSchool"
							:label="
								t(
									'pages.rooms.members.inviteMember.form.validForStudents.label'
								)
							"
							hide-details
						/>

						<div class="d-flex align-center justify-start my-n4">
							<v-checkbox
								v-model="formData.activeUntilCheck"
								:label="
									t('pages.rooms.members.inviteMember.form.linkExpires.label')
								"
								hide-details
								class="mr-2"
							/>

							<date-picker
								ref="datePicker"
								v-model="formData.activeUntil"
								:disabled="isDatePickerDisabled"
								:min-date="new Date().toString()"
								class="mr-2 mt-2"
								data-testid="date-picker-until"
								max-width="110px"
								@click.prevent="pause"
								@keydown.space.enter.prevent="pause"
								@update:date="onUpdateValidDate"
							/>
						</div>

						<v-checkbox
							v-model="formData.requiresConfirmation"
							hide-details
							class="my-n6"
						>
							<template #label>
								<div class="mt-6">
									<i18n-t
										keypath="pages.rooms.members.inviteMember.form.isConfirmationNeeded.label"
										scope="global"
									>
										<a :href="informationLink" target="_blank" rel="noopener">
											{{ t("pages.rooms.members.infoText.moreInformation") }}
										</a>
									</i18n-t>
								</div>
							</template>
						</v-checkbox>
					</div>
				</template>
				<template v-else>
					<ShareModalResult
						:share-url="sharedUrl!"
						type="roomMemberInvitation"
						@copied="onCopyLink"
						@done="onClose"
					/>
				</template>
			</template>

			<template #actions>
				<v-spacer />
				<div v-if="invitationStep === 'prepare'" class="mr-4 mb-3">
					<v-btn
						ref="cancelButton"
						class="ms-auto mr-2"
						color="primary"
						:text="t('common.actions.cancel')"
						data-testid="invite-participant-cancel-btn"
						@click="onClose"
					/>
					<v-btn
						ref="continueButton"
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
	</VDialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed, ref, watch } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { VCard } from "vuetify/lib/components/index.mjs";
import { InfoAlert } from "@ui-alert";
import { DatePicker } from "@ui-date-time-picker";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { useDisplay } from "vuetify";
import { useRoomInvitationLinkStore } from "@data-room";
import { envConfigModule } from "@/store";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { storeToRefs } from "pinia";

defineProps({
	schoolName: {
		type: String,
		default: "",
	},
});

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	(e: "close"): void;
	(e: "update:modelValue", value: boolean): void;
}>();

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { createLink } = useRoomInvitationLinkStore();
const { invitationStep, sharedUrl, editedLink } = storeToRefs(
	useRoomInvitationLinkStore()
);

const { t } = useI18n();
const { xs } = useDisplay();

const defaultFormData = {
	title: "",
	restrictedToCreatorSchool: true,
	isAlsoForStudents: false,
	activeUntilCheck: false,
	activeUntil: new Date(),
	requiresConfirmation: true,
};

const formData = ref({ ...defaultFormData });

const isDatePickerDisabled = computed(() => {
	return !formData.value.activeUntilCheck;
});

const modalTitle = computed(() => {
	return invitationStep.value === "prepare"
		? t("pages.rooms.members.inviteMember.firstStep.title")
		: t("pages.rooms.members.inviteMember.secondStep.title");
});

const onUpdateValidDate = (date: Date) => {
	formData.value.activeUntil = date;
	unpause();
};

const onClose = () => {
	emit("close");

	setTimeout(() => {
		formData.value = { ...defaultFormData };
		invitationStep.value = "prepare";
	}, 1000);
};

const onInviteMembers = async () => {
	const createLinkBodyParams = {
		title: formData.value.title || "invitation link",
		activeUntil: formData.value.activeUntilCheck
			? formData.value.activeUntil.toString()
			: "2900-01-01T00:00:00.000Z",
		isOnlyForTeachers: !formData.value.isAlsoForStudents,
		restrictedToCreatorSchool: formData.value.restrictedToCreatorSchool,
		requiresConfirmation: formData.value.requiresConfirmation,
	};
	await createLink(createLinkBodyParams);

	invitationStep.value = "share";
};

const onCopyLink = () => {
	notifierModule.show({
		text: t("common.words.copiedToClipboard"),
		status: "success",
		timeout: 5000,
	});
};

const inviteMembersContent = ref<VCard>();
const { pause, unpause, deactivate } = useFocusTrap(inviteMembersContent, {
	immediate: true,
});

watch(
	() => formData.value.restrictedToCreatorSchool,
	(newVal) => {
		if (!newVal) {
			formData.value.isAlsoForStudents = false;
		}
	}
);

watch(isOpen, (newVal) => {
	if (!newVal) {
		deactivate();
	}
});

watch(
	() => editedLink.value,

	(newVal) => {
		if (newVal) {
			formData.value.title = newVal.title;
			formData.value.restrictedToCreatorSchool =
				newVal.restrictedToCreatorSchool;
			formData.value.isAlsoForStudents = newVal.isOnlyForTeachers;
			formData.value.activeUntil = new Date(newVal.activeUntil!);
			formData.value.requiresConfirmation = newVal.requiresConfirmation;
		}
	},
	{ immediate: true }
);

const informationLink = computed(() =>
	envConfigModule.getEnv.ROOM_MEMBER_INFO_URL
		? envConfigModule.getEnv.ROOM_MEMBER_INFO_URL
		: "https://docs.dbildungscloud.de/display/SCDOK/Teameinladung+freigeben"
);
</script>
