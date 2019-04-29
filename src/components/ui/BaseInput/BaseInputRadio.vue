<template>
	<label>
		<input
			ref="hiddenInput"
			v-bind="$attrs"
			:checked="vmodel === value"
			:value="value"
			type="radio"
			class="visually-hidden"
			@change="$emit('input', $event.target.value)"
		/>
		<span class="radio" />
		<span class="label">
			{{ label }}
		</span>
	</label>
</template>
<script>
export const supportedTypes = ["radio"];

export default {
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type);
			},
		},
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
@import "@styles";

$background-color: #ccc;
$background-color-active: var(--color-accent);

label {
	position: relative;
}

.radio {
	position: relative;
	display: inline-block;
	width: 0.7em;
	height: 0.7em;
	margin-right: 0.25em;
	background-color: $background-color;
	border-radius: var(--curve-round);
	transition: background-color var(--duration-transition-medium);
}

input:checked + .radio {
	background-color: $background-color-active;
	&.switch::before {
		transform: translateX(100%);
	}
}

input:focus + .radio {
	outline: 2px solid #4d90fe;
	outline-offset: 0.05em;
}
</style>
