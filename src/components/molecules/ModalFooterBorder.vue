<template>
	<div>
		<div class="modal-border"></div>
		<default-modal-footer>
			<template #right>
				<slot name="right"></slot>
			</template>
		</default-modal-footer>
	</div>
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
@import "@/styles/mixins";

.modal-border {
	margin: 0 var(--space-md);
	border-top: 1px solid black;

	@include breakpoint(tablet) {
		margin: 0 var(--space-xl);
	}
}
</style>
