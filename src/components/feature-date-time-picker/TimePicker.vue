<template>
	<div>
		<v-menu
			v-model="showTimeDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			nudge-bottom="70"
			min-width="180"
			@input="onMenuToggle"
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
					:class="{ 'menu-open': showTimeDialog }"
					@keypress="isNumberOrColon"
					@keydown.prevent.space="showTimeDialog = true"
					@keydown.prevent.enter="showTimeDialog = true"
					@update:error="onError"
				/>
			</template>
			<v-list height="200" class="col-12 pt-1 px-0 overflow-y-auto">
				<v-list-item-group color="primary">
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
import { ValidationRule } from "@/types/date-time-picker/Validation";
import { useI18n } from "@/composables/i18n.composable";

export default defineComponent({
	name: "TimePicker",
	props: {
		time: { type: String, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
		required: { type: Boolean },
	},
	emits: ["update:time"],
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
		const showTimeDialog = ref(false);
		const inputField = ref<HTMLInputElement | null>(null);
		const valid = ref(true);

		const { timesOfDayList } = useTimePickerState();

		const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/g;

		const requiredRule: ValidationRule = (value: string | null) => {
			return value === "" || value === null
				? t("components.timePicker.validation.required")
				: true;
		};

		const formatRule: ValidationRule = (value: string | null) => {
			if (value === "" || value === null) {
				return true;
			}
			return !value.match(timeRegex)
				? t("components.timePicker.validation.format")
				: true;
		};

		const rules = computed<ValidationRule[]>(() => {
			const rules: ValidationRule[] = [];

			if (props.required) {
				rules.push(requiredRule);
			}
			rules.push(formatRule);

			return rules;
		});

		const onSelect = async (selected: string) => {
			inputField.value?.focus();
			modelValue.value = selected;
			valid.value = true;
			await closeMenu();
		};

		const onError = (hasError: boolean) => {
			valid.value = !hasError;
		};

		/**
		 * Necessary because we need to wait for update:error
		 */
		const emitTimeDebounced = useDebounceFn((newValue) => {
			if (valid.value) {
				emit("update:time", newValue);
			}
		}, 50);

		const onMenuToggle = () => {
			if (showTimeDialog.value) {
				valid.value = true;
			}
		};

		const closeMenu = useDebounceFn(() => {
			showTimeDialog.value = false;
		}, 50);

		const isNumberOrColon = (event: KeyboardEvent) => {
			const char = String.fromCharCode(event.keyCode); // Get the character
			if (/^[0-9|:]+$/.test(char)) return true; // Match with regex
			else event.preventDefault(); // If it doesn't match, don't add to input text
		};

		return {
			showTimeDialog,
			timesOfDayList,
			modelValue,
			rules,
			inputField,
			onSelect,
			onError,
			onMenuToggle,
			isNumberOrColon,
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
