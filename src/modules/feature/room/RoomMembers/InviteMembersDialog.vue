<template>
	<VDialog
		v-model="isOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-add-participants"
		max-width="480"
		persistent
		@keydown.esc="onClose"
	>
		<v-card ref="inviteMembersContent">
			<template #title>
				<h2 class="text-h4 mt-2">
					{{ modalTitle }}
				</h2>
			</template>

			<template #text>
				<template v-if="step === InvitationStep.PREPARE">
					<p>
						{{ t("pages.rooms.members.inviteMember.firstStep.subTitle") }}
					</p>

					<InfoAlert>
						{{ t("pages.rooms.members.inviteMember.infoAlert.text") }}
					</InfoAlert>

					<div class="mt-4">
						<v-text-field
							v-model="formData.description"
							class="mb-2"
							:label="
								t('pages.rooms.members.inviteMember.form.description.label')
							"
							:hint="
								t('pages.rooms.members.inviteMember.form.description.hint')
							"
							persistent-hint
						/>

						<v-checkbox v-model="formData.onlySchoolMembers" hide-details>
							<template #label>
								<div class="mt-6">
									{{
										t(
											"pages.rooms.members.inviteMember.form.onlySchoolMembers.label"
										)
									}}
									<br />
									[{{ schoolName }}]
								</div>
							</template>
						</v-checkbox>

						<v-checkbox
							v-model="formData.validForStudents"
							:label="
								t(
									'pages.rooms.members.inviteMember.form.validForStudents.label'
								)
							"
							hide-details
						/>

						<div class="d-flex align-center justify-start my-n4">
							<v-checkbox
								v-model="formData.validUntil"
								:label="
									t('pages.rooms.members.inviteMember.form.linkExpires.label')
								"
								hide-details
								class="mr-2"
							/>

							<date-picker
								ref="datePicker"
								v-model="formData.validDate"
								:date="formData.validDate! || ''"
								class="mr-2 mt-2"
								data-testid="date-picker-until"
								style="max-width: 120px"
								@click="pause"
								@update:date="unpause"
							/>
						</div>

						<v-checkbox
							v-model="formData.isConfirmationNeeded"
							hide-details
							class="my-n6"
						>
							<template #label>
								<div class="mt-6">
									<i18n-t
										keypath="pages.rooms.members.inviteMember.form.isConfirmationNeeded.label"
										scope="global"
									>
										<a href="#" target="_blank" rel="noopener">
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
						share-url="https://www.schul.cloud/room/1234567890"
						type="roomMemberInvitation"
					/>
				</template>
			</template>

			<template #actions>
				<v-spacer />
				<div v-if="step === InvitationStep.PREPARE" class="mr-4 mb-3">
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

enum InvitationStep {
	PREPARE = "prepare",
	SHARE = "share",
}

const props = defineProps({
	schoolName: {
		type: String,
		required: true,
	},
	preDefinedStep: {
		type: String,
		default: "prepare",
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

const { t } = useI18n();
const { xs } = useDisplay();
const step = ref<string>();

import { onMounted } from "vue";

onMounted(() => {
	step.value = props.preDefinedStep;
});

const formData = ref({
	description: "",
	onlySchoolMembers: false,
	validForStudents: false,
	validUntil: false,
	validDate: new Date(),
	isConfirmationNeeded: false,
});

const modalTitle = computed(() => {
	return step.value === InvitationStep.PREPARE
		? t("pages.rooms.members.inviteMember.firstStep.title")
		: t("pages.rooms.members.inviteMember.secondStep.title");
});

const onClose = () => {
	emit("close");
	setTimeout(() => {
		step.value = InvitationStep.PREPARE;
	}, 1000);
};

const onInviteMembers = () => {
	setTimeout(() => {
		step.value = InvitationStep.SHARE;
	}, 1000);
};

const inviteMembersContent = ref<VCard>();
const { pause, unpause, deactivate } = useFocusTrap(inviteMembersContent, {
	immediate: true,
});

watch(
	() => isOpen.value,
	(newValue: boolean) => {
		if (!newValue) {
			deactivate();
		}
	}
);
</script>
