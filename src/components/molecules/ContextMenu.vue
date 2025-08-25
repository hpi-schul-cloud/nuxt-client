<template>
	<transition name="fade">
		<div
			v-if="show"
			ref="context-menu"
			v-outside-click="handleClickOutside"
			class="context-menu elevation-8"
			:style="anchorCSS"
			role="menu"
		>
			<v-btn
				v-for="(action, index) of actions"
				:key="action.text"
				variant="text"
				height="50"
				rounded="0"
				:ripple="false"
				class="context-menu__button"
				role="menuitem"
				:data-testid="action.dataTestId || null"
				@click.prevent="emitEvent(action.event, action.arguments)"
				@keydown.up.prevent="focusPrev(index)"
				@keydown.down.prevent="focusNext(index)"
			>
				<span class="context-menu__button-icon">
					<v-icon v-if="action.icon" class="material-icon">{{
						action.icon
					}}</v-icon>
				</span>
				<div
					:class="{
						'context-menu__button-text': true,
						'no-icon': !action.icon,
					}"
				>
					{{ action.text }}
				</div>
			</v-btn>
		</div>
	</transition>
</template>

<script>
import { vOnClickOutside } from "@vueuse/components";

export default {
	directives: {
		outsideClick: vOnClickOutside,
	},
	props: {
		/**
		 * defines whether the menu is visible or not. Should be used with the .sync modifier
		 * ( https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier )
		 */
		show: {
			type: Boolean,
			required: true,
		},
		/**
		 * if true, the menu will not trigger a (update:show false) event on click of menu items
		 */
		noClose: {
			type: Boolean,
		},
		/**
		 * defines the anchor from where the menu should open. Behaves similar to the CSS transform-origin attribute.
		 */
		anchor: {
			type: String,
			default: "bottom-right",
			validator: (value) =>
				[
					"bottom-left",
					"bottom-right",
					"top-left",
					"top-right",
					"top-right-bottom-placed",
				].includes(value),
		},
		/**
		 * defines the text, icon and event for each menu item
		 * ( { text, icon?, icon-source?, event, argument? }[] )
		 * the text and event keys are required. The default icon source is "material".
		 * The value in arguments will be the first argument in the triggered event.
		 */
		actions: {
			type: Array,
			required: true,
			validator: (values) => values.every((value) => value.text && value.event),
		},
	},
	emits: ["update:show", "event", "action"],
	data() {
		return {
			shouldHandleClickOutside: false,
		};
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
				case "top-right-bottom-placed":
					return {
						right: 0,
						top: 100 + "%",
						"transform-origin": "top right",
					};
				default:
					throw new Error("anchor is not defined");
			}
		},
	},
	watch: {
		show: {
			handler(to) {
				if (!this.noClose) {
					if (to) {
						setTimeout(() => {
							this.shouldHandleClickOutside = true;
						}, 0);
					} else {
						this.shouldHandleClickOutside = false;
					}
				}

				this.$nextTick(() => {
					const menu = this.$refs["context-menu"];
					if (to && menu) {
						menu.querySelector("button")?.focus();
					}
				});
			},
			immediate: true,
		},
	},
	mounted() {
		window.addEventListener("keydown", this.escKeyHandler);
	},
	beforeUnmount() {
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
		handleClickOutside(event) {
			if (this.shouldHandleClickOutside) {
				event.preventDefault();
				event.stopPropagation();
				this.closeMenu();
			}
		},
		closeMenu() {
			if (!this.noClose && this.show) {
				/**
				 * will report the new state of the menu. Should be fetched by the .snyc modifier.
				 *
				 * @event update:show
				 * @type {Boolean} show only close events will be send from the component
				 */
				this.$emit("update:show", false);
			}
		},
		emitEvent(event, args) {
			setTimeout(() => {
				this.closeMenu();
			}, 300);
			/**
			 * your custom event for each menu item
			 *
			 * @event event Whatever you defined in the actions Array
			 * @type {any} args Whatever you defined in the actions Array
			 */
			this.$emit(event, args);
		},
	},
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

.context-menu {
	--transition-duration: 0.15s;

	position: absolute;
	z-index: var(--layer-dropdown);
	display: flex;
	flex-direction: column;
	min-width: 150px;
	max-width: 350px;
	background-color: rgba(var(--v-theme-white));
	border-radius: var(--radius-sm);

	> :hover {
		background-color: map.get($grey, lighten-3);
	}

	&__button {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
		padding-right: 16px !important;
		cursor: pointer;

		&-icon {
			margin: 16px !important;
		}

		&-text {
			width: max-content;
			font-size: var(--text-md);
			text-align: left;
			white-space: normal;

			&.no-icon {
				margin: 16px;
			}
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

.v-btn {
	font-weight: var(--font-weight-normal) !important;
	font-family: var(--font-accent);
}

.material-icon {
	width: 24px;
	height: 24px;
}
</style>

<style lang="scss">
.context-menu .context-menu__button-icon .v-icon.v-icon {
	font-size: var(--text-md);
}
</style>
