<template>
	<label
		:class="{
			wrapper: true,
			'with-hint': hasInfo,
		}"
	>
		<div
			:class="{
				top: true,
				error: !!error,
				disabled: !!disabled,
			}"
		>
			<div v-if="$slots.icon" class="icon-before">
				<slot name="icon" />
			</div>
			<div class="core">
				<div :class="{ label: true, 'with-label': showLabel }">
					{{ label }}
				</div>
				<slot>
					<input
						v-bind="$attrs"
						:type="type"
						:value="vmodel"
						:disabled="disabled"
						@input="handleInput"
					/>
				</slot>
			</div>
			<base-icon
				v-if="error"
				source="custom"
				icon="warning"
				class="icon-behind error"
			/>
			<base-icon
				v-if="success"
				source="custom"
				icon="success"
				class="icon-behind success"
			/>
		</div>
		<span
			v-if="hasInfo"
			:class="{
				info: true,
				hint: !!hint & !error,
				error: !!error,
			}"
		>
			{{ error || hint }}
		</span>
	</label>
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
		success: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
		hideLabel: {
			type: Boolean,
		},
	},
	computed: {
		hasInfo() {
			return !!(this.error || this.hint);
		},
		showLabel() {
			return !!this.vmodel || !this.$attrs.placeholder;
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
.wrapper {
	display: block;
	&:not(.with-hint) {
		margin-bottom: calc(var(--text-sm) * var(--line-height-md));
	}
}

.top {
	display: flex;
	align-items: center;
	width: 100%;
	border-bottom: 1px solid var(--color-gray);
	&:focus-within,
	&:hover {
		border-bottom-color: var(--color-accent);
	}
	&:focus-within {
		outline: none;
		.label {
			color: var(--color-accent);
		}
	}
	&.error {
		border-bottom-color: var(--color-danger);
	}
	&.disabled {
		color: var(--color-disabled-dark);
	}
	.icon-before {
		margin-top: var(--space-md);
		margin-right: var(--space-xs);
		font-size: var(--text-lg);
	}
	.core {
		flex: 1;
		.label {
			font-size: var(--text-xs);
			&:not(.with-label) {
				visibility: hidden;
			}
		}
		input {
			width: 100%;
			height: 40px;
			color: var(--color-text);
			border: none;
			&:focus {
				outline: none;
			}
			&:disabled::placeholder {
				color: var(--color-disabled-dark);
			}
		}
	}
	.icon-behind {
		margin-left: var(--space-xs);
		font-size: var(--text-lg);
		&.error {
			color: var(--color-danger);
		}
		&.success {
			color: var(--color-success);
		}
	}
}

.info {
	display: block;
	padding-top: var(--space-xs);
	font-size: var(--text-xs);
	color: var(--color-gray);
	&.error {
		color: var(--color-danger);
	}
}
</style>
