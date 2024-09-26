<template>
	<form @submit.prevent="onSave">
		<div>
			<VTextField
				v-model="roomData.name"
				label="Name des Raumes"
				class="mb-8"
				:error-messages="
					v$.roomData.name.$errors.map((e: ErrorObject) => unref(e.$message))
				"
				@blur="v$.roomData.name.$touch"
			/>
			<div class="mb-8">
				<RoomColorPicker v-model:color="roomData.color" />
			</div>
			<div class="mb-8">
				Zeitraum
				<div class="d-flex flex-fill">
					<DatePicker v-model="roomData.startDate" class="flex-1-1 mr-4" />
					<DatePicker v-model="roomData.endDate" class="flex-1-1 ml-4" />
				</div>
			</div>
		</div>
		<div class="d-flex">
			<VSpacer />
			<VBtn variant="text" class="mr-4" @click="onCancel">
				{{ $t("common.actions.cancel") }}
			</VBtn>
			<VBtn variant="flat" color="primary" type="submit">
				{{ $t("common.actions.save") }}
			</VBtn>
		</div>
	</form>
</template>

<script setup lang="ts">
import { computed, PropType, unref } from "vue";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";
import { DatePicker } from "@ui-date-time-picker";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import { RoomCreateParams, RoomUpdateParams } from "@/types/room/Room";

const props = defineProps({
	room: {
		type: Object as PropType<RoomCreateParams | RoomUpdateParams>,
		required: true,
	},
});

const emit = defineEmits(["save", "cancel"]);

const roomData = computed(() => props.room);

const { t } = useI18n();

// Validation
const rules = computed(() => ({
	roomData: {
		name: {
			required: helpers.withMessage(t("common.validation.required2"), required),
		},
	},
}));

const v$ = useVuelidate(rules, { roomData }, { $lazy: true, $autoDirty: true });

const onSave = async () => {
	const valid = await v$.value.$validate();
	if (!valid) {
		// TODO notify user form is invalid
		return;
	}
	emit("save", roomData.value);
};

const onCancel = () => {
	emit("cancel");
};
</script>
