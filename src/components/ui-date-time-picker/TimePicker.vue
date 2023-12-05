<template>
	<div>
		<v-menu
			v-model="showTimeDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			max-height="200"
			min-width="180"
		>
			<template #activator="{ props }">
				<v-text-field
					v-bind="props"
					v-model="timeValue"
					ref="inputField"
					data-testid="time-input"
					variant="underlined"
					color="primary"
					append-inner-icon="$mdiClockOutline"
					:label="label"
					:aria-label="ariaLabel"
					placeholder="HH:MM"
					:error-messages="errorMessages"
					v-time-input-mask
					@update:model-value="validate"
					@keydown.prevent.space="showTimeDialog = true"
					@keydown.prevent.enter="showTimeDialog = true"
					@keydown.up.down.stop
					@keydown.tab="showTimeDialog = false"
				/>
			</template>

			<v-list
				v-model:selected="selected"
				class="col-12 pt-1 px-0 overflow-y-auto"
			>
				<div
					v-for="(timeOfDay, index) in timesOfDayList"
					:key="`time-select-${index}`"
				>
					<v-list-item
						:data-testid="`time-select-${index}`"
						class="time-list-item text-left"
						:value="timeOfDay.value"
						color="primary"
						@click="onSelect(timeOfDay.value)"
					>
						<v-list-item-title>{{ timeOfDay.value }}</v-list-item-title>
					</v-list-item>
					<v-divider v-if="index < timesOfDayList.length - 1" />
				</div>
			</v-list>
		</v-menu>
	</div>
</template>

<script setup lang="ts">
import { computedAsync, useDebounceFn } from "@vueuse/core";
import { computed, ref, watchEffect } from "vue";
import { useTimePickerState } from "./TimePickerState.composable";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { helpers, requiredIf } from "@vuelidate/validators";
import { timeInputMask as vTimeInputMask } from "@util-input-masks";
import { isValidTimeFormat } from "@util-validators";

const props = defineProps({
	time: { type: String, required: true },
	label: { type: String, default: "" },
	ariaLabel: { type: String, default: "" },
	required: { type: Boolean },
});
const emit = defineEmits(["update:time", "error"]);

const { t } = useI18n();
const { timesOfDayList } = useTimePickerState();

const showTimeDialog = ref(false);
const inputField = ref<HTMLInputElement | null>(null);
const timeValue = ref<undefined | string>();
const selected = ref<Array<string>>([]);

watchEffect(() => {
	timeValue.value = props.time;
	selected.value = [props.time];
});

const rules = computed(() => ({
	timeValue: {
		requiredIfProp: helpers.withMessage(
			t("components.timePicker.validation.required"),
			requiredIf(props.required)
		),
		validDateFormat: helpers.withMessage(
			t("components.timePicker.validation.format"),
			isValidTimeFormat
		),
	},
}));

const v$ = useVuelidate(rules, { timeValue }, { $lazy: true });

const errorMessages = computedAsync(async () => {
	return await getErrorMessages(v$.value.timeValue);
}, null);

const getErrorMessages = useDebounceFn((validationModel: any) => {
	const messages = validationModel.$errors.map((e: any) => {
		return e.$message;
	});
	return messages;
}, 1000);

const validate = () => {
	v$.value.timeValue.$touch();
	v$.value.$validate();

	if (!v$.value.timeValue.$invalid) {
		emitTime();
	} else {
		emit("error");
	}
};

const emitTime = () => {
	emit("update:time", timeValue.value);
};

const onSelect = async (selected: string) => {
	timeValue.value = selected;

	closeAndEmit();
};

const closeAndEmit = () => {
	showTimeDialog.value = false;
	inputField.value?.focus();

	emitTime();
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.time-list-item {
	min-height: 42px;
	text-align: center;
	letter-spacing: $btn-letter-spacing;
}

:deep {
	.v-field__append-inner .v-icon {
		width: 20px;
		height: 20px;
	}
}
</style>
