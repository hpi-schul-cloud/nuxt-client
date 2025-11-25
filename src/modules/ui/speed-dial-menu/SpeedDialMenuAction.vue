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
			@click="$emit('onFabItemClick', action.customEvent)"
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
			@click="$emit('onFabItemClick', action.customEvent)"
		/>
	</div>
</template>

<script lang="ts" setup>
import { FabAction } from "@/components/templates/default-wireframe.types";

defineProps<{
	action: FabAction;
}>();

defineEmits<{
	(event: "onFabItemClick", customEvent?: string): void;
}>();
</script>
