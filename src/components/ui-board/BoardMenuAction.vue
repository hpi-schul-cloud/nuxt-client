<template>
	<VListItem data-testid="board-menu-action" role="menuitem">
		<template v-slot:prepend>
			<slot name="icon" data-testid="board-menu-action-icon">
				<v-icon :icon="icon" />
			</slot>
		</template>
		<VListItemTitle data-testid="board-menu-action-title">
			<slot />
		</VListItemTitle>
	</VListItem>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { IconProps } from "vuetify";

export default defineComponent({
	name: "BoardMenuAction",
	props: {
		icon: { type: String as PropType<IconProps["icon"]> },
	},
});
</script>
