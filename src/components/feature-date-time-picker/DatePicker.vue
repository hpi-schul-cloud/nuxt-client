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
					v-model="formattedDate"
					v-bind="attrs"
					v-on="on"
					:label="label"
					:aria-label="ariaLabel"
					:placeholder="$t('common.placeholder.dateformat')"
					:class="{ 'menu-open': showDateDialog }"
					append-icon="$mdiCalendar"
					:messages="messages"
					:rules="rules"
					data-testid="date-input"
					v-dateInputMask
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
				@input="onInput"
			/>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, defineComponent, ref, watch, onMounted } from "vue";
import { ValidationRule } from "@/types/date-time-picker/Validation";
import { useI18n } from "@/composables/i18n.composable";
import { DATETIME_FORMAT } from "@/plugins/datetime";
import { dateInputMask } from "@util-input-masks";

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
	directives: {
		dateInputMask,
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

		/**
		 * Necessary because we need to wait for update:error
		 */
		const emitDateDebounced = useDebounceFn((newValue) => {
			if (valid.value) {
				emit("update:date", newValue);
			}
		}, 50);

		const showDateDialog = ref(false);
		const inputField = ref<HTMLInputElement | null>(null);
		const valid = ref(true);

		const formattedDate = ref("");

		onMounted(() => {
			formattedDate.value = modelValue.value
				? dayjs(modelValue.value).format(DATETIME_FORMAT.date)
				: "";
		});

		watch(formattedDate, (newVal) => {
			const [day, month, year] = newVal.split(".");
			modelValue.value = `${year}-${month}-${day}`;
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

		const formatRule: ValidationRule = (value: string | null) => {
			if (value === "" || value === null) {
				return true;
			}

			const dateRegex = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/g;

			return !value.match(dateRegex)
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

		const onInput = async () => {
			inputField.value?.focus();
			await closeMenu();
		};

		const onError = (hasError: boolean) => {
			valid.value = !hasError;
		};

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
