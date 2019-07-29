<template>
	<transition name="modal">
		<div v-if="active" class="modal-mask">
			<div class="modal-wrapper" @click.self="handleBackgroundClick">
				<div
					class="modal-container"
					:class="{ 'modal-container--large': size === 'large' }"
				>
					<slot />
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean,
		},
		size: {
			type: String,
			default: "medium",
		},
	},
	watch: {
		active() {
			if (this.active) {
				document.body.classList.add("is-noscroll");
			} else {
				document.body.classList.remove("is-noscroll");
			}
		},
	},
	methods: {
		handleBackgroundClick() {
			this.close();
		},
		close() {
			this.$emit("update:active", false);
		},
	},
};
</script>

<style lang="scss">
@import "@styles";

.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: var(--layer-modal);
	display: table;
	width: 100%;
	height: 100%;
	background-color: var(--color-overlay);
	transition: opacity var(--duration-transition-medium) ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	display: flex;
	flex-direction: column;
	width: 80%;
	max-height: calc(100vh - 40px);
	margin: 0 auto;
	background-color: var(--color-white);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-sm);
	transition: all var(--duration-transition-medium) ease;
	&--large {
		min-height: 80%;
	}
}

.modal-header {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: flex-start;
	padding: var(--space-md);
	border-bottom: 1px solid var(--color-gray);
	border-top-left-radius: var(--radius-md);
	border-top-right-radius: var(--radius-md);
}

.modal-header h3 {
	font-size: var(--text-lg);
	font-weight: var(--font-weight-bold);
}

.modal-body {
	flex-grow: 1;
	flex-shrink: 1;
	padding: var(--space-lg) var(--space-md);
	overflow: auto;
}

.modal-footer {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: flex-end;
	padding: var(--space-md);
	border-top: 1px solid var(--color-gray);
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;
}

.modal-default-button {
	float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter,
.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	transform: scale(1.1);
}
</style>
