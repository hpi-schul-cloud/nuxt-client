<template>
	<transition name="fade">
		<div v-if="show" class="context-menu" :style="anchorCSS">
			<base-button
				v-for="action of actions"
				:key="action.text"
				design="none"
				class="context-menu__button"
				@click="emitEvent(action.event, action.arguments)"
			>
				<base-icon
					source="material"
					:icon="action.icon"
					class="context-menu__button-icon"
				/>
				<div class="context-menu__button-text">
					{{ action.text }}
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
	mounted() {
		window.addEventListener("keyup", this.escKeyHandler);
	},
	beforeDestroy() {
		window.removeEventListener("keyup", this.escKeyHandler);
	},
	methods: {
		escKeyHandler(e) {
			if (this.menuActive && e.keyCode === 27) {
				this.removeMenu();
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
.context-menu {
	--transition-duration: var(--duration-transition-fast);

	position: absolute;
	z-index: var(--layer-dropdown);
	display: flex;
	flex-direction: column;
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
			font-size: var(--text-md);
			color: var(--color-black);
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
