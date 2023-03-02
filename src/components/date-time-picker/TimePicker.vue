<template>
	<div>
		<v-menu
			v-model="showTimeDialog"
			:close-on-content-click="false"
			transition="scale-transition"
			nudge-bottom="70"
			min-width="85"
			attach
			@input="onMenuToggle"
		>
			<template #activator="{ on, attrs }">
				<v-text-field
					v-model="inputTime"
					id="time-input"
					data-testid="time-input"
					placeholder="HH:MM"
					filled
					clearable
					:label="label"
					:aria-label="ariaLabel"
					:errors="hasErrors"
					:error-messages="errors"
					v-bind="attrs"
					v-on="on"
					@input="onInput"
					@keydown.prevent.space="showTimeDialog = true"
					@keydown.prevent.enter="showTimeDialog = true"
					@blur="onBlur"
				/>
			</template>
			<v-list height="200" class="col-12 pt-1 px-0">
				<v-list-item-group v-model="selectedTime" color="primary">
					<div
						v-for="(timeOfDay, index) in timesOfDayList"
						:key="`time-select-${index}`"
					>
						<v-list-item
							:data-testid="`time-select-${index}`"
							class="time-list-item"
							@click="selectTime(timeOfDay)"
						>
							<v-list-item-title>{{ timeOfDay }}</v-list-item-title>
						</v-list-item>
						<v-divider v-if="index < timesOfDayList.length - 1" />
					</div>
				</v-list-item-group>
			</v-list>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from "vue";
import VueI18n from "vue-i18n";
import dayjs from "dayjs";

export default defineComponent({
	name: "TimePicker",
	props: {
		time: { type: String, required: true },
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

		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const timesOfDayList = computed(() => {
			const times = [];

			for (let hour = 0; hour < 24; hour++) {
				times.push(dayjs().hour(hour).minute(0).format("HH:mm"));
				times.push(dayjs().hour(hour).minute(30).format("HH:mm"));
			}

			return times;
		});

		const inputTime = ref(props.time);
		const showTimeDialog = ref(false);
		const selectedTime = ref(null);

		const selectTime = (selected: string) => {
			inputTime.value = selected;
			showTimeDialog.value = false;

			const validated = validate(inputTime.value);
			if (validated) {
				emit("input", inputTime.value);
			}
		};

		const onInput = (input: string) => {
			inputTime.value = input;
			showTimeDialog.value = false;
		};

		const onBlur = () => {
			const validated = validate(inputTime.value);

			if (validated) {
				emit("input", inputTime.value);
			}
		};

		const onMenuToggle = (menuOpen: boolean) => {
			if (menuOpen === false) {
				validate(inputTime.value);
			}
		};

		const errors = ref<string[]>([]);
		const validate = (timeValue: string) => {
			resetErrors();

			// is empty, but not required
			if (!props.required && (timeValue === "" || timeValue === null)) {
				return true;
			}

			// is required, but empty
			if (props.required && (timeValue === "" || timeValue === null)) {
				errors.value.push(t("components.timePicker.validation.required"));
				emit("error");
				return false;
			}

			// fits hh:mm format
			const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/g;
			const found = timeValue.match(regex);
			if (!found) {
				errors.value.push(t("components.timePicker.validation.format"));
				emit("error");
				return false;
			}

			return true;
		};

		const hasErrors = computed(() => {
			return errors.value.length > 0;
		});

		const resetErrors = () => {
			errors.value = [];
		};

		watch(
			() => props.time,
			(newValue) => {
				inputTime.value = newValue;
			}
		);

		return {
			showTimeDialog,
			timesOfDayList,
			inputTime,
			selectedTime,
			selectTime,
			onInput,
			onBlur,
			onMenuToggle,
			validate,
			errors,
			hasErrors,
			resetErrors,
		};
	},
});
</script>

<style lang="scss" scoped>
.time-list-item {
	min-height: 36px;
	text-align: center;
	letter-spacing: $btn-letter-spacing;
}
</style>
