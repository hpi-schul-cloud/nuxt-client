<template>
	<div>
		<label :class="classList">
			<div class="label">
				{{ label }}
			</div>
			<slot>
				<input
					v-bind="$attrs"
					:type="type"
					:value="vmodel"
					@input="handleInput"
				/>
			</slot>
		</label>
		<span v-if="error" class="error">{{ error }}</span>
		<span v-else-if="hint" class="hint">{{ hint }}</span>
	</div>
</template>
<script>
export const supportedTypes = [
	"email",
	"password",
	"search",
	"tel",
	"text",
	"url",
	"number",
];

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
		type: {
			type: String,
			required: true,
			validate(value) {
				return supportedTypes.includes(value);
			},
		},
		label: {
			type: String,
			required: true,
		},
		hint: {
			type: String,
			default: "",
		},
		error: {
			type: String,
			default: "",
		},
	},
	computed: {
		classList() {
			return this.hint || this.error ? ["border", "with-hint"] : ["border"];
		},
	},
	methods: {
		handleInput(event) {
			let newVal = event.target.value;
			if (this.type === "number") {
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
	background-color: transparent;
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
