<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-invite-participants"
		max-width="480"
		@keydown.esc="onClose"
		@click:outside="onClose"
	>
		<v-card ref="inviteMembersContent">
			<template #title>
				<h2 class="text-h4 mt-2">
					{{ modalTitle }}
				</h2>
			</template>
			<template #text>
				<template v-if="invitationStep !== InvitationStep.SHARE">
					<p>
						{{ subTitle }}
					</p>

					<InfoAlert>
						{{ t("pages.rooms.members.inviteMember.infoAlert.text") }}
					</InfoAlert>

					<div class="mt-5">
						<v-text-field
							ref="descriptionField"
							v-model="formData.title"
							class="mb-2"
							:rules="validationRules"
							:label="
								t('pages.rooms.members.inviteMember.form.description.label')
							"
							:hint="
								t('pages.rooms.members.inviteMember.form.description.hint')
							"
							persistent-hint
							data-testid="invite-participant-description-input"
						/>

						<v-checkbox
							v-model="formData.restrictedToCreatorSchool"
							hide-details
							data-testid="input-invite-participants-restricted-to-creator-school"
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
							v-model="formData.isValidForStudents"
							:disabled="!formData.restrictedToCreatorSchool"
							:label="
								t(
									'pages.rooms.members.inviteMember.form.validForStudents.label'
								)
							"
							hide-details
							data-testid="input-invite-participants-valid-for-students"
						/>

						<div class="d-flex align-center justify-start my-n4 pr-0">
							<v-checkbox
								v-model="formData.activeUntilChecked"
								:label="
									t('pages.rooms.members.inviteMember.form.linkExpires.label')
								"
								hide-details
								class="mr-2"
								data-testid="input-invite-participants-link-expires"
							/>
							<DatePicker
								ref="datePicker"
								v-model="formData.activeUntil"
								:disabled="isDatePickerDisabled"
								:required="!isDatePickerDisabled"
								:min-date="new Date().toString()"
								:date="datePickerDate"
								class="mt-1"
								data-testid="date-picker-until"
								@click.prevent="pause"
								@keydown.space.enter.prevent="pause"
								@update:date="onUpdateDate"
							/>
						</div>

						<v-checkbox
							v-model="formData.requiresConfirmation"
							hide-details
							class="my-n6"
							data-testid="input-invite-participants-requires-confirmation"
						>
							<template #label>
								<div class="mt-6">
									<i18n-t
										keypath="pages.rooms.members.inviteMember.form.isConfirmationNeeded.label"
										scope="global"
									>
										<a :href="informationLink!" target="_blank" rel="noopener">
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
						:share-url="sharedUrl"
						type="roomMemberInvitation"
						@copied="onCopyLink"
						@done="onClose"
					/>
				</template>
			</template>

			<template #actions>
				<v-spacer />
				<div v-if="invitationStep !== InvitationStep.SHARE" class="mr-4 mb-3">
					<v-btn
						ref="cancelButton"
						class="ms-auto mr-2"
						:text="t('common.actions.cancel')"
						data-testid="invite-participant-cancel-btn"
						@click="onClose"
					/>
					<v-btn
						ref="continueButton"
						class="ms-auto"
						color="primary"
						variant="flat"
						:disabled="isSubmitDisabled"
						:text="t('common.actions.continue')"
						data-testid="invite-participant-save-btn"
						@click="onContinue"
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
import { computed, ref, useTemplateRef, watch } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import type { VCard, VTextField } from "vuetify/components";
import { InfoAlert } from "@ui-alert";
import { DatePicker } from "@ui-date-time-picker";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { useDisplay } from "vuetify";
import {
	CreateRoomInvitationLinkDto,
	InvitationStep,
	UpdateRoomInvitationLinkDto,
	useRoomInvitationLinkStore,
	RoomInvitationFormData,
} from "@data-room";
import { envConfigModule } from "@/store";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { storeToRefs } from "pinia";
import { isNonEmptyString, isOfMaxLength } from "@util-validators";
import { useOpeningTagValidator } from "@/utils/validation";

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
}>();

const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { createLink, updateLink } = useRoomInvitationLinkStore();
const { invitationStep, sharedUrl, editedLink, DEFAULT_EXPIRED_DATE } =
	storeToRefs(useRoomInvitationLinkStore());
const { validateOnOpeningTag } = useOpeningTagValidator();

const { t } = useI18n();
const { xs } = useDisplay();

const defaultFormData: RoomInvitationFormData = {
	title: "",
	restrictedToCreatorSchool: true,
	isValidForStudents: false,
	activeUntilChecked: false,
	activeUntil: undefined,
	requiresConfirmation: true,
	id: "",
};

