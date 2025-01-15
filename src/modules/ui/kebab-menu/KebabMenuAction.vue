<template>
	<VListItem data-testid="board-menu-action" role="menuitem">
		<template v-slot:prepend>
			<slot name="icon" data-testid="kebab-menu-action-icon">
				<v-icon :icon="icon" data-testid="kebab-menu-action-icon" />
			</slot>
		</template>
		<VListItemTitle :data-testid="dataTestId">
			<slot />
		</VListItemTitle>
	</VListItem>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IconProps } from "vuetify";

defineProps({
	icon: { type: String as PropType<IconProps["icon"]> },
	dataTestId: { type: String as PropType<string | null>, default: null },
});
</script>
