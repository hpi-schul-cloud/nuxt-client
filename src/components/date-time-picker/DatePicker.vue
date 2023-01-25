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
				label="Zu erledigen bis"
				:append-icon="mdiCalendar"
				readonly
				v-bind="attrs"
				v-on="on"
			/>
		</template>
		<v-date-picker
			v-model="selectedDate"
			color="primary"
			:locale="locale"
			:title-date-format="titleDateFormat"
			first-day-of-week="1"
			:allowed-dates="allowedDates"
			@input="onInput"
		/>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed } from "@vue/composition-api";
import VueI18n from "vue-i18n";
import dayjs from "dayjs";
import { mdiCalendar } from "@mdi/js";

// TODO - Accessibility
export default defineComponent({
	name: "DatePicker",
	props: {
		date: { type: String, required: true },
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

		console.log("d", props.date);
		const selectedDate = ref(props.date);
		const showDateDialog = ref(false);

		// TODO locale not properly working for es and uk
		const titleDateFormat = (dateValue: string) =>
			dayjs(dateValue).format(i18n.t("format.dateMedium"));

		const formattedDate = computed(() => {
			return dayjs(selectedDate.value).format(i18n.t("format.date"));
		});

		const allowedDates = (value: string) =>
			value >= new Date().toISOString().substr(0, 10);

		const onInput = () => {
			emit("input", selectedDate.value);
			showDateDialog.value = false;
		};

		return {
			mdiCalendar,
			locale,
			titleDateFormat,
			selectedDate,
			showDateDialog,
			formattedDate,
			allowedDates,
			onInput,
		};
	},
});
</script>
