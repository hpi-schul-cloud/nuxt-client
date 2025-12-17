-
<template>
	<div class="d-flex justify-end align-center pr-5">
		<VBtn
			class="mr-2 bg-surface z-index-100"
			elevation="4"
			:data-testid="action.dataTestId"
			:href="action.href"
			:to="action.to"
			:aria-hidden="true"
			tabindex="-1"
			@click="action.clickHandler"
		>
			{{ action.label }}
		</VBtn>
		<VBtn
			color="primary"
			class="z-index-100"
			elevation="4"
			:data-testid="action.dataTestId"
			:icon="action.icon"
			:href="action.href"
			:to="action.to"
			:aria-label="action.ariaLabel ?? action.label"
			@click="action.clickHandler"
		/>
	</div>
</template>

<script lang="ts" setup>
import { FabAction } from "./types";

defineProps<{
	action: FabAction;
}>();
</script>

<style scoped>
.z-index-100 {
	z-index: 100;
}
</style>
