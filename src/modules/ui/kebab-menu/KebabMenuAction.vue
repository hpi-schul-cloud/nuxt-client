<template>
	<VListItem
		data-testid="kebab-menu-action"
		role="menuitem"
		:aria-label="ariaLabel"
		:disabled="disabled"
		@click="onClick"
	>
		<template #prepend>
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

const props = defineProps({
	icon: { type: String as PropType<IconProps["icon"]>, default: undefined },
	dataTestId: { type: String as PropType<string | null>, default: null },
	ariaLabel: { type: String as PropType<string | null>, default: null },
	disabled: { type: Boolean as PropType<boolean>, default: false },
});

const emit = defineEmits(["click"]);

const onClick = () => {
	if (props.disabled) {
		return;
	}

	emit("click");
};
</script>
