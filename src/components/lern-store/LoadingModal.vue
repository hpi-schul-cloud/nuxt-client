<template>
	<base-modal v-bind="$attrs">
		<template #body>
			<modal-body-info :title="title" :description="description">
				<template #icon>
					<v-progress-circular indeterminate width="2" :color="color" size="60" class="mb-6" />
				</template>
			</modal-body-info>
		</template>
		<template #footer>
			<div class="d-flex justify-center align-items mb-4">
				<v-btn color="primary" variant="flat" @click="emit('update:active', false)">
					{{ $t(btnText) }}
				</v-btn>
			</div>
		</template>
	</base-modal>
</template>

<script setup lang="ts">
import BaseModal from "../base/BaseModal.vue";
import ModalBodyInfo from "@/components/molecules/ModalBodyInfo.vue";

type Props = {
	color?: string;
	title: string;
	description: string;
	btnText?: string;
};

withDefaults(defineProps<Props>(), {
	color: "rgba(var(--v-theme-primary))",
	btnText: "common.actions.cancel",
});

const emit = defineEmits<{
	(e: "update:active", value: boolean): void;
}>();
</script>
