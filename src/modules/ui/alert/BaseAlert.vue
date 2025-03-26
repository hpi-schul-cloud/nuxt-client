<template>
	<v-alert
		:color="color"
		:icon="icon"
		:closable="showCloseIcon"
		:close-icon="showCloseIcon ? closeIcon : null"
		class="mb-0"
	>
		<div class="alert-text" v-if="$slots.default">
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
		},
		icon: { type: String as PropType<IconProps["icon"]> },
		closeIcon: { type: String as PropType<IconProps["icon"]> },
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
