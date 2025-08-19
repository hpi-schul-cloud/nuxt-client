<template>
	<div class="info-message" :class="type">
		<v-icon class="icon" :color="iconColor">{{ icon }}</v-icon>
		<div class="message">{{ message }}</div>
	</div>
</template>

<script setup lang="ts">
import { mdiAlert } from "@icons/material";
import { computed } from "vue";

type Props = {
	message: string;
	type?: "bc-info" | "bc-success" | "bc-warning" | "bc-error";
};

const props = withDefaults(defineProps<Props>(), {
	type: "bc-info",
});

const icon = computed(() => {
	if (props.type === "bc-error") {
		return mdiAlert;
	}
	return props.type.substring(3);
});

const iconColor = computed(() => {
	const typeStr = props.type.substring(3);
	return `rgba(var(--v-theme-${typeStr}))`;
});
</script>

<style lang="scss" scoped>
.info-message {
	display: flex;
	align-items: top;
	font-size: var(--text-sm);
}

.info-message.bc-error {
	color: rgba(var(--v-theme-error));
}

.info-message.bc-success {
	color: rgba(var(--v-theme-success));
}

.info-message.bc-warning {
	color: rgba(var(--v-theme-warning));
}

.info-message.bc-info {
	color: rgba(var(--v-theme-info));
}

.info-message .icon {
	flex: 0 0 20px;
	width: 20px;
	height: 20px;
	margin-right: 6px;
}
</style>
