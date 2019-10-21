<template>
	<default-modal-footer class="actions">
		<template v-slot:left>
			<div class="slot-container">
				<slot name="left"></slot>
			</div>
		</template>
		<template v-slot:right>
			<slot name="right"></slot>
		</template>
	</default-modal-footer>
</template>

<script>
import DefaultModalFooter from "@components/molecules/ModalFooter";
export default {
	components: {
		DefaultModalFooter,
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.actions {
	padding: 0;
	background-color: var(--color-tertiary);
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
