<template>
	<v-text-field
		ref="inputField"
		v-model="modelValue"
		:label="label"
		:aria-label="ariaLabel"
		placeholder="HH:MM"
		append-icon="$mdiClockOutline"
		:rules="rules"
		data-testid="time-input"
		v-timeInputMask
		@keydown.up.down.stop
		@update:error="onError"
	/>
</template>

<script lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "@/composables/i18n.composable";
import { timeInputMask } from "@util-input-masks";
import { isRequired, isValidTimeFormat } from "@util-validators";

export default defineComponent({
	name: "TimePicker",
	props: {
		time: { type: String, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
		required: { type: Boolean },
	},
	directives: {
		timeInputMask,
	},
	emits: ["update:time", "error"],
	setup(props, { emit }) {
		const { t } = useI18n();

		const modelValue = computed({
			get() {
				return props.time;
			},
			set: (newValue) => {
				emitTimeDebounced(newValue);
			},
		});

		// Necessary because we need to wait for update:error
		const emitTimeDebounced = useDebounceFn((newValue) => {
			if (valid.value) {
				emit("update:time", newValue);
			}
		}, 50);

		const inputField = ref<HTMLInputElement | null>(null);
		const valid = ref(true);

		const rules = computed(() => {
			const rules = [
				isValidTimeFormat(t("components.timePicker.validation.format")),
			];

			if (props.required) {
				rules.push(isRequired(t("components.timePicker.validation.required")));
			}

			return rules;
		});

		const onError = (hasError: boolean) => {
			valid.value = !hasError;
			if (hasError) {
				emit("error");
			}
		};

		return {
			modelValue,
			rules,
			inputField,
			onError,
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

::v-deep {
	.v-input__icon--append .v-icon {
		width: 20px;
		height: 20px;
	}
}
</style>
