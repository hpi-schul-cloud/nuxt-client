<template>
	<div>
		<VTextField
			ref="time-text-field"
			v-model="timeValue"
			v-time-input-mask
			data-testid="time-input"
			:prepend-inner-icon="mdiClockOutline"
			:label="label"
			:aria-label="ariaLabel"
			placeholder="HH:MM"
			@update:model-value="emit('update:time', timeValue)"
			@keydown.up.down.stop
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiClockOutline } from "@icons/material";
import { timeInputMask as vTimeInputMask } from "@util-input-masks";
import { ref, watchEffect } from "vue";

const props = defineProps({
	time: { type: String, required: true },
	label: { type: String, default: "" },
	ariaLabel: { type: String, default: "" },
	required: { type: Boolean },
});

const emit = defineEmits<{
	(e: "update:time", value: string | undefined): void;
}>();

const timeValue = ref<string>();

watchEffect(() => {
	timeValue.value = props.time;
});
</script>
