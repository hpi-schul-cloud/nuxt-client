<template>
	<div class="info-message" :class="type">
		<v-icon class="icon" :color="iconColor">{{ icon }}</v-icon>
		<div class="message">{{ message }}</div>
	</div>
</template>
<script>
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
				return "$mdiAlert";
			}
			return this.type.substring(3);
		},
		iconColor() {
			const typeStr = this.type.substring(3);
			return `var(--v-${typeStr}-base)`;
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
	color: var(--v-error-base);
}

.info-message.bc-success {
	color: var(--v-success-base);
}

.info-message.bc-warning {
	color: var(--v-warning-base);
}

.info-message.bc-info {
	color: var(--v-info-base);
}

.info-message .icon {
	flex: 0 0 20px;
	width: 20px;
	height: 20px;
	margin-right: var(--space-xs-2);
}
</style>
