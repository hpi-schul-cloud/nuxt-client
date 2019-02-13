<template>
	<div class="root">
		<label class="input__wrapper">
			<span :class="{ label: true, active: value && value !== 0 }">
				{{ label }}
			</span>
			<FlatPickr
				v-if="type === 'date'"
				v-model="value"
				v-bind="$attrs"
				:config="config"
				:wrap="true"
				v-on="$listeners"
				@input="$emit('update', value)"
			>
				<input
					:type="type"
					:name="name"
					class="input"
				/>
			</FlatPickr>
			<input
				v-else
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
import FlatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { German } from "flatpickr/dist/l10n/de.js";

export default {
	// currently, this only supports text input
	name: "BaseInput",
	components:{FlatPickr},
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
	data() {
		return {
			// Get more form https://chmln.github.io/flatpickr/options/
			config: {
				altFormat: "d.m.Y",
				altInput: true,
				dateFormat: "Y-m-d",
				locale: German,
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
$input-padding-left: 12px;

.root{
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

.input, .input__wrapper /deep/ .flatpickr-input{
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
</style>
