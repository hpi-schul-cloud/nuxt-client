<template>
	<v-text-field
		v-model="name"
		solo
		:label="label"
		@input="$emit('input', $event)"
	/>
</template>

<script lang="ts">
import { Data, ref, watch } from "@vue/composition-api";
export default {
	name: "TaskTitleElement",
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
	},
	setup(props: Readonly<Data>) {
		const name = ref(props.value);

		watch(
			() => props.value,
			(newValue) => {
				name.value = newValue;
			}
		);

		return {
			name,
		};
	},
};
</script>
