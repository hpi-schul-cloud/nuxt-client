<template>
	<div>
		<v-menu
			v-model="showDateDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			nudge-bottom="52"
			min-width="auto"
		>
			<template #activator="{ on, attrs }">
				<v-text-field
					ref="inputField"
					v-model="modelValue"
					v-bind="attrs"
					v-on="on"
					v-dateInputMask
					:label="label"
					:aria-label="ariaLabel"
					:placeholder="$t('common.placeholder.dateformat')"
					:class="{ 'menu-open': showDateDialog }"
					append-icon="$mdiCalendar"
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
				:value="date"
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
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "@/composables/i18n.composable";
import { dateInputMask } from "@util-input-masks";
import { isRequired, isValidDateFormat } from "@util-validators";

export default defineComponent({
	name: "DatePicker",
	props: {
		date: { type: String, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
		required: { type: Boolean },
		minDate: { type: String },
		maxDate: { type: String },
	},
	directives: {
		dateInputMask,
	},
	emits: ["update:date", "error"],
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
				const dateISO = getISODate(newValue);
				emit("update:date", dateISO);
			}
		}, 50);

		const showDateDialog = ref(false);
		const inputField = ref<HTMLInputElement | null>(null);
		const valid = ref(true);

		const getISODate = (date: string) => {
			if (!date.includes(".")) return date;

			const [day, month, year] = date.split(".");
			return `${year}-${month}-${day}`;
		};

		const focusDatePicker = () => {
			setTimeout(() => {
				const prevMonthBtn = document.querySelector<HTMLElement>(
					".v-date-picker-header button"
				);

				prevMonthBtn?.focus();
			}, 100);
		};

		const rules = computed(() => {
			const rules = [
				isValidDateFormat(t("components.datePicker.validation.format")),
			];

			if (props.required) {
				rules.push(isRequired(t("components.datePicker.validation.required")));
			}

			return rules;
		});

		const onInput = async (date: string) => {
			modelValue.value = date;
			inputField.value?.focus();
			await closeMenu();
		};

		const onError = (hasError: boolean) => {
			valid.value = !hasError;
			if (hasError) {
				emit("error");
			}
		};

		const closeMenu = useDebounceFn(() => {
			showDateDialog.value = false;
		}, 50);

		return {
			locale,
			modelValue,
			rules,
			showDateDialog,
			inputField,
			focusDatePicker,
			onInput,
			onError,
		};
	},
});
</script>

<style lang="scss" scoped>
::v-deep {
	.v-input__icon--append .v-icon {
		width: 20px;
		height: 20px;
	}

	.v-messages__message {
		line-height: 14px;
	}
}
</style>
