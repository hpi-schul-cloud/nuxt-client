<template>
	<div v-if="type === 'checkbox'" class="checkbox">
		<label class="switch">
			<input type="checkbox" />
			<span class="slider"></span>
		</label>
	</div>
	<div v-else-if="type === 'hidden'" class="hidden">
		<input type="hidden" />
	</div>
	<div v-else-if="type === 'radio'" class="radio">
		<input id="a-opt" type="radio" class="radio-btn" name="choice" />
		<label for="a-opt" class="label">pick me!</label>
	</div>
	<div v-else>
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
				return [
					"email",
					"password",
					"search",
					"tel",
					"text",
					"url",
					"number",
					"hidden",
				].includes(value.toLowerCase());
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

.input__wrapper + .label {
	@extend %typography-small;

	position: relative;
	top: 0;
	left: $input-padding-left;
	background-color: inherit;
	transform: translateY(-0.75em);
}

.radio {
	display: block;
	width: 100%;
	padding: $size-padding;
	line-height: 1;
	color: lighten($color-text, 20%);
	background: inherit;
	border: 0;
	border-radius: calc(#{$size-border-radius} - #{$size-border-width});
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

.hidden {
	display: none;
}

.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
}
.switch input {
	width: 0;
	height: 0;
	opacity: 0;
}

.slider {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	cursor: pointer;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;

	&::before {
		position: absolute;
		bottom: 4px;
		left: 4px;
		width: 26px;
		height: 26px;
		content: "";
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}
}
input:checked + .slider {
	background-color: #2196f3;
}

input:focus + .slider {
	box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider::before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}

.radio-btn + .label {
	display: flex;
	align-items: center;
	padding: 0.75rem 0;
	font-size: 1.25rem;
	color: $color-primary;
	text-transform: uppercase;
	cursor: pointer;
	transition: all 0.25s linear;
	&::before {
		display: inline-block;
		width: 1.125rem;
		height: 1.125rem;
		margin-right: 0.625rem;
		content: "";
		border: 0.5rem solid $color-primary;
		border-radius: 50%;
		transition: all 0.25s linear;
	}
	&:hover {
		color: $color-primary;
		&::before {
			margin-right: 2rem;
			border: 0.5rem solid $color-primary;
		}
	}
}

.radio-btn {
	position: absolute;
	visibility: hidden;
	opacity: 0;
	&:checked + .label {
		color: $color-primary;
		&::before {
			margin-right: 2rem;
			background: $color-primary;
			border: 0.5rem solid $color-primary;
		}
	}
}
</style>
