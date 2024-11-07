<template>
	<form @submit.prevent="onSave">
		<div>
			<VTextField
				v-model="roomData.name"
				class="mb-8"
				:label="$t('components.roomForm.labels.roomName')"
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
				<label id="time-period-label" class="d-flex mb-2">
					{{ $t("components.roomForm.labels.timePeriod") }}
				</label>
				<div class="d-flex">
					<DatePicker
						:date="roomData.startDate"
						:min-date="todayISO"
						:errors="startDateErrors"
						class="w-50 mr-4"
						data-testid="room-start-date-input"
						aria-labelledby="time-period-label"
						@update:date="onUpdateStartDate"
					/>
					<DatePicker
						:date="roomData.endDate"
						:min-date="todayISO"
						:errors="endDateErrors"
						class="w-50 ml-4"
						data-testid="room-end-date-input"
						aria-labelledby="time-period-label"
						@update:date="onUpdateEndDate"
					/>
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
				{{ $t("common.actions.cancel") }}
			</VBtn>
			<VBtn
				variant="flat"
				color="primary"
				type="submit"
				data-testid="room-form-save-btn"
			>
				{{ $t("common.actions.save") }}
			</VBtn>
		</div>
		<ConfirmationDialog />
	</form>
</template>

<script setup lang="ts">
import { computed, PropType, unref } from "vue";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";
import { DatePicker } from "@ui-date-time-picker";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import { helpers, required, maxLength } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import { RoomCreateParams, RoomUpdateParams } from "@/types/room/Room";
import {
	ConfirmationDialog,
	useConfirmationDialog,
} from "@ui-confirmation-dialog";
import { DATETIME_FORMAT } from "@/plugins/datetime";
import dayjs from "dayjs";

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

const startBeforeEndDate = (compareDate: {
	date: string | undefined;
	type: "startDate" | "endDate";
}) => {
	const givenDateIsStartDate = compareDate.type === "endDate";

	return helpers.withParams(
		{ type: "startBeforeEndDate", value: compareDate },
		helpers.withMessage(
			t("components.roomForm.validation.timePeriod.startBeforeEnd"),
			(givenDate: string) => {
				let startDate: string | undefined;
				let endDate: string | undefined;

				if (givenDateIsStartDate) {
					startDate = givenDate;
					endDate = compareDate.date;
				} else {
					startDate = compareDate.date;
					endDate = givenDate;
				}

				if (!startDate || !endDate) return true;
				return new Date(startDate) < new Date(endDate);
			}
		)
	);
};

// Validation
const validationRules = computed(() => ({
	roomData: {
		name: {
			maxLength: maxLength(100),
			required: helpers.withMessage(t("common.validation.required2"), required),
		},
		startDate: {
			startBeforeEndDate: startBeforeEndDate({
				date: roomData.value.endDate,
				type: "endDate",
			}),
		},
		endDate: {
			startBeforeEndDate: startBeforeEndDate({
				date: roomData.value.startDate,
				type: "startDate",
			}),
		},
	},
}));

const v$ = useVuelidate(
	validationRules,
	{ roomData },
	{ $lazy: true, $autoDirty: true }
);

const startDateErrors = computed(() => v$.value.roomData.startDate.$errors);
const endDateErrors = computed(() => v$.value.roomData.endDate.$errors);

const onUpdateColor = () => {
	v$.value.$touch();
};

const onUpdateStartDate = (newDate: string) => {
	roomData.value.startDate = newDate;
};

const onUpdateEndDate = (newDate: string) => {
	roomData.value.endDate = newDate;
};

const onSave = async () => {
	const valid = await v$.value.$validate();
	if (!valid) {
		// TODO notify user form is invalid
		return;
	}
	emit("save", roomData.value);
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
