<template>
	<v-text-field
		v-model="name"
		solo
		:label="label"
		@input="$emit('input', $event)"
	/>
</template>

<script>
import { ref } from "@vue/composition-api";
export default {
	name: "TitleCard",
	props: {
		label: {
			required: true,
			type: String,
		},
		value: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const name = ref(props.value);

		return {
			name,
		};
	},
};
</script>
