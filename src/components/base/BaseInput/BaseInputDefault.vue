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
						:for="`input-${uid}`"
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
							:id="`input-${uid}`"
							ref="input"
							v-focus-on-mount="focus"
							:aria-label="showLabel ? undefined : label"
							v-bind="$attrs"
							:placeholder="placeholder"
							:type="appliedType"
							:value="modelValue"
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
					<v-btn
						v-if="type === 'password' && !error && !success"
						icon
						variant="text"
						type="button"
						data-testid="pwd-visibility-toggle"
						class="pwd-toggle"
						:aria-label="$t('components.base.showPassword')"
						@click="togglePasswordVisibility"
					>
						<v-icon>{{ visibilityIcon }}</v-icon>
					</v-btn>
					<v-icon
						v-if="hasError"
						color="rgba(var(--v-theme-error))"
						:icon="mdiAlert"
					/>
					<v-icon
						v-if="success"
						color="rgba(var(--v-theme-success))"
						:icon="mdiCheckCircleOutline"
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
import { inputRangeDate } from "@/plugins/datetime";
import {
	mdiAlert,
	mdiCheckCircleOutline,
	mdiEyeOffOutline,
	mdiEyeOutline,
} from "@icons/material";
import { defineComponent } from "vue";
import { useUid } from "@/utils/uid";

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

export default defineComponent({
	directives: {
		focusOnMount: {
			mounted(el, binding) {
				if (binding.value) el.focus();
			},
		},
	},
	props: {
		modelValue: { type: [String, Number], default: undefined },
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
	emits: ["update:modelValue", "blur", "focus"],
	setup() {
		const { uid } = useUid();

		return {
			uid,
		};
	},
	data() {
		return {
			mdiAlert,
			mdiCheckCircleOutline,
			mdiEyeOffOutline,
			mdiEyeOutline,
			hasFocus: false,
			passwordVisible: false,
			minDate: inputRangeDate(-100, "y"),
			maxDate: inputRangeDate(-4, "y"),
			birthDateValidationPattern:
				"(3[01]|[12][0-9]|0?[1-9]).(1[012]|0?[1-9]).((?:19|20)d{2})",
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
					Boolean(this.modelValue) ||
					!this.placeholder) &&
				!this.labelHidden
			);
		},
		visibilityIcon() {
			return this.passwordVisible ? mdiEyeOutline : mdiEyeOffOutline;
		},
	},
	methods: {
		handleInput(event) {
			let newVal = event.target.value;
			if (this.type === "number") {
				newVal = parseInt(newVal, 10);
			}
			this.$emit("update:modelValue", newVal);
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
});
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

.wrapper {
	display: block;

	.help {
		padding-top: 4px;
		visibility: hidden;
	}

	.label {
		margin-right: 12px;
	}

	&:focus-within,
	&:hover:not(.disabled) {
		.label {
			color: rgba(var(--v-theme-primary));
		}

		.help {
			visibility: visible;
		}

		.visible {
			fill: rgba(var(--v-theme-primary));
		}
	}
}

.bottom-line {
	border-bottom: var(--border-width-bold) solid;
}

.top {
	width: 100%;
	border-bottom: var(--border-width) solid rgba(var(--v-theme-on-background));

	&:focus-within,
	&:hover:not(.disabled) {
		border-bottom: var(--border-width-bold) solid rgba(var(--v-theme-primary));
		outline: none;

		~ .bottom-line {
			border-bottom: var(--border-width) solid;
		}
	}

	&.base-input-error {
		border-bottom-color: rgba(var(--v-theme-error));
	}

	&.disabled {
		color: map.get($grey, base);
		border-bottom-color: map.get($grey, base);
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
		padding-bottom: 2px;

		.icon {
			display: flex;
			align-items: center;
			width: 24px;
			text-align: center;

			&.icon-before {
				margin-right: 6px;
			}

			&.icon-behind {
				margin-left: 8px;
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
				margin: 0 !important;
				line-height: 100%;
				cursor: text;
				background: transparent;
				border: none;

				&:focus {
					outline: none;
				}

				&:disabled {
					background-color: transparent;

					&::placeholder {
						color: map.get($grey, base);
					}
				}
			}
		}
	}
}

.pwd-toggle {
	color: map.get($grey, base);
	border-radius: var(--radius-round);

	&:hover {
		color: map.get($grey, darken-3);
	}

	&:focus {
		color: map.get($grey, darken-3);
		outline: none;
		box-shadow:
			0 0 0 3px rgba(var(--v-theme-white)),
			0 0 0 6px map.get($grey, darken-3);
	}
}

.base-input-info {
	display: block;
	font-size: var(--text-xs);
	color: map.get($grey, base);
}

.base-input-info.base-input-error {
	color: rgba(var(--v-theme-error));
}

.fade-enter-active {
	transition: opacity 0.3s;
}

.fade-enter {
	opacity: 0;
}
</style>
