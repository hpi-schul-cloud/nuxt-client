<template>
	<div>
		<div
			v-for="(value, key, index) in $scopedSlots"
			:key="key"
			class="slot-wrapper"
		>
			<slot :name="key" :class="`slot-${index}`" />
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.slot-wrapper {
	margin: var(--space-md) 0;
	&:first-of-type {
		margin-top: 0;
	}
	&:last-of-type {
		margin-bottom: 0;
	}
}
</style>
