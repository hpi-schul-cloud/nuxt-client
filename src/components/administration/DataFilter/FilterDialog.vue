<template>
	<v-dialog
		ref="dialog"
		:model-value="isOpen"
		:max-width="defaultSize"
		@keydown.esc="onClose"
		@update:model-value="onClose"
	>
		<v-card class="menu-text">
			<div class="d-flex justify-center mt-4 text-h4">
				<slot name="title" />
			</div>
			<v-card-text class="text--primary">
				<slot name="content" />
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
defineProps({
	isOpen: Boolean,
});

const defaultSize = 480;

const emit = defineEmits(["dialog-closed"]);

const onClose = () => {
	emit("dialog-closed", false);
};
</script>
