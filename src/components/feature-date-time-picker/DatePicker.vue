<template>
	<div>
		<v-menu
			v-model="showDateDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			nudge-bottom="70"
			min-width="auto"
			@input="onMenuToggle"
		>
			<template #activator="{ on, attrs }">
				<v-text-field
					ref="inputField"
					:value="formattedDate"
					v-bind="attrs"
					v-on="on"
					:label="label"
					:aria-label="ariaLabel"
					:placeholder="$t('common.placeholder.dateformat')"
					:class="{ 'menu-open': showDateDialog }"
					append-icon="$mdiCalendar"
					readonly
					:messages="messages"
					:rules="rules"
					data-testid="date-input"
					@keydown.space="showDateDialog = true"
					@keydown.prevent.enter="showDateDialog = true"
					@keydown.prevent.down="focusDatePicker"
					@keydown.tab="showDateDialog = false"
					@update:error="onError"
				/>
			</template>
			<v-date-picker
				v-model="modelValue"
				:aria-expanded="showDateDialog"
				color="primary"
				no-title
				:locale="locale"
				first-day-of-week="1"
				:min="minDate"
				:max="maxDate"
				show-adjacent-months
				@input="onInput"
			/>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { mdiCalendarClock } from "@mdi/js";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, defineComponent, ref } from "vue";
import { ValidationRule } from "@/types/date-time-picker/Validation";
import { useI18n } from "@/composables/i18n.composable";

export default defineComponent({
	name: "DatePicker",
	props: {
		date: { type: String, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
		required: { type: Boolean },
		minDate: { type: String },
		maxDate: { type: String },
		dateTimeInPast: { type: Boolean, default: false },
	},
	emits: ["update:date"],
	setup(props, { emit }) {
		const { t, locale } = useI18n();

		const modelValue = computed<string>({
			get() {
				return props.date;
			},
			set: (newValue) => {
				emitDateDebounced(newValue);
			},
		});
		const showDateDialog = ref(false);
		const inputField = ref<HTMLInputElement | null>(null);
		const valid = ref(true);

		const formattedDate = computed(() => {
			return modelValue.value
				? dayjs(modelValue.value).format(t("format.date"))
				: "";
		});

		const focusDatePicker = () => {
			setTimeout(() => {
				const prevMonthBtn = document.querySelector<HTMLElement>(
					".v-date-picker-header button"
				);

				prevMonthBtn?.focus();
			}, 100);
		};

		const requiredRule: ValidationRule = (value: string | null) => {
			return value === "" || value === null
				? t("components.datePicker.validation.required")
				: true;
		};

		const rules = computed<ValidationRule[]>(() => {
			const rules: ValidationRule[] = [];

			if (props.required) {
				rules.push(requiredRule);
			}
			return rules;
		});

		const onInput = async () => {
			inputField.value?.focus();
			await closeMenu();
		};

		const onError = (hasError: boolean) => {
			valid.value = !hasError;
		};

		/**
		 * Necessary because we need to wait for update:error
		 */
		const emitDateDebounced = useDebounceFn((newValue) => {
			if (valid.value) {
				emit("update:date", newValue);
			}
		}, 50);

		const onMenuToggle = () => {
			if (showDateDialog.value) {
				valid.value = true;
			}
		};

		const closeMenu = useDebounceFn(() => {
			showDateDialog.value = false;
		}, 50);

		const messages = computed(() => {
			if (props.dateTimeInPast) {
				return t("components.datePicker.messages.future");
			}

			return [];
		});

		return {
			mdiCalendarClock,
			locale,
			modelValue,
			rules,
			showDateDialog,
			formattedDate,
			inputField,
			focusDatePicker,
			onInput,
			onError,
			onMenuToggle,
			messages,
		};
	},
});
</script>

<style lang="scss" scoped>
::v-deep {
	.menu-open {
		.v-text-field__details {
			display: none;
		}
	}

	.v-input__icon--append .v-icon {
		width: 20px;
		height: 20px;
	}

	.v-messages__message {
		line-height: 14px;
	}
}
</style>
