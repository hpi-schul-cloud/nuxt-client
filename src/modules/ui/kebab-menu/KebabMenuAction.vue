<template>
	<VListItem
		data-testid="kebab-menu-action"
		role="menuitem"
		:aria-label="ariaLabel"
	>
		<template v-slot:prepend>
			<VIcon :icon="icon" data-testid="kebab-menu-action-icon" />
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
	ariaLabel: { type: String as PropType<string | null>, default: null },
});
</script>
