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
				<transition-group name="fade">
					<label
						v-show="showLabel"
						:class="{ label: true, info: true }"
						:for="`input-${$uid}`"
					>
						{{ label }}
					</label>
					<span v-if="!!hint" class="hint info">
						{{ hint }}
					</span>
				</transition-group>
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
							:type="appliedType"
							:value="vmodel"
							:disabled="disabled"
							:class="classes"
							@input="handleInput"
						/>
					</slot>
				</div>
				<base-button
					v-if="type === 'password' && !error && !success"
					design="none"
					type="button"
					data-testid="pwd-visibility-toggle"
					@click="togglePasswordVisibility"
				>
					<base-icon
						v-if="!passwordVisible"
						source="custom"
						icon="invisible"
						fill="var(--color-gray)"
						class="icon-behind"
					/>
					<base-icon
						v-else
						source="custom"
						icon="visible"
						fill="var(--color-gray)"
						class="icon-behind visible"
					/>
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
		info: { type: String, default: "" },
		hint: { type: String, default: "" },
		error: { type: String, default: "" },
		success: { type: Boolean },
		disabled: { type: Boolean },
		classes: { type: String, default: "" },
		focus: { type: Boolean },
	},
	data: function() {
		return {
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
			return (!!this.vmodel || !this.$attrs.placeholder) && !this.labelHidden;
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
		padding-top: var(--space-xxxs);
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
		min-height: var(--text-md);
		margin-bottom: var(--space-xxxxs);

		&:not(.label-visible) {
			justify-content: flex-end;
		}
	}
	.input-line {
		display: flex;
		.icon-before {
			width: 24px;
			height: 24px;
			margin-right: var(--space-xxs);
			/deep/ .material {
				/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
				font-size: 1.1em;
			}
		}
		.core {
			flex: 1;
			height: min-content;
			line-height: 0; // needed for correct spacing
			input {
				width: 100%;
				margin-bottom: var(--space-xxs);
				line-height: var(--line-height-md);
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
		}
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
