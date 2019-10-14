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

.modal-container {
	min-height: auto;
}

.container {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	padding: var(--space-sm);

	@include breakpoint(tablet) {
		padding: var(--space-md) var(--space-xl);
	}
}

.modal-header {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.modal-body {
	margin-top: var(--space-md);
}
</style>
