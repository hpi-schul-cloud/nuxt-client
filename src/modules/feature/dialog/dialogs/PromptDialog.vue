<template>
	<SvsDialog
		v-model="isOpen"
		:title="title"
		:is-open-state-managed-externally="true"
		@cancel="emit('cancel')"
		@confirm="onConfirm"
		@after-leave="emit('after-leave')"
	>
		<template #content>
			<VTextField v-model="value" :placeholder="placeholder" autofocus @keydown.enter="onConfirm" />
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";
import { VTextField } from "vuetify/components";

const props = defineProps<{
	title: string;
	placeholder?: string;
	initialValue?: string;
}>();

const emit = defineEmits<{
	cancel: [];
	complete: [string];
	"after-leave": [];
}>();

const isOpen = defineModel<boolean>({ default: false });
const value = computed(() => props.initialValue ?? "");

const onConfirm = () => {
	emit("complete", value.value);
};
</script>
