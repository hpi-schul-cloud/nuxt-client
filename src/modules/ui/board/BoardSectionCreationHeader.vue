<template>
	<div ref="headerRef" class="mb-4">
		<div class="d-flex flex-column justify-space-between align-stretch pt-3">
			<VBtn
				variant="text"
				class="d-flex flex-row justify-start"
				@click="onAddColumn"
			>
				<VIcon>{{ mdiPlus }}</VIcon> {{ label }}
			</VBtn>
		</div>
		<VDivider aria-hidden="true" class="border-opacity-25" />
	</div>
</template>

<script setup lang="ts">
import { mdiPlus } from "@icons/material";

defineProps({
	isColumnActive: {
		type: Boolean,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(["add-column"]);

const onAddColumn = () => {
	emit("add-column");
};
</script>
