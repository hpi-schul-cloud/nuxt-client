<template>
	<v-menu
		v-model="showDateDialog"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		min-width="auto"
	>
		<template #activator="{ on, attrs }">
			<v-text-field
				:value="formattedDate"
				data-testid="date-input"
				:label="label"
				:aria-label="ariaLabel"
				:append-icon="mdiCalendar"
				readonly
				v-bind="attrs"
				v-on="on"
				@keydown.space="showDateDialog = true"
				@keydown.prevent.enter="showDateDialog = true"
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
import {
	defineComponent,
	inject,
	ref,
	computed,
	watch,
} from "@vue/composition-api";
import VueI18n from "vue-i18n";
import dayjs from "dayjs";
import { mdiCalendar } from "@mdi/js";

export default defineComponent({
	name: "DatePicker",
	props: {
		date: { type: String, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, required: true },
	},
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
			emit("input", new Date(selectedDate.value).toISOString());
			showDateDialog.value = false;
		};

		// TODO - clarify is this is good or bad accessibility
		const focusDateWithKeyBoard = () => {
			setTimeout(() => {
				const focusedDate = selectedDate.value
					? document.querySelector<HTMLElement>(".v-btn--active")
					: document.querySelector<HTMLElement>(
							".v-date-picker-table__current"
					  );

				if (focusedDate) {
					focusedDate.focus();
				}
			}, "100");
		};

		watch(
			() => props.date,
			(newValue) => {
				selectedDate.value = newValue;
				console.log("d", selectedDate.value);
			}
		);

		watch(showDateDialog, (newValue) => {
			if (newValue === true) {
				focusDateWithKeyBoard();
			}
		});

		return {
			mdiCalendar,
			locale,
			selectedDate,
			showDateDialog,
			formattedDate,
			allowedDates,
			onInput,
		};
	},
});
</script>

<style lang="scss" scoped>
::v-deep .v-input__icon--append .v-icon {
	width: 20px;
	height: 20px;
}
</style>
