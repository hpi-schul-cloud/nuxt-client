<template>
	<base-input-default
		v-bind="$attrs"
		:type="false"
		:vmodel="vmodel"
		class="calendar-input"
	>
		<flat-pickr
			:value="vmodel"
			v-bind="$attrs"
			:config="config"
			:wrap="true"
			class="input"
			v-on="$listeners"
			@input="$emit('input', $event)"
		/>
	</base-input-default>
</template>
<script>
import BaseInputDefault from "./BaseInputDefault";
import FlatPickr from "vue-flatpickr-component";
import { German } from "flatpickr/dist/l10n/de.js";

export const supportedTypes = ["date", "time"];

export default {
	components: { BaseInputDefault, FlatPickr },
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
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
		};
	},
	computed: {
		config() {
			return {
				date: this.configDate,
				time: this.configTime,
			}[this.type];
		},
	},
};
</script>

<style src="flatpickr/dist/flatpickr.css"></style>
<style lang="scss" scoped>
@import "@variables";

.calendar-input /deep/ .flatpickr-input {
	box-sizing: border-box;
	display: block;
	width: 100%;
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
</style>
