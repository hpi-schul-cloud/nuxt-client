<template>
	<transition name="fade">
		<div
			v-if="show"
			ref="context-menu"
			class="context-menu"
			:style="anchorCSS"
			role="menu"
		>
			<base-button
				v-for="(action, index) of actions"
				:key="action.text"
				design="none"
				class="context-menu__button"
				role="menuitem"
				@click="emitEvent(action.event, action.arguments)"
				@keydown.up="focusPrev(index)"
				@keydown.down="focusNext(index)"
			>
				<base-icon
					v-if="action.icon"
					source="material"
					:icon="action.icon"
					class="context-menu__button-icon"
				/>
				<div
					:class="{
						'context-menu__button-text': true,
						'no-icon': !action.icon,
					}"
				>
					{{ action.text }}
				</div>
			</base-button>
			<base-button
				design="none"
				class="context-menu__button-close"
				@click="closeMenu"
				@keydown.up="focusPrev(actions.length)"
			>
				<div class="context-menu__button-text no-icon">
					{{ $t("components.molecules.ContextMenu.action.close") }}
				</div>
			</base-button>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true,
		},
		noClose: {
			type: Boolean,
		},
		anchor: {
			type: String,
			default: "bottom-right",
			validator: (value) =>
				["bottom-left", "bottom-right", "top-left", "top-right"].includes(
					value
				),
		},
		actions: {
			type: Array,
			required: true,
		},
	},
	computed: {
		anchorCSS() {
			switch (this.anchor) {
				case "bottom-left":
					return {
						bottom: 0,
						left: 0,
						"transform-origin": "bottom left",
					};
				case "top-left":
					return {
						top: 0,
						left: 0,
						"transform-origin": "top left",
					};
				case "top-right":
					return {
						right: 0,
						top: 0,
						"transform-origin": "top right",
					};
				case "bottom-right":
					return {
						bottom: 0,
						right: 0,
						"transform-origin": "bottom right",
					};
				default:
					throw new Error("anchor is not defined");
			}
		},
	},
	watch: {
		show: {
			handler(to) {
				this.$nextTick(() => {
					const menu = this.$refs["context-menu"];
					if (to && menu) {
						menu.querySelector("button").focus();
					}
				});
			},
			immediate: true,
		},
	},
	mounted() {
		window.addEventListener("keydown", this.escKeyHandler);
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.escKeyHandler);
	},
	methods: {
		focusPrev(currentIndex) {
			const buttons = this.$refs["context-menu"].querySelectorAll("button");
			const prefIndex = Math.max(currentIndex - 1, 0);
			buttons[prefIndex].focus();
		},
		focusNext(currentIndex) {
			const buttons = this.$refs["context-menu"].querySelectorAll("button");
			const nextIndex = Math.min(currentIndex + 1, buttons.length - 1);
			buttons[nextIndex].focus();
		},
		escKeyHandler(e) {
			if (this.show && e.keyCode === 27) {
				this.closeMenu();
			}
		},
		closeMenu() {
			if (!this.noClose && this.show) {
				this.$emit("update:show", false);
			}
		},
		emitEvent(event, args) {
			setTimeout(() => {
				this.closeMenu();
			}, 300); // wait 500ms for the ripple animation to finish
			this.$emit(event, args);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.context-menu {
	--transition-duration: var(--duration-transition-fast);

	position: absolute;
	z-index: var(--layer-dropdown);
	display: flex;
	flex-direction: column;
	min-width: 150px;
	max-width: 350px;
	background-color: var(--color-white);
	border-radius: var(--radius-sm);
	box-shadow: var(--shadow-m);
	:hover {
		background-color: var(--color-gray-light);
	}
	&__button {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
		padding-right: var(--space-md) !important;

		&-icon {
			margin: var(--space-md) !important;
			color: var(--color-tertiary-light);
		}
		&-text {
			width: max-content;
			font-size: var(--text-md);
			color: var(--color-black);
			text-align: left;
			white-space: normal;
			&.no-icon {
				margin: var(--space-md);
			}
		}
		&-close:not(:focus) {
			@include visually-hidden;
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: transform var(--transition-duration) ease-in-out;
	transform: scaleY(1);
	> * {
		opacity: 1;
		transition: opacity calc(0.5 * var(--transition-duration)) ease-in-out
			calc(0.5 * var(--transition-duration));
	}
}
.fade-enter {
	transform: scaleY(0);
	> * {
		opacity: 0;
	}
}
.fade-leave-to {
	opacity: 0;
	transition: opacity var(--transition-duration) ease-in-out;
}
</style>
