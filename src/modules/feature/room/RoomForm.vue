<template>
	<form @submit.prevent="onSave">
		<div>
			<VTextField
				v-model="roomData.name"
				class="mb-8"
				:label="t('components.roomForm.labels.roomName')"
				:error-messages="
					v$.roomData.name.$errors.map((e: ErrorObject) => unref(e.$message))
				"
				data-testid="room-name-input"
			/>
			<div class="mb-8">
				<RoomColorPicker
					v-model:color="roomData.color"
					@update:color="onUpdateColor"
				/>
			</div>
			<div class="mb-8">
				<label class="d-flex mb-2">
					{{ t("components.roomForm.labels.timePeriod") }}
				</label>
				<div class="d-flex">
					<DatePicker
						:date="roomData.startDate"
						:min-date="todayISO"
						:errors="startDateErrors"
						class="w-50 mr-4"
						data-testid="room-start-date-input"
						:aria-label="t('components.roomForm.labels.timePeriod.from')"
						@update:date="onUpdateStartDate"
					/>
					<DatePicker
						:date="roomData.endDate"
						:min-date="todayISO"
						class="w-50 ml-4"
						data-testid="room-end-date-input"
						:aria-label="t('components.roomForm.labels.timePeriod.to')"
						@update:date="onUpdateEndDate"
					/>
				</div>
			</div>
			<div class="mb-16">
				<h2 class="mb-1 text-subtitle-1">
					{{ t("components.roomForm.labels.videoConference.title") }}
				</h2>
				<div class="d-flex mt-1">
					<v-checkbox
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
					</v-checkbox>
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
				type="submit"
				data-testid="room-form-save-btn"
			>
				{{ t("common.actions.save") }}
			</VBtn>
		</div>
		<ConfirmationDialog />
	</form>
</template>

<script setup lang="ts">
import { DATETIME_FORMAT } from "@/plugins/datetime";
import { RoomCreateParams, RoomUpdateParams } from "@/types/room/Room";
import { containsOpeningTagFollowedByString } from "@/utils/validation";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
import { DatePicker } from "@ui-date-time-picker";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import { helpers, maxLength, required } from "@vuelidate/validators";
import dayjs from "dayjs";
import { computed, PropType, unref } from "vue";
import { useI18n } from "vue-i18n";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";
import { RoomFeatures } from "@/serverApi/v3";

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
const todayISO = computed(() =>
	dayjs.tz(new Date(), "DD.MM.YYYY", "UTC").format(DATETIME_FORMAT.inputDate)
);

const isStartBeforeEndDate = (
	startDate: string | undefined,
	endDate: string | undefined
) => {
	if (!startDate || !endDate) return true;
	return new Date(startDate) <= new Date(endDate);
};

const areDatesSameDay = (
	startDate: string | undefined,
	endDate: string | undefined
) => {
	if (!startDate || !endDate) return true;

	const start = new Date(startDate);
	const end = new Date(endDate);
	return (
		start.getFullYear() === end.getFullYear() &&
		start.getMonth() === end.getMonth() &&
		start.getDate() === end.getDate()
	);
};

const isStartBeforeOrEqualToEndDate = (
	startDate: string | undefined,
	endDate: string | undefined
) => {
	return (
		isStartBeforeEndDate(startDate, endDate) ||
		areDatesSameDay(startDate, endDate)
	);
};

const startBeforeEndDateValidator = (endDate: string | undefined) => {
	return helpers.withParams(
		{ type: "startBeforeEndDate", value: endDate },
		helpers.withMessage(
			t("components.roomForm.validation.timePeriod.startBeforeEnd"),
			(startDate: string) => isStartBeforeOrEqualToEndDate(startDate, endDate)
		)
	);
};

const validationRules = computed(() => ({
	roomData: {
		name: {
			maxLength: helpers.withMessage(
				t("common.validation.tooLong"),
				maxLength(100)
			),
			containsOpeningTag: helpers.withMessage(
				t("common.validation.containsOpeningTag"),
				(name: string) => !containsOpeningTagFollowedByString(name)
			),
			required: helpers.withMessage(t("common.validation.required2"), required),
		},
		startDate: {
			startBeforeEndDate: startBeforeEndDateValidator(roomData.value.endDate),
		},
	},
}));

const v$ = useVuelidate(
	validationRules,
	{ roomData },
	{ $lazy: true, $autoDirty: true }
);

const startDateErrors = computed(() => v$.value.roomData.startDate.$errors);

const onUpdateColor = () => {
	v$.value.$touch();
};

const onUpdateStartDate = (newDate: string) => {
	roomData.value.startDate = newDate;
};

const onUpdateEndDate = (newDate: string) => {
	roomData.value.endDate = newDate;
};

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
	const valid = await v$.value.$validate();
	if (valid) {
		emit("save", { room: roomData.value });
	}
};

const onCancel = async () => {
	const noChangesMade = !v$.value.$anyDirty;
	if (noChangesMade) emit("cancel");

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
