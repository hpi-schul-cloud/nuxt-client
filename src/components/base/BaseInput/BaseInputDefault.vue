<template>
	<div class="wrapper">
		<div
			:class="{
				top: true,
				'base-input-error': hasError,
				disabled: !!disabled,
			}"
		>
			<div :class="{ 'info-line': true, 'label-visible': showLabel }">
				<transition name="fade">
					<label
						v-show="showLabel"
						:class="{ label: true, 'base-input-info': true }"
						:for="`input-${$uid}`"
					>
						{{ label }}
					</label>
				</transition>
				<span v-if="!!hint" class="hint base-input-info">
					{{ hint }}
				</span>
			</div>
			<div class="input-line">
				<div v-if="$slots.icon" class="icon icon-before">
					<slot name="icon" />
				</div>
				<div class="core">
					<slot>
						<input
							:id="`input-${$uid}`"
							ref="input"
							v-focus-on-mount="focus"
							:aria-label="showLabel ? undefined : label"
							v-bind="$attrs"
							:placeholder="placeholder"
							:type="appliedType"
							:value="vmodel"
							:disabled="disabled"
							:class="classes"
							:min="appliedType === 'date' && birthDate ? minDate : ''"
							:max="appliedType === 'date' && birthDate ? maxDate : ''"
							:pattern="
								appliedType === 'date' && birthDate
									? birthDateValidationPattern
									: null
							"
							@input="handleInput"
							@focus="handleFocus"
							@blur="handleBlur"
						/>
					</slot>
				</div>
				<div class="icon icon-behind">
					<base-button
						v-if="type === 'password' && !error && !success"
						design="none"
						type="button"
						data-testid="pwd-visibility-toggle"
						class="pwd-toggle"
						@click="togglePasswordVisibility"
					>
						<base-icon
							source="custom"
							:icon="passwordVisible ? 'visible' : 'invisible'"
						/>
					</base-button>
					<base-icon
						v-if="hasError"
						source="custom"
						icon="warning"
						fill="var(--color-danger)"
					/>
					<base-icon
						v-if="success"
						source="custom"
						icon="success"
						fill="var(--color-success)"
					/>
				</div>
			</div>
		</div>
		<div class="bottom-line" style="border-color: transparent" />
		<span
			v-if="hasError || !!info"
			:class="{
				'base-input-info': true,
				help: !hasError,
				'base-input-error': hasError,
			}"
		>
			{{ error || validationError || info }}
		</span>
	</div>
</template>
<script>
import { inputRangeDate } from "@plugins/datetime";

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
	"date",
	"time",
];

export default {
	mixins: [uidMixin],
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: { type: [String, Number], default: undefined },
		type: {
			type: [String, Boolean], // Boolean is used to disable validation when the slot is used
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type) || !type;
			},
		},
		label: { type: String, required: true },
		labelHidden: { type: Boolean },
		placeholder: { type: String, default: "" },
		info: { type: String, default: "" },
		hint: { type: String, default: "" },
		error: { type: String, default: "" },
		success: { type: Boolean },
		disabled: { type: Boolean },
		classes: { type: String, default: "" },
		focus: { type: Boolean },
		birthDate: { type: Boolean },
		validationError: { type: String, default: "" },
	},
	data() {
		return {
			hasFocus: false,
			passwordVisible: false,
			minDate: inputRangeDate(-100, "y"),
			maxDate: inputRangeDate(-4, "y"),
			birthDateValidationPattern:
				"(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})",
		};
	},
	computed: {
		appliedType() {
			if (this.passwordVisible) {
				return "text";
			}
			return this.type;
		},
		hasError() {
			return !!(this.error || this.validationError);
		},
		showLabel() {
			return (
				(this.hasFocus ||
					this.disabled ||
					Boolean(this.vmodel) ||
					!this.placeholder) &&
				!this.labelHidden
			);
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
			this.passwordVisible = !this.passwordVisible;
		},
		handleFocus(event) {
			this.hasFocus = true;
			this.$emit("focus", event);
		},
		handleBlur(event) {
			this.hasFocus = false;
			this.$emit("blur", event);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.wrapper {
	display: block;

	.help {
		padding-top: var(--space-xs-3);
		visibility: hidden;
	}

	.label {
		margin-right: var(--space-sm);
	}

	&:focus-within,
	&:hover:not(.disabled) {
		.label {
			color: var(--color-primary);
		}

		.help {
			visibility: visible;
		}

		.visible {
			fill: var(--color-primary);
		}
	}
}

.bottom-line {
	border-bottom: var(--border-width-bold) solid;
}

.top {
	width: 100%;
	border-bottom: var(--border-width) solid var(--color-black);

	&:focus-within,
	&:hover:not(.disabled) {
		border-bottom: var(--border-width-bold) solid var(--color-primary);
		outline: none;

		~ .bottom-line {
			border-bottom: var(--border-width) solid;
		}
	}

	&.base-input-error {
		border-bottom-color: var(--color-danger);
	}

	&.disabled {
		color: var(--v-gray-base);
		border-bottom-color: var(--v-gray-base);
	}

	.info-line {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: var(--text-md);

		&:not(.label-visible) {
			justify-content: flex-end;
		}
	}

	.input-line {
		display: flex;
		align-items: center;
		padding-bottom: var(--space-xs-4);

		.icon {
			display: flex;
			align-items: center;
			width: 24px;
			text-align: center;

			&.icon-before {
				margin-right: var(--space-xs-2);
			}

			&.icon-behind {
				margin-left: var(--space-xs);
				font-size: var(--text-lg);
			}
		}

		.core {
			flex: 1;
			height: min-content;
			line-height: auto; // needed for correct spacing
			input {
				width: 100%;
				padding: 0;
				margin: 0;
				line-height: 100%;
				color: var(--color-text);
				cursor: text;
				background: transparent;
				border: none;

				&:focus {
					outline: none;
				}

				&:disabled {
					background-color: transparent;

					&::placeholder {
						color: var(--v-gray-base);
					}
				}
			}
		}
	}
}

.pwd-toggle {
	color: var(--color-gray);
	border-radius: var(--radius-round);

	&:hover {
		color: var(--color-gray-dark);
	}

	&:focus {
		color: var(--color-gray-dark);
		outline: none;
		box-shadow: 0 0 0 3px var(--color-white), 0 0 0 6px var(--color-gray-dark);
	}
}

.base-input-info {
	display: block;
	font-size: var(--text-xs);
	color: var(--color-gray);
}

.base-input-info.base-input-error {
	color: var(--color-danger);
}

.fade-enter-active {
	transition: opacity var(--duration-transition-medium);
}

.fade-enter {
	opacity: 0;
}
</style>
