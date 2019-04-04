<template>
	<label>
		<input
			:checked="value"
			type="checkbox"
			class="visually-hidden"
			@input="$emit('input', $event.target.checked)"
		/>
		<span :class="['icon', $attrs.type]" />
		<span class="label">
			{{ $attrs.label }}
		</span>
	</label>
</template>
<script>
export default {
	props: {
		value: {
			type: Boolean,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

$background-color: #ccc;
$background-color-active: $color-secondary;

label {
	position: relative;
}

.icon {
	position: relative;
	display: inline-block;
	margin-right: 0.25em;
	background-color: $background-color;
	transition: background-color $duration-animation-base;
}

.checkbox {
	width: 0.7em;
	height: 0.7em;
}

.switch {
	width: 1.2em;
	height: 0.7em;

	&::before {
		position: absolute;
		bottom: 0.1em;
		left: 0.1em;
		width: 0.5em;
		height: 0.5em;
		content: "";
		background-color: white;
		transition: transform $duration-animation-base;
	}
}

input:checked + .icon {
	background-color: $background-color-active;
	&.switch::before {
		transform: translateX(100%);
	}
}

input:focus + .icon {
	outline: 2px solid #4d90fe;
	outline-offset: 0.05em;
}
</style>
