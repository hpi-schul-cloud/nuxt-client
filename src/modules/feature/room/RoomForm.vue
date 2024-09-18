<template>
	<div>
		<VTextField
			v-model="roomData.title"
			label="Name des Raumes"
			class="mb-8"
			:error-messages="
				v$.roomData.title.$errors.map((e: ErrorObject) => e.$message)
			"
			@blur="v$.roomData.title.$touch"
		/>
		<div class="mb-8">
			<RoomColorPicker v-model:color="roomData.displayColor" />
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
		<div class="d-flex">
			<VSpacer />
			<VBtn variant="text" class="mr-4" @click="onCancel">
				{{ $t("common.actions.cancel") }}
			</VBtn>
			<VBtn variant="flat" color="primary" @click="onSave">
				{{ $t("common.actions.save") }}
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch, watchEffect } from "vue";
import { RoomColorEnum } from "./RoomColorPicker/types";
import RoomColorPicker from "./RoomColorPicker/RoomColorPicker.vue";
import { DatePicker } from "@ui-date-time-picker";
import { Room } from "@/types/room/Room";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const props = defineProps({
	room: {
		type: Object as PropType<Room | undefined>,
	},
});

const router = useRouter();
const { t } = useI18n();

const roomData = ref<Partial<Room>>({
	title: "",
	shortTitle: "",
	displayColor: RoomColorEnum.BLUE_GREY,
	startDate: "",
	endDate: "",
});

watchEffect(() => {
	if (props.room) {
		roomData.value = props.room;
	}
});

// generate short title
watch(
	() => roomData.value.title,
	(newTitle, oldTitle) => {
		if (!newTitle || newTitle === oldTitle) return;
		if (newTitle.length < 2) return;

		const shortTitle = newTitle?.slice(0, 2);
		if (shortTitle === roomData.value.shortTitle) return;

		roomData.value.shortTitle = shortTitle;
	}
);

const onUpdateStartDate = (newDate: string) => {
	roomData.value.startDate = newDate;
};

const onUpdateEndDate = (newDate: string) => {
	roomData.value.endDate = newDate;
};

const onSave = () => {
	console.log(roomData.value);
};

const onCancel = () => {
	// TODO use useConfirmationDialog here, when it's refactored
	router.go(-1);
};

// Validation
const rules = computed(() => ({
	roomData: {
		title: {
			required: helpers.withMessage(t("common.validation.required2"), required),
		},
	},
}));

const v$ = useVuelidate(rules, { roomData }, { $lazy: true });

watch(
	() => v$.value,
	() => {
		console.log("hello?", v$.value);
	}
);
</script>
