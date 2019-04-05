<template>
	<div>
		<label :class="classList">
			<div class="label">
				{{ $attrs.label }}
			</div>
			<slot>
				<input v-bind="$attrs" :value="vmodel" @input="handleInput" />
			</slot>
		</label>
		<span v-if="$attrs.error" class="error">{{ $attrs.error }}</span>
		<span v-else-if="$attrs.hint" class="hint">{{ $attrs.hint }}</span>
	</div>
</template>
<script>
export default {
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
			type: [String, Number],
			required: true,
		},
	},
	computed: {
		classList() {
			return this.$attrs.hint || this.$attrs.error
				? ["border", "with-hint"]
				: ["border"];
		},
	},
	methods: {
		handleInput(event) {
			let newVal = event.target.value;
			if (this.$attrs.type === "number") {
				newVal = parseInt(newVal, 10);
			}
			this.$emit("input", newVal);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
.border {
	position: relative;
	display: block;
	margin: 1em 0 $size-grid-padding;
	clear: both;
	background: $color-text-bg;
	border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
	&.with-hint {
		margin-bottom: 0;
	}
}
.label {
	@extend %typography-small;

	position: relative;
	padding-top: 4px;
	padding-left: 8px;
}
input,
/deep/ input {
	@extend %typography-small;

	display: block;
	width: 100%;
	padding: 4px 8px;
	border: 0;
	border-radius: $size-border-radius - $size-border-width;
	&::placeholder {
		color: lighten($color-text, 40%);
	}
}
.hint,
.error {
	display: block;
	margin-bottom: $size-grid-padding - 1rem;
	margin-left: 12px;
}
.error {
	color: red;
}
</style>
