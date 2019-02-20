<template>
	<div class="root">
		<div v-if="type === 'date'" class="input__wrapper">
			<span :class="{ label: true, active: value && value !== 0 }">
				{{ label }}
			</span>
			<FlatPickr
				v-model="val"
				v-bind="$attrs"
				:config="configDate"
				:wrap="true"
				v-on="$listeners"
				@input="$emit('update', val)"
			>
				<input type="date" :name="name" class="input" />
			</FlatPickr>
		</div>

		<div v-else-if="type === 'time'" class="input__wrapper">
			<span :class="{ label: true, active: value && value !== 0 }">
				{{ label }}
			</span>
			<FlatPickr
				v-model="val"
				v-bind="$attrs"
				:config="configTime"
				:wrap="true"
				v-on="$listeners"
				@input="$emit('update', val)"
			>
				<input type="time" :name="name" class="input" />
			</FlatPickr>
		</div>

		<label v-else class="input__wrapper">
			<span :class="{ label: true, active: value && value !== 0 }">
				{{ label }}
			</span>
			<input
				v-bind="$attrs"
				:value="value"
				:type="type"
				:name="name"
				class="input"
				v-on="$listeners"
				@input="$emit('update', $event.target.value)"
			/>
		</label>
		<small v-if="hint || $slots.hint" class="hint">
			<template v-if="hint">{{ hint }}</template>
			<slot v-else name="hint" />
		</small>
	</div>
</template>

<script>
// TODO FIX make import dynamic
// tests ! with coverage ! (yarn test:unit:ci) are failing when dynamic import is used
//const FlatPickr = () => import("vue-flatpickr-component");
import FlatPickr from "vue-flatpickr-component";

import { German } from "flatpickr/dist/l10n/de.js";

export default {
	// currently, this only supports text input
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
					"textarea",
					"url",
					"date",
					"time",
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

	position: absolute;
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
</style>
