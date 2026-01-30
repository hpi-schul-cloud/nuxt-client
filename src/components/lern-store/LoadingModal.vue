<template>
	<VDialog v-model="isOpen" width="480">
		<VCard>
			<VCardText class="d-flex flex-column align-center">
				<VProgressCircular indeterminate width="2" color="primary" size="60" class="my-6" />
				<h2 class="my-4">{{ $t("pages.content.notification.loading") }}</h2>
			</VCardText>
			<VCardActions>
				<VBtn color="primary" variant="flat" block @click="emit('update:modelValue', false)">
					{{ $t("common.actions.cancel") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void;
}>();

const isOpen = defineModel({
	type: Boolean,
	required: true,
});
</script>
