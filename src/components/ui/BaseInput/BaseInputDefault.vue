<template>
	<div class="baseinput">
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
			type: [String, Boolean], // Boolean is used to disable validation when the slot is used
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type) || !type;
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
@import "@styles";
.baseinput {
	--border-width: 2px;
	--border-radius: var(--space-sm);
	--indentation: var(--space-xs);
}
.border {
	position: relative;
	display: block;
	margin: var(--indentation) 0;
	clear: both;
	background-color: var(--color-white);
	border: var(--border-width) solid var(--color-gray);
	border-radius: var(--border-radius);
	transition: border-color var(--duration-transition-fast) ease;
	&.with-hint {
		margin-bottom: 0;
	}
	&:focus-within {
		border-color: var(--color-gray-dark);
	}
}
.label {
	position: relative;
	padding-left: var(--indentation);
	font-size: var(--text-md);
	font-weight: bold;
}
input,
/deep/ input {
	display: block;
	width: 100%;
	padding: var(--space-xs) var(--indentation);
	background-color: transparent;
	border: 0;
	border-bottom-right-radius: calc(var(--border-radius) - var(--border-width));
	border-bottom-left-radius: calc(var(--border-radius) - var(--border-width));
	&::placeholder {
		color: var(--color-gray);
	}
	&:focus {
		outline: none;
	}
}
.hint,
.error {
	display: block;
	margin-left: var(--indentation);
}
.error {
	color: var(--color-error);
}
</style>
