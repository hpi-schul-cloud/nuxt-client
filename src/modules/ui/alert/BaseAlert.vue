<template>
	<v-alert
		:color="color"
		:icon="icon"
		:closable="showCloseIcon"
		:close-icon="showCloseIcon ? closeIcon : undefined"
		class="mb-0"
	>
		<template v-if="alertTitle" #title>
			<span class="alert-text">{{ t(alertTitle) }}</span>
		</template>

		<div v-if="$slots.default" class="alert-text">
			<slot />
		</div>
	</v-alert>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { IconProps } from "vuetify";

interface Props {
	color?: "success" | "error" | "warning" | "info";
	icon?: IconProps["icon"];
	closeIcon?: IconProps["icon"];
	showCloseIcon?: boolean;
	alertTitle?: string;
}

const {
	color = undefined,
	icon = undefined,
	closeIcon = undefined,
	showCloseIcon = false,
	alertTitle = undefined,
} = defineProps<Props>();

const { t } = useI18n();
</script>

<style scoped lang="scss">
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
}
</style>
