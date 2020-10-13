<template>
	<div class="info-message" :class="type">
		<base-icon source="custom" :icon="icon" class="icon"></base-icon>
		<div lcass="message">{{ message }}</div>
	</div>
</template>
<script>
import BaseIcon from "@components/base/BaseIcon";
export default {
	components: { BaseIcon },
	props: {
		message: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: false,
			default: "info",
			validator: (type) =>
				["info", "success", "warning", "error"].includes(type),
		},
	},
	computed: {
		icon() {
			if (this.type === "error") {
				return "warning";
			}
			return this.type;
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.info-message {
	display: flex;
	align-items: top;
	font-size: var(--text-sm);
}
.info-message.error {
	color: var(--color-danger);
}
.info-message.success {
	color: var(--color-success);
}
.info-message.warning {
	color: var(--color-warning);
}
.info-message.info {
	color: var(--color-info);
}
.info-message .icon {
	flex: 0 0 20px;
	width: 20px;
	height: 20px;
	margin-right: var(--space-xs-2);
}
</style>
