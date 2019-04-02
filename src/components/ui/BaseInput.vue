<template src="./BaseInput.html"></template>

<script>
// TODO FIX make import dynamic
// tests ! with coverage ! (yarn test:unit:ci) are failing when dynamic import is used
//const FlatPickr = () => import("vue-flatpickr-component");
import FlatPickr from "vue-flatpickr-component";

import { German } from "flatpickr/dist/l10n/de.js";

export default {
	name: "BaseInput",
	components: { FlatPickr },
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
					"textarea",
					"url",
					"date",
					"time",
				].includes(value.toLowerCase());
			},
		},
		id: {
			type: String,
			default: "",
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
	data() {
		return {
			// Get more form https://chmln.github.io/flatpickr/options/
			configDate: {
				altFormat: "d.m.Y",
				altInput: true,
				dateFormat: "Y-m-d",
				locale: German,
			},
			configTime: {
				enableTime: true,
				noCalendar: true,
				dateFormat: "H:i",
				time_24hr: true,
				locale: German,
			},
			val: this.value,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
@import "~flatpickr/dist/flatpickr.css";

$input-padding-left: 12px;

.root {
	width: 100%;
}
.input__wrapper {
	position: relative;
	display: block;
	margin: 1em 0 $size-grid-padding;
	clear: both;
	background: $color-text-bg;
	border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
}
.label {
	@extend %typography-small;

	position: relative;
	top: 0;
	left: $input-padding-left;
	background-color: inherit;
	transform: translateY(-0.75em);
}

.input,
.input__wrapper /deep/ .flatpickr-input {
	box-sizing: border-box;
	display: block;
	width: 100%;
	padding: $size-padding;
	line-height: 1;
	color: $color-text;
	background: inherit;
	border: 0;
	border-radius: calc(#{$size-border-radius} - #{$size-border-width});
	transition: color $duration-animation-base linear;

	@extend %typography-small;
	&::placeholder {
		color: lighten($color-text, 40%);
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
