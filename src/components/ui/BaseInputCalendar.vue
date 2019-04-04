<template>
	<div class="boarder">
		<div v-if="$attrs.type === 'date'">
			<span :class="{ label: true, active: value && value !== 0 }">
				{{ $attrs.label }}
			</span>
			<flat-pickr
				v-model="val"
				v-bind="$attrs"
				:config="configDate"
				:wrap="true"
				v-on="$listeners"
				@input="$emit('update', val)"
			>
				<input type="date" :name="name" class="input" />
			</flat-pickr>
		</div>
		<div v-else-if="$attrs.type === 'time'">
			<span
				:class="{ label: true, active: $attrs.value && $attrs.value !== 0 }"
			>
				{{ $attrs.label }}
			</span>
			<flat-pickr
				v-model="val"
				v-bind="$attrs"
				:config="configTime"
				:wrap="true"
				v-on="$listeners"
				@input="$emit('update', val)"
			>
				<input type="time" :name="name" class="input" />
			</flat-pickr>
		</div>
	</div>
</template>
<script>
import FlatPickr from "vue-flatpickr-component";
import { German } from "flatpickr/dist/l10n/de.js";
export default {
	components: { FlatPickr },
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
.boarder {
	position: relative;
	display: block;
	margin: 1em 0 $size-grid-padding;
	clear: both;
	background: $color-text-bg;
	border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
}
.input,
.boarder /deep/ .flatpickr-input {
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
.label {
	@extend %typography-small;

	position: relative;
	top: 0;
	left: 12px;
	background-color: inherit;
	transform: translateY(-0.75em);
}
</style>
