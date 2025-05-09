<template>
	<v-alert
		:color="color"
		:icon="icon"
		:closable="showCloseIcon"
		:close-icon="showCloseIcon ? closeIcon : undefined"
		class="mb-0"
	>
		<div v-if="$slots.default" class="alert-text">
			<slot />
		</div>
	</v-alert>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IconProps } from "vuetify/lib/framework.mjs";

export default defineComponent({
	name: "BaseAlert",
	props: {
		color: {
			type: String as PropType<"success" | "error" | "warning" | "info">,
			default: undefined,
		},
		icon: { type: String as PropType<IconProps["icon"]>, default: undefined },
		closeIcon: {
			type: String as PropType<IconProps["icon"]>,
			default: undefined,
		},
		showCloseIcon: {
			type: Boolean,
			default: false,
		},
	},
});
</script>
<style scoped lang="scss">
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
}
</style>
