<template>
	<div class="filter">
		<div class="row">
			<div class="select">
				<slot name="select" />
			</div>
			<div class="chips">
				<slot name="chips" />
			</div>
		</div>
		<div class="modal">
			<slot name="modal" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.row {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	width: 100%;

	.chips {
		margin-top: var(--space-sm);
	}
}
</style>
