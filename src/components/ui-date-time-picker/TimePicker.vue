<template>
	<div>
		<v-menu
			v-model="showTimeDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			nudge-bottom="150"
			max-height="200"
			min-width="180"
			auto
		>
			<template #activator="{ on, attrs }">
				<v-text-field
					ref="inputField"
					v-model="modelValue"
					v-bind="attrs"
					v-on="on"
					:label="label"
					:aria-label="ariaLabel"
					placeholder="HH:MM"
					append-icon="$mdiClockOutline"
					:rules="rules"
					data-testid="time-input"
					v-timeInputMask
					:class="{ 'menu-open': showTimeDialog }"
					@keydown.prevent.space="showTimeDialog = true"
					@keydown.prevent.enter="showTimeDialog = true"
					@keydown.up.down.stop
					@update:error="onError"
				/>
			</template>
			<v-list class="col-12 pt-1 px-0 overflow-y-auto">
				<v-list-item-group color="primary" v-model="selectedTime">
					<div
						v-for="(timeOfDay, index) in timesOfDayList"
						:key="`time-select-${index}`"
					>
						<v-list-item
							:data-testid="`time-select-${index}`"
							class="time-list-item text-left"
							@click="onSelect(timeOfDay.value)"
						>
							<v-list-item-title>{{ timeOfDay.value }}</v-list-item-title>
						</v-list-item>
						<v-divider v-if="index < timesOfDayList.length - 1" />
					</div>
				</v-list-item-group>
			</v-list>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useTimePickerState } from "./TimePickerState.composable";
import { useI18n } from "@/composables/i18n.composable";
import { timeInputMask } from "@util-input-masks";
import { isRequired, isValidTimeFormat } from "@util-validators";

export default defineComponent({
	name: "TimePicker",
	props: {
		time: { type: String, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
		required: { type: Boolean },
	},
	directives: {
		timeInputMask,
	},
	emits: ["update:time", "error"],
	setup(props, { emit }) {
		const { t } = useI18n();

		const modelValue = computed({
			get() {
				return props.time;
			},
			set: (newValue) => {
				emitTimeDebounced(newValue);
			},
		});

		// Necessary because we need to wait for update:error
		const emitTimeDebounced = useDebounceFn((newValue) => {
			if (valid.value) {
				emit("update:time", newValue);
			}
		}, 50);

		const { timesOfDayList, getTimeIndex } = useTimePickerState();
		const showTimeDialog = ref(false);
		const inputField = ref<HTMLInputElement | null>(null);
		const valid = ref(true);
		const selectedTime = ref(getTimeIndex(modelValue.value as string));

		const rules = computed(() => {
			const rules = [
				isValidTimeFormat(t("components.timePicker.validation.format")),
			];

			if (props.required) {
				rules.push(isRequired(t("components.timePicker.validation.required")));
			}

			return rules;
		});

		const onSelect = async (selected: string) => {
			inputField.value?.focus();
			modelValue.value = selected;
			valid.value = true;
			selectedTime.value = getTimeIndex(selected);
			await closeMenu();
		};

		const onError = (hasError: boolean) => {
			valid.value = !hasError;
			if (hasError) {
				emit("error");
			}
		};

		const closeMenu = useDebounceFn(() => {
			showTimeDialog.value = false;
		}, 50);

		return {
			showTimeDialog,
			timesOfDayList,
			modelValue,
			rules,
			inputField,
			selectedTime,
			onSelect,
			onError,
		};
	},
});
</script>

<style lang="scss" scoped>
.time-list-item {
	min-height: 42px;
	text-align: center;
	letter-spacing: $btn-letter-spacing;
}

.overflow-y-auto {
	overflow-y: auto;
}

::v-deep {
	.v-input__icon--append .v-icon {
		width: 20px;
		height: 20px;
	}
}
</style>
