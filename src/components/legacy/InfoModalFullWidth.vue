<template>
	<VDialog width="480">
		<VCard>
			<VCardText class="d-flex flex-column align-center">
				<slot name="icon" />
				<h2 class="my-4">{{ title }}</h2>
				<p class="text-center">{{ description }}</p>
			</VCardText>
			<VCardActions>
				<VBtn :text="$t('common.actions.ok')" variant="flat" block color="primary" @click="close" />
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		title?: string;
		description?: string;
	}>(),
	{
		title: "",
		description: "",
	}
);

const emit = defineEmits<{
	(e: "update:model-value", value: boolean): void;
}>();

const close = () => {
	emit("update:model-value", false);
};
</script>
