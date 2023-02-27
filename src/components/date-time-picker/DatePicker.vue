<template>
	<v-menu
		v-model="showDateDialog"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		min-width="auto"
		@input="onMenuToggle"
	>
		<template #activator="{ on, attrs }">
			<v-text-field
				:value="formattedDate"
				:label="label"
				:aria-label="ariaLabel"
				:placeholder="$t('format.date')"
				data-testid="date-input"
				readonly
				filled
				dense
				clearable
				:error-messages="errors"
				:error="hasErrors"
				v-bind="attrs"
				v-on="on"
				@input="onInput"
				@keydown.space="showDateDialog = true"
				@keydown.prevent.enter="showDateDialog = true"
				@keydown.prevent.down="focusDatePicker"
				@focus="resetErrors"
				@click:clear="clearDate"
				@blur="(e) => validate(e.target.value)"
			/>
		</template>
		<v-date-picker
			v-model="selectedDate"
			:aria-expanded="showDateDialog"
			color="primary"
			no-title
			:locale="locale"
			first-day-of-week="1"
			:allowed-dates="allowedDates"
			show-adjacent-months
			@input="onInput"
		/>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed, watch } from "vue";
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
	},
	emits: ["input", "error"],
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

		const selectedDate = ref(props.date);
		const showDateDialog = ref(false);

		const formattedDate = computed(() => {
			return selectedDate.value
				? dayjs(selectedDate.value).format(t("format.date"))
				: selectedDate.value;
		});

		const allowedDates = (value: string) =>
			value >= new Date().toISOString().substr(0, 10);

		const onInput = () => {
			const validated = validate(selectedDate.value);

			if (validated) {
				emit("input", new Date(selectedDate.value).toISOString());
				showDateDialog.value = false;
				resetErrors();
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

		const errors = ref<string[]>([]);
		const validate = (dateValue: string) => {
			if (!props.required) {
				return true;
			}

			if (dateValue === "") {
				errors.value.push("required");
				emit("error");
				return false;
			}

			return true;
		};

		const onMenuToggle = (menuOpen: boolean) => {
			if (menuOpen === false) {
				validate(selectedDate.value);
			}
		};

		const clearDate = () => {
			selectedDate.value = "";
		};

		const hasErrors = computed(() => {
			return errors.value.length > 0;
		});

		const resetErrors = () => {
			errors.value = [];
		};

		watch(
			() => props.date,
			(newValue: string, prevValue: string) => {
				console.log(prevValue, newValue);
				selectedDate.value = newValue;
			}
		);

		return {
			mdiCalendarClock,
			locale,
			selectedDate,
			showDateDialog,
			formattedDate,
			allowedDates,
			onInput,
			focusDatePicker,
			errors,
			validate,
			hasErrors,
			resetErrors,
			onMenuToggle,
			clearDate,
		};
	},
});
</script>
