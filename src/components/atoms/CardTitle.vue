<template>
	<div>
		<h2 v-if="!editable">
			{{ title }}
		</h2>
		<v-textarea
			v-if="editable"
			v-model="title"
			rows="1"
			auto-grow
			solo
			flat
			:placeholder="placeholder"
			@input="handleInput"
		/>
	</div>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
export default {
	name: "CardTitle",
	emits: ["input"],
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		editable: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const title = ref(props.value);

		watch(
			() => props.value,
			(newValue) => {
				title.value = newValue;
			}
		);

		const handleInput = () => emit("input", title.value);

		return {
			title,
			handleInput,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep .v-text-field .v-text-field__details {
	display: none;
}

::v-deep .v-textarea .v-input__slot {
	padding: 0 !important;
	margin-bottom: 0;
}

::v-deep .v-textarea textarea {
	height: auto;
	max-height: none;
	padding: 0;
	margin-top: var(--space-xl) !important;
	margin-bottom: var(--space-sm);
	font-family: var(--font-accent);
	font-size: var(--heading-2);
	font-weight: var(--font-weight-normal);
	line-height: var(--line-height-sm);
	color: var(--v-black-base);
}
</style>
