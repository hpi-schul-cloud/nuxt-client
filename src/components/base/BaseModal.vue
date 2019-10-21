<template>
	<transition name="modal">
		<div
			v-if="active"
			class="modal-mask"
			role="dialog"
			:aria-modal="active"
			:aria-labelledby="`modal-${$uid}-title`"
			:aria-describedby="`modal-${$uid}-body`"
		>
			<div class="base-modal-wrapper" @click.self="handleBackgroundClick">
				<div
					class="modal-container"
					:class="{ 'modal-container--large': size === 'large' }"
				>
					<slot>
						<!-- TODO add styles so footer is always visbile -->

						<h2 :id="`modal-${$uid}-title`" class="h4 modal-header">
							<slot name="header" />
						</h2>
						<div :id="`modal-${$uid}-body`" class="modal-body">
							<slot name="body" />
						</div>

						<slot name="footer">
							<modal-footer>
								<template v-slot:left>
									<slot name="footer-left"></slot>
								</template>
								<template v-slot:right>
									<slot name="footerRight"></slot>
								</template>
							</modal-footer>
						</slot>
					</slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import uidMixin from "@mixins/uid";
import ModalFooter from "@components/molecules/ModalFooter";
export default {
	components: {
		ModalFooter,
	},
	mixins: [uidMixin],
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

.line {
	border: 1px solid black;
}

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

.base-modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	display: flex;
	flex-direction: column;
	width: 95%;
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	max-height: calc(100vh - (2 * var(--space-lg)));
	margin: 0 auto;
	overflow: hidden;
	background-color: var(--color-white);
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-sm);
	transition: all var(--duration-transition-medium) ease;
	&--large {
		min-height: 80%;

		@include breakpoint(tablet) {
			min-height: auto;
		}
	}
}

.modal-body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	flex-shrink: 1;
	justify-content: center;
	padding: var(--space-md) var(--space-md);
	overflow: auto;
}

@include breakpoint(tablet) {
	.modal-body {
		flex-grow: 0;
		padding: var(--space-md) var(--space-xl);
	}
}

.modal-header {
	padding: var(--space-md);
	text-align: center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
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
