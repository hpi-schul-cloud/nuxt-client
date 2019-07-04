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

$border-color: #ccc;
$border-color-active: var(--color-accent);

label {
	position: relative;
}

.radio {
	position: relative;
	display: inline-block;
	width: 0.7em;
	height: 0.7em;
	border: 2px solid $border-color;
	border-radius: var(--radius-round);
	transition: border-color var(--duration-transition-medium);
}

input:checked + .radio {
	border-color: $border-color-active;
	&.switch::before {
		transform: translateX(100%);
	}
}

input:checked + .radio::before {
	display: block;
	width: 60%;
	height: 60%;
	content: "";
	background: $border-color-active;
	border-radius: var(--radius-round);
}

input:focus + .radio {
	outline: 2px solid #4d90fe;
	outline-offset: 0.05em;
}
</style>
