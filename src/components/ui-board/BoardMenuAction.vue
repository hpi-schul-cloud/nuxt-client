<template>
	<VListItem data-testid="board-menu-action" @click.prevent="onClick">
		<VListItemIcon class="mr-2" data-testid="board-menu-action-icon">
			<VIcon>{{ icon }}</VIcon>
		</VListItemIcon>
		<VListItemTitle data-testid="board-menu-action-title">
			<slot />
		</VListItemTitle>
	</VListItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { VuetifyIcon } from "vuetify/types/services/icons";

export default defineComponent({
	name: "BoardMenuAction",
	props: {
		icon: { type: String as PropType<VuetifyIcon> },
	},
	setup(props, { emit }) {
		const onClick = ($event: Event) => emit("click", $event);

		return {
			onClick,
		};
	},
});
</script>
