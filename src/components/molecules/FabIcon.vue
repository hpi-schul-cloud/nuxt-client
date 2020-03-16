<template>
	<div class="fab-wrapper">
		<base-button
			class="fab primary"
			design="none"
			:class="{
				expanded: isOpen,
			}"
			type="button"
			:aria-label="primaryActionWithDefaults.label"
			:style="{ 'background-color': color, color: primaryTextColor }"
			@click="handlePrimaryAction"
		>
			<transition name="morph" mode="out-in">
				<!-- key attributes are required for transition -->
				<BaseIcon
					v-if="!isOpen"
					key="closedLogo"
					class="icon"
					:icon="primaryActionWithDefaults.icon"
					:source="primaryActionWithDefaults['icon-source']"
				/>
				<BaseIcon
					v-else
					key="expandedIcon"
					class="icon"
					icon="close"
					source="material"
				/>
			</transition>
		</base-button>

		<div
			class="inner-fabs"
			:class="{
				expanded: isOpen,
				'expand-top': expandDirection === 'top',
				'expand-bottom': expandDirection === 'bottom',
			}"
		>
			<base-button
				v-for="action in actions"
				:key="action.icon + action.label"
				design="none"
				type="button"
				class="fab small"
				:disabled="!isOpen"
				:tabindex="isOpen ? 0 : -1"
				:aria-hidden="(!isOpen).toString()"
				:class="{
					labeled: action.label && showLabel,
					'label-left': labelPosition === 'left',
					'label-right': labelPosition === 'right',
				}"
				:data-tooltip="action.label"
				:aria-label="action.label"
				:to="action.to"
				:href="action.href"
				@click="triggerAction(action)"
			>
				<BaseIcon :icon="action.icon" :source="action['icon-source']" />
			</base-button>
		</div>
	</div>
</template>
<script>
const primaryActionDefault = {
	icon: "add",
	"icon-source": "material",
	event: "click",
	label: "toggle action button visiblity",
};

const isActionValid = (action) =>
	action.icon &&
	action["icon-source"] &&
	(action.event || action.to || action.href) &&
	action.label;

export default {
	props: {
		actions: {
			type: Array,
			default: () => [],
			validator: (actions) => actions.every(isActionValid),
		},
		color: {
			type: String,
			default: "var(--color-primary)",
			validator: (value) =>
				value.startsWith("var(--color") && value.endsWith(")"),
		},
		expandDirection: {
			type: String,
			default: "top",
			validator: (position) => ["top", "bottom"].includes(position),
		},
		labelPosition: {
			type: String,
			default: "left",
			validator: (position) => ["left", "right"].includes(position),
		},
		noAutoClose: {
			type: Boolean,
		},
		primaryAction: {
			type: Object,
			default: () => ({}),
			validator: (value) =>
				isActionValid({ ...primaryActionDefault, ...value }),
		},
		showLabel: {
			type: Boolean,
		},
	},
	data() {
		return {
			isOpen: false,
		};
	},
	computed: {
		primaryTextColor() {
			return this.color.replace("--color-", "--color-on-");
		},
		primaryActionWithDefaults() {
			return {
				...primaryActionDefault,
				...this.primaryAction,
			};
		},
		hasSubActions() {
			return Boolean(this.actions.length);
		},
	},
	methods: {
		handlePrimaryAction() {
			if (this.hasSubActions) {
				this.isOpen = !this.isOpen;
			} else {
				this.triggerAction(this.primaryActionWithDefaults);
			}
		},
		triggerAction(action) {
			if (!this.noAutoClose) {
				this.isOpen = false;
			}
			this.$emit(action.event, action.arguments);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

$fab-color: var(--color-primary);
$fab-text-color: var(--color-on-primary);
$fab-shadow: var(--shadow-xs);
$fab-label-shadow: var(--shadow-xxxs);

$fab-small-color: var(--color-white);
$fab-small-text-color: var(--color-on-white);
$fab-label-color: var(--color-overlay);
$fab-label-text-color: var(--color-on-overlay);

$fab-spacing: 60;
$fab-offset: 60;
$fab-label-offset: 50px;

.fab-wrapper {
	position: relative;
}

.fab {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 56px;
	height: 56px;
	font-size: var(--text-lg);
	color: $fab-text-color;
	cursor: pointer;
	user-select: none;
	background-color: $fab-color;
	border: none;
	border-radius: var(--radius-round);
	box-shadow: $fab-shadow;
	transition: all 300ms ease-in-out;
}

.fab.primary {
	z-index: var(--layer-page);
}

.fab.small {
	width: 40px;
	height: 40px;
	font-size: var(--text-sm);
	color: $fab-small-text-color;
	background-color: $fab-small-color;
}

.inner-fabs {
	.fab {
		// center fabs behind primary fab
		position: absolute;
		top: 8px;
		left: 8px;
		will-change: transform;
		&.labeled {
			&::before {
				position: absolute;
				top: 50%;
				display: inline-block;
				max-width: 200px;
				padding: var(--space-xs-2) var(--space-xs);
				font-size: var(--text-sm);
				font-weight: var(--font-weight-bold);
				color: $fab-label-text-color;
				text-align: center;
				text-overflow: ellipsis;
				white-space: nowrap;
				vertical-align: middle;
				content: attr(data-tooltip);
				background-color: $fab-label-color;
				border-radius: var(--radius-sm);
				box-shadow: $fab-label-shadow;
				opacity: 0;
				transition: opacity 150ms cubic-bezier(0.4, 0, 1, 1);
				transform: translateY(-50%);
				will-change: opacity;
			}
			&.label-left::before {
				right: $fab-label-offset;
			}
			&.label-right::before {
				left: $fab-label-offset;
			}
		}
	}
	&.expanded {
		.fab.labeled::before {
			opacity: 1;
			transition: opacity 150ms cubic-bezier(0.4, 0, 1, 1);
		}

		&.expand-top {
			@for $i from 0 through 5 {
				.fab {
					&:nth-child(#{$i + 1}) {
						transform: translateY(-#{$i * $fab-spacing + $fab-offset}px);
					}
				}
			}
		}
		&.expand-bottom {
			@for $i from 0 through 5 {
				.fab {
					&:nth-child(#{$i + 1}) {
						transform: translateY(#{$i * $fab-spacing + $fab-offset}px);
					}
				}
			}
		}
	}
}

.morph-enter-active,
.morph-leave-active {
	transition: transform var(--duration-transition-fast) ease,
		opacity var(--duration-transition-fast) ease;
}
.morph-enter,
.morph-leave-to {
	opacity: 0;
	transform: scaleY(0);
}
</style>
