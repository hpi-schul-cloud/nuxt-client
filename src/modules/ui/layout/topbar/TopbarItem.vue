<template>
	<VMenu>
		<template #activator="{ props }">
			<VBtn
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
import { VBtn } from "vuetify/lib/components/index.mjs";

defineOptions({
	inheritAttrs: false,
});

defineProps({
	icon: {
		type: String,
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
