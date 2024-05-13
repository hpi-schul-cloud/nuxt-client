<template>
	<div class="mb-4" ref="headerRef">
		<div class="d-flex flex-column justify-space-between align-stretch pt-2">
			<VBtn
				elevation="0"
				variant="text"
				class="d-flex flex-row justify-start mb-2"
				:color="isColumnActive ? '' : 'grey-darken-2'"
				@click="onAddColumn"
			>
				<VIcon>{{ mdiPlus }}</VIcon> {{ label }}
			</VBtn>
		</div>
		<VDivider aria-hidden="true" class="border-opacity-25" />
	</div>
</template>

<script setup lang="ts">
import { mdiPlus } from "@mdi/js";

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

<style scoped>
.margin-fix {
	margin-top: 2px;
}

.transition-divider {
	transition: all ease-in 150ms;
}
</style>
