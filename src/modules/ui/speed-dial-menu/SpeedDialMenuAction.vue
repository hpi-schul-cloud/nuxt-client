-
<template>
	<div class="d-flex justify-end align-center pr-2">
		<VBtn
			class="mr-2 text-on-surface"
			:data-test-id="action.dataTestId"
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
			:data-test-id="action.dataTestId"
			:icon="action.icon"
			:href="action.href"
			:to="action.to"
			:aria-label="action.ariaLabel"
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
