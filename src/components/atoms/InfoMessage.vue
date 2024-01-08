<template>
	<div class="info-message" :class="type">
		<v-icon class="icon" :color="iconColor">{{ icon }}</v-icon>
		<div class="message">{{ message }}</div>
	</div>
</template>
<script>
import { mdiAlert } from "@/components/icons/material";
export default {
	props: {
		message: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: false,
			default: "bc-info",
			validator: (type) =>
				["bc-info", "bc-success", "bc-warning", "bc-error"].includes(type),
		},
	},
	computed: {
		icon() {
			if (this.type === "bc-error") {
				return mdiAlert;
			}
			return this.type.substring(3);
		},
		iconColor() {
			const typeStr = this.type.substring(3);
			return `rgba(var(--v-theme-${typeStr}))`;
		},
	},
};
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
	margin-right: var(--space-xs-2);
}
</style>
