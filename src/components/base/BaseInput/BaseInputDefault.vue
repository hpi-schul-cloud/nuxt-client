<template>
	<div class="wrapper">
		<div
			:class="{
				top: true,
				error: hasError,
				disabled: !!disabled,
			}"
		>
			<div :class="{ 'info-line': true, 'label-visible': showLabel }">
				<transition name="fade">
					<label
						v-show="showLabel"
						:class="{ label: true, info: true }"
						:for="`input-${$uid}`"
					>
						{{ label }}
					</label>
				</transition>
				<span v-if="!!hint" class="hint info">
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
							@input="handleInput"
							@focus="hasFocus = true"
							@blur="hasFocus = false"
						/>
					</slot>
				</div>
				<base-button
					v-if="type === 'password' && !error && !success"
					design="none"
					type="button"
					data-testid="pwd-visibility-toggle"
					class="icon-behind pwd-toggle"
					@click="togglePasswordVisibility"
				>
					<base-icon v-if="!passwordVisible" source="custom" icon="invisible" />
					<base-icon v-else source="custom" icon="visible" />
				</base-button>
				<base-icon
					v-if="error"
					source="custom"
					icon="warning"
					fill="var(--color-danger)"
					class="icon-behind"
				/>
				<base-icon
					v-if="success"
					source="custom"
					icon="success"
					fill="var(--color-success)"
					class="icon-behind"
				/>
			</div>
		</div>
		<span
			v-if="hasError || !!info"
			:class="{ info: true, help: !hasError, error: hasError }"
		>
			{{ error || info }}
		</span>
	</div>
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
	},
	data() {
		return {
			hasFocus: false,
			passwordVisible: false,
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
			return !!this.error;
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
			color: var(--color-accent);
		}
		.help {
			visibility: visible;
		}
		.visible {
			fill: var(--color-accent);
		}
	}
}

.top {
	width: 100%;
	border-bottom: var(--border-width) solid var(--color-black);

	&:focus-within,
	&:hover:not(.disabled) {
		border-bottom-color: var(--color-accent);
		outline: none;
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
		min-height: 1em;
		line-height: 100%;

		&:not(.label-visible) {
			justify-content: flex-end;
		}
	}
	.input-line {
		display: flex;
		.icon-before {
			display: inline-flex;
			align-items: center;
			min-width: 1.25em;
			margin-right: var(--space-xs-2);
		}
		.core {
			flex: 1;
			height: min-content;
			line-height: 0; // needed for correct spacing
			input {
				width: 100%;
				padding: var(--space-xs-2) 0;
				line-height: var(--line-height-md);
				color: var(--color-text);
				background: transparent;
				border: none;
				&:focus {
					outline: none;
				}
				&:disabled {
					color: var(--color-disabled-dark);
				}
			}
		}
		.icon-behind {
			display: inline-flex;
			align-items: center;
			min-width: 1.25em;
			margin-left: var(--space-xs-2);
		}
	}
}

.pwd-toggle {
	padding: 0 var(--space-xs-2);
	font-size: var(--text-lg);
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

.info {
	display: block;
	font-size: var(--text-xs);
	color: var(--color-gray);
}

.info.error {
	color: var(--color-danger);
}

.fade-enter-active {
	transition: opacity var(--duration-transition-medium);
}
.fade-enter {
	opacity: 0;
}
</style>
