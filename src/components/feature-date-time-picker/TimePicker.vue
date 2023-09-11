<template>
	<div>
		<v-menu
			v-model="showTimeDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			nudge-bottom="70"
			min-width="180"
			attach
			@input="handleMenuToggle"
		>
			<template #activator="{ on, attrs }">
				<v-text-field
					ref="inputField"
					v-model="model"
					v-bind="attrs"
					v-on="on"
					:label="label"
					:aria-label="ariaLabel"
					placeholder="HH:MM"
					append-icon="$mdiClockOutline"
					:rules="rules"
					validate-on-blur
					data-testid="time-input"
					:class="{ 'menu-open': showTimeDialog }"
					@blur="handleBlur"
					@keydown.prevent.space="showTimeDialog = true"
					@keydown.prevent.enter="showTimeDialog = true"
					@update:error="handleError"
				/>
			</template>
			<v-list height="200" class="col-12 pt-1 px-0">
				<v-list-item-group color="primary">
					<div
						v-for="(timeOfDay, index) in timesOfDayList"
						:key="`time-select-${index}`"
					>
						<v-list-item
							:data-testid="`time-select-${index}`"
							class="time-list-item text-left"
							@click="handleSelect(timeOfDay.value)"
							:disabled="timeOfDay.disabled"
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
import { computed, defineComponent, ref, toRef } from "vue";
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
		allowPast: { type: Boolean, default: true },
	},
	emits: ["input", "error", "valid"],
	setup(props, { emit }) {
		const { t } = useI18n();

		// eslint-disable-next-line vue/no-setup-props-destructure
		const model = ref(props.time);
		const showTimeDialog = ref(false);
		const inputField = ref<HTMLInputElement | null>(null);

		const { timesOfDayList, timeInPast } = useTimePickerState(
			toRef(props, "allowPast")
		);

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

		const allowPastRule: ValidationRule = (value: string | null) => {
			if (value === "" || value === null) {
				return true;
			}
			const hoursAndMinutes = value.split(":");
			return timeInPast(
				parseInt(hoursAndMinutes[0]),
				parseInt(hoursAndMinutes[1])
			)
				? t("components.timePicker.validation.future")
				: true;
		};

		const rules = computed<ValidationRule[]>(() => {
			const rules: ValidationRule[] = [];

			if (props.required) {
				rules.push(requiredRule);
			}
			rules.push(formatRule);
			if (!props.allowPast) {
				rules.push(allowPastRule);
			}
			return rules;
		});

		const handleBlur = useDebounceFn(() => {
			const time = model.value || "";
			if (time.match(timeRegex)) {
				emit("input", time);
			}
		}, 200);

		const handleSelect = async (selected: string) => {
			inputField.value?.focus();
			model.value = selected;
			await closeMenu();
		};

		const handleError = (hasError: boolean) => {
			hasError ? emit("error") : emit("valid");
		};

		const handleMenuToggle = () => {
			if (showTimeDialog.value) {
				emit("valid");
			}
		};

		const closeMenu = useDebounceFn(() => {
			showTimeDialog.value = false;
		}, 50);

		return {
			showTimeDialog,
			timesOfDayList,
			model,
			rules,
			inputField,
			handleBlur,
			handleSelect,
			handleError,
			handleMenuToggle,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/src/components/VTextField/_variables.scss";

.time-list-item {
	min-height: 42px;
	text-align: center;
	letter-spacing: $btn-letter-spacing;
}
::v-deep {
	.menu-open {
		label {
			transform: $text-field-filled-full-width-label-active-transform;
		}
		.v-text-field__details {
			display: none;
		}
	}

	.v-input__icon--append .v-icon {
		width: 20px;
		height: 20px;
	}
}
</style>
