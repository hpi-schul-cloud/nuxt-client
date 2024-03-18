<template>
	<VListItem data-testid="board-menu-action" role="menuitem">
		<template v-slot:prepend>
			<slot name="icon" data-testid="board-menu-action-icon">
				<v-icon :icon="icon" data-testid="board-menu-action-icon" />
			</slot>
		</template>
		<VListItemTitle :data-testid="dataTestId">
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
		dataTestId: { type: String as PropType<string | null>, default: null },
	},
});
</script>
