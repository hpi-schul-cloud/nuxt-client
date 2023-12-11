<template>
	<v-dialog
		ref="dialog"
		:model-value="isOpen"
		:max-width="size"
		@keydown.esc="onClose"
		@click:outside="onClose"
	>
		<v-card class="menu-text">
			<div class="d-flex justify-center mt-4 text-h4">
				<slot name="title">{{ "" }}</slot>
			</div>
			<v-card-text class="text--primary">
				<slot name="content">_</slot>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
	isOpen: Boolean,
	size: {
		type: Number,
		default: 480,
	},
});

const emit = defineEmits(["dialog-closed", "remove:filter"]);

const dialog = ref(null);

const onClose = () => {
	emit("dialog-closed", false);
};
</script>
