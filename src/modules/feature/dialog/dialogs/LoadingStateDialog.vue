<template>
	<VDialog v-model="isLoading" width="300" persistent @after-leave="emit('after-leave')">
		<VCard class="px-2 py-3">
			<VCardText class="pb-0">
				<div class="mb-2 text-center" data-testid="dialog-text">
					{{ loadingText }}
				</div>
				<VProgressLinear indeterminate class="mb-2" />
			</VCardText>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { LoadingStateDialogProps } from "@feature-dialog";

defineProps<LoadingStateDialogProps>();
const emit = defineEmits<{
	complete: [];
	cancel: [];
	"after-leave": [];
}>();

const isLoading = defineModel<boolean>({ default: false });
</script>
