<template>
	<VForm ref="roomForm">
		<div>
			<VTextField
				ref="roomNameInput"
				v-model="roomData.name"
				class="mb-8"
				:label="t('components.roomForm.labels.roomName')"
				counter="100"
				:rules="validationRules"
				autofocus
			/>

			<RoomColorPicker v-model:color="roomData.color" class="mb-8" />
			<div class="mt-6 mb-16">
				<div class="mb-1 text-subtitle-1">
					{{ t("components.roomForm.labels.videoConference.title") }}
				</div>
				<div class="d-flex mt-1">
					<VCheckbox
						:model-value="
							roomData.features.includes(
								RoomFeatures.EditorManageVideoconference
							)
						"
						class="align-start video-conference-checkbox"
						data-testid="room-video-conference-checkbox"
						@update:model-value="onToggleVideoConferenceFeature"
					>
						<template #label>
							<div class="d-flex flex-column mt-2">
								{{ t("components.roomForm.labels.videoConference.label") }}
								<span class="checkbox-label mb-1">
									{{
										t("components.roomForm.labels.videoConference.helperText")
									}}
								</span>
							</div>
						</template>
					</VCheckbox>
				</div>
			</div>
		</div>
		<div class="d-flex">
			<VSpacer />
			<VBtn
				variant="text"
				class="mr-4"
				data-testid="room-form-cancel-btn"
				@click="onCancel"
			>
				{{ t("common.actions.cancel") }}
			</VBtn>
			<VBtn
				variant="flat"
				color="primary"
				data-testid="room-form-save-btn"
				@click="onSave"
			>
				{{ t("common.actions.save") }}
			</VBtn>
		</div>
		<ConfirmationDialog />
	</VForm>
</template>

<script setup lang="ts">
import { RoomCreateParams, RoomUpdateParams } from "@/types/room/Room";
import { useOpeningTagValidator } from "@/utils/validation";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
import { computed, PropType, ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";
import { RoomFeatures } from "@/serverApi/v3";
import { isNonEmptyString, isOfMaxLength } from "@util-validators";
import { VCheckbox, VForm } from "vuetify/components";

const props = defineProps({
	room: {
		type: Object as PropType<RoomCreateParams | RoomUpdateParams>,
		required: true,
	},
});
const emit = defineEmits(["save", "cancel"]);

const { t } = useI18n();
const { askConfirmation } = useConfirmationDialog();

const roomData = computed(() => props.room);
const initialRoomData = ref(JSON.stringify(roomData.value));
const roomForm = useTemplateRef("roomForm");

// Todo: make error messages more clear? Talk to UX about best practice
const { validateOnOpeningTag } = useOpeningTagValidator();
const validationRules = [
	isOfMaxLength(100)(t("common.validation.tooLong")),
	validateOnOpeningTag,
	isNonEmptyString(t("common.validation.nonEmptyString")),
];

const onToggleVideoConferenceFeature = (isChecked: boolean | null) => {
	const features = roomData.value.features;

	const index = features.indexOf(RoomFeatures.EditorManageVideoconference);
	if (isChecked && index === -1) {
		features.push(RoomFeatures.EditorManageVideoconference);
	}
	if (!isChecked && index > -1) {
		features.splice(index, 1);
	}
};

const onSave = async () => {
	if (roomForm.value === null) return;

	const { valid, errors } = await roomForm.value.validate();
	if (valid) {
		emit("save", { room: roomData.value });
	} else if (errors.length > 0) {
		// Workaround for Vuetify 3.9.4 fast-fail inputs errors will not be announced to screen readers on submitting,
		// so we are focusing the first invalid input to announce the error.
		// More Information: https://github.com/vuetifyjs/vuetify/issues/21920
		const firstErrorId = errors[0].id as string;
		document.getElementById(firstErrorId)?.focus();
	}
};

const onCancel = async () => {
	const isFormUnchanged =
		JSON.stringify(roomData.value) === initialRoomData.value;
	if (isFormUnchanged) emit("cancel");

	const shouldCancel = await askConfirmation({
		message: t("ui-confirmation-dialog.ask-cancel-form"),
		confirmActionLangKey: "common.actions.discard",
	});

	if (shouldCancel) {
		emit("cancel");
	}
};
</script>

<style lang="scss" scoped>
.checkbox-label {
	font-size: var(--text-sm);
	opacity: var(--v-medium-emphasis-opacity);
}

.video-conference-checkbox {
	::v-deep(.v-selection-control) {
		align-items: flex-start;
	}
}
</style>
