<template>
	<div>
		<div class="border" />
		<default-modal-footer>
			<template #right>
				<slot name="right" />
			</template>
		</default-modal-footer>
	</div>
</template>

<script setup lang="ts">
import DefaultModalFooter from "@/components/molecules/ModalFooter.vue";
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.border {
	margin: 0 var(--space-md);
	border-top: 1px solid black;

	@include breakpoint(tablet) {
		margin: 0 var(--space-xl);
	}
}
</style>
