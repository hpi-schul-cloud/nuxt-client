<!-- eslint-disable max-lines -->

<template>
	<label class="wrapper">
		<div
			:class="{
				top: true,
				error: !!error,
				disabled: !!disabled,
				'is-textarea': isTextarea,
			}"
		>
			<div :class="{ 'info-line': true, 'label-visible': showLabel }">
				<label
					:class="{ label: true, info: true, 'label-visible': showLabel }"
					for="`input-${$uid}`"
				>
					{{ label }}
				</label>
				<span v-if="hasHint" class="hint info">
					{{ hint }}
				</span>
			</div>
			<div class="input-line">
				<div v-if="$slots.icon" class="icon-before">
					<slot name="icon" />
				</div>
				<div class="core">
					<slot>
						<input
							id="`input-${$uid}`"
							ref="input"
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
		</div>
		<span
			v-if="hasError || hasInfo"
			:class="{ info: true, help: true, error: hasError }"
		>
			{{ error || info }}
		</span>
		<div v-if="type === 'password'" class="show-password-wrapper">
			<input type="checkbox" @click="togglePasswordVisibility" />
			<span class="show-password"> Password anzeigen </span>
		</div>
	</label>
</template>
<script>
import uidMixin from "@mixins/uid";

export const supportedTypes = [
	"email",
	"password",
	"search",
	"tel",
	"text",
	"textarea",
	"url",
	"number",
];

export default {
	mixins: [uidMixin],
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
		info: {
			type: String,
			default: "",
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
	},
	data: function() {
		return {
			showPassword: [false],
		};
	},
	computed: {
		hasHint() {
			return !!this.hint;
		},
		hasError() {
			return !!this.error;
		},
		hasInfo() {
			return !!this.info;
		},
		showLabel() {
			return !!this.vmodel || !this.$attrs.placeholder;
		},
		isTextarea() {
			return this.type === "textarea";
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
		togglePasswordVisibility() {
			if (this.type === "password") {
				const { input } = this.$refs;
				if (input.type === "password") {
					input.type = "text";
				} else if (input.type === "text") {
					input.type = "password";
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.wrapper {
	display: block;
}

.top {
	width: 100%;
	border-bottom: var(--border-width) solid var(--color-black);

	&:focus-within {
		outline: none;
		.label {
			color: var(--color-accent);
		}
	}
	&:focus-within,
	&:hover:not(.disabled) {
		border-bottom-color: var(--color-accent);
	}
	&.error {
		border-bottom-color: var(--color-danger);
	}
	&.disabled {
		color: var(--color-disabled-dark);
		border-bottom-color: var(--color-disabled-dark);
	}
	.info-line {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--space-xxxxs);

		&:not(.label-visible) {
			justify-content: flex-end;
		}
		.label {
			margin-right: var(--space-sm);
			&:not(.label-visible) {
				visibility: hidden;
			}
		}
	}
	.input-line {
		display: flex;
		.icon-before {
			width: 24px;
			height: 24px;
			margin-right: var(--space-xxs);
		}
		.core {
			flex: 1;
			input {
				width: 100%;
				margin-bottom: var(--space-xxs);
				color: var(--color-text);
				border: none;
				&:focus {
					outline: none;
				}
				&:disabled {
					background-color: transparent;
					&::placeholder {
						color: var(--color-disabled-dark);
					}
				}
			}
		}
		.icon-behind {
			width: 24px;
			height: 24px;
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
}

.is-textarea {
	border: var(--border-width) solid var(--color-black);
	&:focus-within,
	&:hover:not(.disabled) {
		border-color: var(--color-accent);
	}
	&.error {
		border-color: var(--color-danger);
	}
}

.info,
.show-password {
	display: block;
	font-size: var(--text-xs);
	color: var(--color-gray);
}
.help {
	padding-top: var(--space-xxxs);
}
.show-password {
	margin-left: var(--space-xxs);
}
.info.error {
	color: var(--color-danger);
}

.show-password-wrapper {
	display: flex;
	width: 100%;
}
</style>