const formData = ref({ ...defaultFormData });
const descriptionField = useTemplateRef("descriptionField");

const validationRules = [
	isNonEmptyString(t("common.validation.nonEmptyString")),
	isOfMaxLength(100)(t("common.validation.tooLong")),
	validateOnOpeningTag,
];

const isDatePickerDisabled = computed(() => {
	return !formData.value.activeUntilChecked;
});

const isSubmitDisabled = computed(() => {
	return formData.value.activeUntilChecked && !formData.value.activeUntil;
});

const modalTitle = computed(() => {
	const titleMap = {
		[InvitationStep.EDIT]: t(
			"pages.rooms.members.inviteMember.step.edit.title"
		),
		[InvitationStep.SHARE]: t(
			"pages.rooms.members.inviteMember.step.share.title"
		),
		[InvitationStep.PREPARE]: t(
			"pages.rooms.members.inviteMember.step.prepare.title"
		),
	};

	return titleMap[invitationStep.value];
});

const subTitle = computed(() => {
	if (invitationStep.value === InvitationStep.SHARE) return null;
	const subTitleMap = {
		[InvitationStep.EDIT]: t(
			"pages.rooms.members.inviteMember.editStep.subTitle"
		),
		[InvitationStep.PREPARE]: t(
			"pages.rooms.members.inviteMember.firstStep.subTitle"
		),
	};

	return subTitleMap[invitationStep.value];
});

const onUpdateDate = (date: Date) => {
	formData.value.activeUntil = date;
	unpause();
};

const onClose = () => {
	emit("close");
	editedLink.value = null;

	setTimeout(() => {
		formData.value = { ...defaultFormData };
	}, 1000);
};

const onContinue = async () => {
	if (invitationStep.value === InvitationStep.SHARE) return;

	const validationResult = await descriptionField.value?.validate?.();
	if (validationResult && validationResult.length > 0) {
		return;
	}

	const baseParams = {
		title: formData.value.title,
		activeUntil:
			formData.value.activeUntilChecked && !!formData.value.activeUntil
				? formData.value.activeUntil.toString()
				: DEFAULT_EXPIRED_DATE.value,
		isOnlyForTeachers: !formData.value.isValidForStudents,
		restrictedToCreatorSchool: formData.value.restrictedToCreatorSchool,
		requiresConfirmation: formData.value.requiresConfirmation,
	};

	const createOrUpdateLinkBodyParams:
		| UpdateRoomInvitationLinkDto
		| CreateRoomInvitationLinkDto =
		invitationStep.value === InvitationStep.EDIT
			? { ...baseParams, id: formData.value.id }
			: baseParams;

	const endpointMap = {
		[InvitationStep.PREPARE]: () =>
			createLink(createOrUpdateLinkBodyParams as CreateRoomInvitationLinkDto),
		[InvitationStep.EDIT]: () =>
			updateLink(createOrUpdateLinkBodyParams as UpdateRoomInvitationLinkDto),
	};

	await endpointMap[invitationStep.value]();
	formData.value = { ...defaultFormData };
};

const onCopyLink = () => {
	notifierModule.show({
		text: t("common.words.copiedToClipboard"),
		status: "success",
		timeout: 5000,
	});
};

const datePickerDate = computed(() => {
	return formData.value.activeUntilChecked && !!formData.value.activeUntil
		? formData.value.activeUntil.toString()
		: "";
});

const inviteMembersContent = ref<VCard>();
const { pause, unpause, deactivate } = useFocusTrap(inviteMembersContent, {
	immediate: true,
});

watch(
	() => formData.value.restrictedToCreatorSchool,
	(isRestrictedToCreatorSchool: boolean) => {
		if (isRestrictedToCreatorSchool === false) {
			formData.value.isValidForStudents = false;
		}
	}
);

watch(
	() => editedLink.value,
	(newVal) => {
		if (newVal) {
			formData.value.id = newVal.id;
			formData.value.title = newVal.title;
			formData.value.restrictedToCreatorSchool =
				newVal.restrictedToCreatorSchool;
			formData.value.isValidForStudents = !newVal.isOnlyForTeachers;
			formData.value.activeUntilChecked = newVal.activeUntil !== undefined;
			formData.value.activeUntil = newVal.activeUntil
				? new Date(newVal.activeUntil)
				: undefined;
			formData.value.requiresConfirmation = newVal.requiresConfirmation;
		}
	}
);

watch(
	() => isOpen.value,
	(isOpen: boolean) => {
		if (isOpen === false) {
			deactivate();
		}
	}
);

const informationLink = computed(
	() => envConfigModule.getEnv.ROOM_MEMBER_INFO_URL
);
</script>
