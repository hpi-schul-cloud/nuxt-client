<template>
	<div>
		<VTextField
			v-model="roomData.name"
			label="Name des Raumes"
			class="mb-8"
			:error-messages="
				v$.roomData.title.$errors.map((e: ErrorObject) => e.$message)
			"
			@blur="v$.roomData.title.$touch"
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
		<VBtn variant="flat" color="primary" @click="onSave">
			{{ $t("common.actions.save") }}
		</VBtn>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, watch } from "vue";
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

// generate short title
watch(
	() => roomData.value.name,
	(newTitle, oldTitle) => {
		if (!newTitle || newTitle === oldTitle) return;
		if (newTitle.length < 2) return;

		const shortTitle = newTitle?.slice(0, 2);
		if (shortTitle === roomData.value.name) return;
		// still needed at all?
		// emit("update:name", newTitle);
	}
);

// Validation
const rules = computed(() => ({
	roomData: {
		title: {
			required: helpers.withMessage(t("common.validation.required2"), required),
		},
	},
}));

const v$ = useVuelidate(rules, { roomData }, { $lazy: true, $autoDirty: true });

watch(
	() => v$.value,
	() => {
		console.log("hello?", v$.value);
	}
);

const onSave = () => {
	emit("save", roomData.value);
};

const onCancel = () => {
	emit("cancel");
};
</script>
