<template>
	<v-text-field
		v-model="name"
		solo
		:label="label"
		@input="$emit('input', $event)"
	/>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
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
	setup(props) {
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
