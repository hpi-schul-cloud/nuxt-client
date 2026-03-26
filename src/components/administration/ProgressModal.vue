<template>
	<VDialog width="480">
		<VCard>
			<VCardText class="d-flex flex-column align-center">
				<h2>{{ title }}</h2>
				<p>{{ description }}</p>
				<VProgressLinear :model-value="percent" height="15" bg-color="grey-lighten-1" class="rounded mt-4" />
			</VCardText>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
	description: string;
	percent: number;
}>();
</script>
