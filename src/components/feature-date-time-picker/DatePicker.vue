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
					:rules="rules"
					validate-on-blur
					data-testid="date-input"
					@blur="handleBlur"
					@keydown.space="showDateDialog = true"
					@keydown.prevent.enter="showDateDialog = true"
					@keydown.prevent.down="focusDatePicker"
					@keydown.tab="showDateDialog = false"
					@update:error="onError"
				/>
			</template>
			<v-date-picker
				v-model="model"
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
import { I18N_KEY, injectStrict } from "@/utils/inject";
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
	},
	emits: ["input", "error", "valid"],
	setup(props, { emit }) {
		const { t } = useI18n();
		const i18n = injectStrict(I18N_KEY);
		const locale = i18n.locale;

		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const model = ref(props.date);
		const showDateDialog = ref(false);
		const inputField = ref<HTMLInputElement | null>(null);

		const formattedDate = computed(() => {
			return model.value ? dayjs(model.value).format(t("format.date")) : "";
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

		const handleBlur = useDebounceFn(() => {
			const date = model.value || "";
			emit("input", date);
		}, 200);

		const onInput = async () => {
			inputField.value?.focus();
			await closeMenu();
		};

		const onError = (hasError: boolean) => {
			hasError ? emit("error") : emit("valid");
		};

		const onMenuToggle = () => {
			if (showDateDialog.value) {
				emit("valid");
			}
		};

		const closeMenu = useDebounceFn(() => {
			showDateDialog.value = false;
		}, 50);

		return {
			mdiCalendarClock,
			locale,
			model,
			rules,
			showDateDialog,
			formattedDate,
			inputField,
			focusDatePicker,
			handleBlur,
			onInput,
			onError,
			onMenuToggle,
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
}
</style>
