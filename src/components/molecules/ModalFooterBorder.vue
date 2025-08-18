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
@use "sass:map";
@use "@/styles/settings.scss" as *;

.border {
	margin: 0 16px;
	border-top: 1px solid black;

	@media #{map.get($display-breakpoints, 'sm-and-up')} {
		margin: 0 32px;
	}
}
</style>
