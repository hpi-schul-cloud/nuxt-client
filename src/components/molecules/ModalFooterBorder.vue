<template>
	<div>
		<div class="border"></div>
		<default-modal-footer>
			<template v-slot:right>
				<slot name="right"></slot>
			</template>
		</default-modal-footer>
	</div>
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

.border {
	margin: 0 var(--space-md);
	border-top: 1px solid black;

	@include breakpoint(tablet) {
		margin: 0 var(--space-xl);
	}
}
</style>
