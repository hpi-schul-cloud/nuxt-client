<template>
	<div>
		<v-menu
			v-model="showDateDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			nudge-bottom="70"
			min-width="auto"
			attach
		>
			<template #activator="{ on, attrs }">
				<v-text-field
					:value="formattedDate"
					:label="label"
					:aria-label="ariaLabel"
					:placeholder="$t('common.placeholder.dateformat')"
					data-testid="date-input"
					readonly
					filled
					clearable
					v-bind="attrs"
					v-on="on"
					:rules="rules"
					autocomplete="off"
					@keydown.space="showDateDialog = true"
					@keydown.prevent.enter="showDateDialog = true"
					@keydown.prevent.down="focusDatePicker"
					@keydown.tab="showDateDialog = false"
					@update:error="handleError"
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
				@input="handleInput"
			/>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed } from "vue";
import VueI18n from "vue-i18n";
import dayjs from "dayjs";
import { mdiCalendarClock } from "@mdi/js";

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
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const locale = (() => {
			// TODO remove if language code for ukraine is fixed
			if (i18n.locale === "ua") {
				return "uk";
			}

			return i18n.locale;
		})();

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const model = ref(props.date);
		const showDateDialog = ref(false);

		const formattedDate = computed(() => {
			return model.value
				? dayjs(model.value).format(t("format.date"))
				: model.value;
		});

		const handleInput = () => {
			showDateDialog.value = false;
			if (model.value) {
				emit("input", model.value);
			}
		};

		const focusDatePicker = () => {
			setTimeout(() => {
				const prevMonthBtn = document.querySelector<HTMLElement>(
					".v-date-picker-header button"
				);

				prevMonthBtn?.focus();
			}, 100);
		};

		type Rule = (value: string | null) => boolean | string;
		const rules: Rule[] = [
			(value: string | null) => {
				return props.required && (value === "" || value === null)
					? t("components.datePicker.validation.required")
					: true;
			},
		];

		const handleError = (hasError: boolean) => {
			hasError ? emit("error") : emit("valid");
		};

		return {
			mdiCalendarClock,
			locale,
			model,
			rules,
			showDateDialog,
			formattedDate,
			handleInput,
			handleError,
			focusDatePicker,
		};
	},
});
</script>
