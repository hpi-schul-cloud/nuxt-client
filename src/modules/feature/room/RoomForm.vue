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
			<RoomColorPicker
				v-model:color="roomData.color"
				@update:color="onUpdateColor"
			/>
		</div>
		<div class="mb-8">
			Zeitraum
			<div class="d-flex flex-fill">
				<DatePicker
					:date="roomData.startDate"
					class="flex-1-1 mr-4"
					@update:date="onUpdateStartDate"
				/>
				<DatePicker
					:date="roomData.endDate"
					class="flex-1-1 ml-4"
					@update:date="onUpdateEndDate"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, watch } from "vue";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";
import { DatePicker } from "@ui-date-time-picker";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import { Room } from "@/types/room/Room";
import { RoomColor } from "@/serverApi/v3";

const props = defineProps({
	room: {
		type: Object as PropType<Room>,
		required: true,
	},
});

const emit = defineEmits([
	"update:color",
	"update:name",
	"update:startDate",
	"update:endDate",
]);

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
		emit("update:name", newTitle);
	}
);

const onUpdateColor = (color: RoomColor) => {
	emit("update:color", color);
};

const onUpdateStartDate = (newDate: string) => {
	emit("update:startDate", newDate);
};

const onUpdateEndDate = (newDate: string) => {
	emit("update:endDate", newDate);
};

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
</script>
