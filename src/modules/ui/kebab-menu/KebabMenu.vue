<template>
	<VMenu location="bottom end" min-width="250">
		<template v-slot:activator="{ props }">
			<VBtn
				v-bind="props"
				v-bind.attr="$attrs"
				variant="text"
				:ripple="false"
				icon
				size="36"
				@click.stop.prevent="() => {}"
				@dblclick.stop.prevent="() => {}"
				@keydown.enter.stop
				@keydown.left.right.up.down.stop="() => {}"
			>
				<VIcon>{{ mdiDotsVertical }}</VIcon>
			</VBtn>
		</template>
		<VList role="menu">
			<slot />
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import { mdiDotsVertical } from "@/components/icons/material";

defineOptions({
	inheritAttrs: false,
});

// defineProps();
</script>
