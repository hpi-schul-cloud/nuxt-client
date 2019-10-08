<template>
	<transition name="modal">
		<div v-if="active" class="modal-mask">
			<div class="modal-wrapper" @click.self="handleBackgroundClick">
				<div
					class="modal-container"
					:class="{ 'modal-container--large': size === 'large' }"
				>
					<div class="container">
						<slot>
							<div class="modal-header">
								<h4>
									<slot name="header" />
								</h4>
							</div>

							<div class="modal-body">
								<slot name="body" />
							</div>
						</slot>
					</div>

					<slot name="footer-wrapper">
						<div class="modal-footer">
							<slot name="footer" />
						</div>
					</slot>
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

<style lang="scss" scoped>
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
.container {
	display: flex;
	flex-direction: column;
	flex-grow: 2;
	align-items: center;
	justify-content: center;
}

.modal-container {
	display: flex;
	flex-direction: column;
	width: 95%;
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	min-height: 405px;
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
	border-bottom: none;
	border-top-left-radius: var(--radius-md);
	border-top-right-radius: var(--radius-md);
}

.modal-header h4 {
	padding: var(--space-xl) var(--space-xl) 0 var(--space-xl);
	margin: 0 auto;
	font-weight: var(--font-weight-regular);
}

.modal-body {
	flex-shrink: 1;
	padding: var(--space-md) var(--space-xl);
	overflow: inherit;
	font-size: var(--heading-4);
	text-align: center;
}

.modal-footer {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-md) 0;
	margin: 0 var(--space-xl);
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;

	:not(:first-child) {
		margin-left: var(--space-md);
	}

	@include breakpoint(tablet) {
		justify-content: flex-end;
	}
}

.modal-default-button {
	float: right;
}

#button.is-accent {
	margin-left: var(--space-sm);
	background-color: var(--color-accent);
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
