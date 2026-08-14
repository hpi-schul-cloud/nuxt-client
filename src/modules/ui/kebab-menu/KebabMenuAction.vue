<template>
	<VListItem data-testid="kebab-menu-action" role="menuitem" :aria-label="ariaLabel" :disabled="disabled">
		<template #prepend>
			<VProgressCircular v-if="loading" color="currentColor" indeterminate :size="16" :width="2" />
			<VIcon v-else :icon="icon" data-testid="kebab-menu-action-icon" />
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
	icon: { type: String as PropType<IconProps["icon"]>, default: undefined },
	dataTestId: { type: String as PropType<string | null>, default: null },
	ariaLabel: { type: String as PropType<string | null>, default: null },
	disabled: { type: Boolean as PropType<boolean>, default: false },
	loading: { type: Boolean as PropType<boolean>, default: false },
});
</script>
