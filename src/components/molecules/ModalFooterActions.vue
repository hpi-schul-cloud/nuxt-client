<template>
	<default-modal-footer class="actions">
		<template #left>
			<div class="slot-container">
				<slot name="left"></slot>
			</div>
		</template>
		<template #right>
			<slot name="right"></slot>
		</template>
	</default-modal-footer>
</template>

<script>
import DefaultModalFooter from "@/components/molecules/ModalFooter";
export default {
	components: {
		DefaultModalFooter,
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.actions {
	padding: 0;
	background-color: var(--v-secondary-base);
}

.slot-container {
	padding: var(--space-sm) var(--space-md);

	@include breakpoint(tablet) {
		padding: 0;
	}
}

.slot-container-right {
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0 var(--space-md);
}
</style>
