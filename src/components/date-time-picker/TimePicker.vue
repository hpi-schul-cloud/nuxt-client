<template>
	<div>
		<v-menu
			v-model="showTimeDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			nudge-bottom="70"
			min-width="180"
			attach
		>
			<template #activator="{ on, attrs }">
				<v-text-field
					v-model="model"
					id="time-input"
					data-testid="time-input"
					placeholder="HH:MM"
					filled
					clearable
					:label="label"
					:aria-label="ariaLabel"
					v-bind="attrs"
					v-on="on"
					:rules="rules"
					validate-on-blur
					autocomplete="off"
					ref="inputfield"
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
import { defineComponent, ref, computed, inject } from "vue";
import VueI18n from "vue-i18n";
import dayjs from "dayjs";
import { useDebounceFn } from "@vueuse/core";

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
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const model = ref(props.time);
		const showTimeDialog = ref(false);
		const inputfield = ref<HTMLInputElement | null>(null);

		const timesOfDayList = computed(() => {
			type timeItem = {
				value: string;
				disabled: boolean;
			};
			const times: timeItem[] = [];
			for (let hour = 0; hour < 24; hour++) {
				times.push({
					value: dayjs().hour(hour).minute(0).format("HH:mm"),
					disabled: !props.allowPast && timeInPast(hour, 0),
				});
				times.push({
					value: dayjs().hour(hour).minute(30).format("HH:mm"),
					disabled: !props.allowPast && timeInPast(hour, 30),
				});
			}
			return times;
		});

		const timeInPast = (hour: number, minute: number): boolean => {
			const date = new Date();
			const currentHour = date.getHours();
			const currentMinute = date.getMinutes();
			if (hour < currentHour) {
				return true;
			}
			if (hour === currentHour && minute < currentMinute) {
				return true;
			}
			return false;
		};

		const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/g;
		type Rule = (value: string | null) => boolean | string;
		const requiredRule: Rule = (value: string | null) => {
			return value === "" || value === null
				? t("components.timePicker.validation.required")
				: true;
		};
		const formatRule: Rule = (value: string | null) => {
			if (value === "" || value === null) {
				return true;
			}
			return !value.match(regex)
				? t("components.timePicker.validation.format")
				: true;
		};
		const allowPastRule: Rule = (value: string | null) => {
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

		const rules = computed<Rule[]>(() => {
			const rules: Rule[] = [];
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
			emit("input", time);
		}, 200);

		const handleSelect = (selected: string) => {
			showTimeDialog.value = false;
			model.value = selected;
			triggerValidation();
			handleBlur();
		};

		const handleError = (hasError: boolean) => {
			hasError ? emit("error") : emit("valid");
		};

		const triggerValidation = () => {
			inputfield.value?.focus();
			inputfield.value?.blur();
		};

		return {
			showTimeDialog,
			timesOfDayList,
			model,
			rules,
			handleBlur,
			handleSelect,
			handleError,
			inputfield,
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
</style>
