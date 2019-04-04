<template>
	<base-input-default v-bind="$attrs" class="calendar-input">
		<flat-pickr
			:value="value"
			v-bind="$attrs"
			:config="config"
			:wrap="true"
			v-on="$listeners"
			@input="$emit('update', $event)"
		/>
	</base-input-default>
</template>
<script>
import BaseInputDefault from "./BaseInputDefault";
import FlatPickr from "vue-flatpickr-component";
import { German } from "flatpickr/dist/l10n/de.js";
export default {
	components: { BaseInputDefault, FlatPickr },
	props: {
		value: {
			type: String,
			required: true,
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
			}[this.$attrs.type];
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
@import "~flatpickr/dist/flatpickr.css";

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
