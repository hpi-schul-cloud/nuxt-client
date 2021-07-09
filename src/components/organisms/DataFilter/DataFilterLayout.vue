<template>
	<div class="filter">
		<div class="filter__row">
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
.filter__row .chips {
	margin-top: var(--space-sm);
}
</style>
