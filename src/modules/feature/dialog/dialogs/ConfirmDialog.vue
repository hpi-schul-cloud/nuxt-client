<template>
	<SvsDialog
		v-model="isOpen"
		:title="title"
		:is-open-state-managed-externally="true"
		@cancel="emit('cancel')"
		@confirm="emit('complete', true)"
		@after-leave="emit('after-leave')"
	>
		<template #content>
			{{ message }}
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { SvsDialog } from "@ui-dialog";

defineProps<{
	title: string;
	message: string;
}>();

const emit = defineEmits<{
	cancel: [];
	complete: [boolean];
	"after-leave": [];
}>();

const isOpen = defineModel<boolean>({ default: false });
</script>
