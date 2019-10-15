<template>
	<default-footer class="actions">
		<template v-slot="left">
			<slot name="left"></slot>
		</template>
		<template v-slot="right">
			<slot name="right"></slot>
		</template>
	</default-footer>
</template>

<script>
import DefaultFooter from "@components/molecules/ModalFooter";
export default {
	components: {
		DefaultFooter,
	},
};
</script>

<style lang="scss" scoped>
.actions {
	background-color: var(--color-tertiary);
}
</style>
