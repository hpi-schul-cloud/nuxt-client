<template>
	<div>
		<label class="input__wrapper">
			<span :class="{ label: true, active: value && value !== 0 }">
				{{ label }}
			</span>
			<input
				:value="value"
				:type="type"
				:name="name"
				v-bind="$attrs"
				class="input"
				@input="$emit('update', $event.target.value)"
				v-on="$listeners"
			/>
		</label>
		<small v-if="hint || $slots.hint" class="hint">
			<template v-if="hint">{{ hint }}</template>
			<slot v-else name="hint" />
		</small>
	</div>
</template>

<script>
export default {
	// currently, this only supports text input
	name: "BaseInput",
	inheritAttrs: false,
	model: {
		event: "update",
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: function(value) {
				return ["email", "password", "search", "tel", "text", "url"].includes(
					value.toLowerCase()
				);
			},
		},
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: "",
			required: true,
		},
		name: {
			type: String,
			default: "",
			required: true,
		},
		hint: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
$input-padding-left: 12px;

.input__wrapper {
	position: relative;
	display: block;
	margin: 1em 0 $size-grid-padding;
	clear: both;
	background: #fff;
	border: $size-input-border solid $color-input-border;
	border-radius: $size-input-border-radius;
}

.label {
	@extend %typography-small;

	position: absolute;
	top: 0;
	left: $input-padding-left;
	background-color: inherit;
	transform: translateY(-0.75em);
}

.input {
	display: block;
	width: 100%;
	padding: $size-input-padding;
	line-height: 1;
	color: lighten($color-text, 20%);
	background: inherit;
	border: 0;
	border-radius: calc(#{$size-input-border-radius} - #{$size-input-border});
	outline: none;
	transition: color $duration-animation-base linear;

	@extend %typography-small;
	&:focus {
		color: $color-text;
	}
}

.hint {
	display: block;
	margin-top: -0.75em;
	margin-bottom: 1em;
	margin-left: $input-padding-left;
}
</style>
