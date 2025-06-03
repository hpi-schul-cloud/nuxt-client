<template>
	<VMenu>
		<template #activator="{ props }">
			<v-btn
				v-bind="props"
				v-bind.attr="$attrs"
				:icon="icon"
				:color="color"
				:data-testid="dataTestId"
				size="small"
			/>
		</template>
		<VCard>
			<slot />
		</VCard>
	</VMenu>
</template>

<script setup lang="ts">
defineOptions({
	inheritAttrs: false,
});

defineProps({
	icon: {
		type: String,
		default: "",
	},
	color: {
		type: String,
		default: "on-background",
	},
	dataTestId: {
		type: String,
		default: "topbar-item",
	},
});
</script>
