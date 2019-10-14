<template>
	<div>
		<base-modal v-bind="$attrs">
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
		</base-modal>
	</div>
</template>

<style lang="scss" scoped>
@import "@styles";

.modal-header {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: flex-start;
	padding: var(--space-md);
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
	flex-grow: 1;
	flex-shrink: 1;
	padding: var(--space-md) var(--space-md) 0 var(--space-md);
	overflow: auto;

	@include breakpoint(tablet) {
		padding: 0 var(--space-xl);
	}
}

.modal-footer {
	position: relative;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-sm) 0;
	margin: 0 var(--space-md);
	border-top: 1px solid var(--color-black);
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;

	:not(:first-child) {
		margin-left: var(--space-md);
	}

	@include breakpoint(tablet) {
		justify-content: flex-end;
		margin: 0 var(--space-xl);
	}
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
