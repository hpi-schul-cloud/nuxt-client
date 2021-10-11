<template>
	<div class="info-message" :class="type">
		<base-icon source="custom" :icon="icon" class="icon"></base-icon>
		<div class="message">{{ message }}</div>
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
			default: "bc-info",
			validator: (type) =>
				["bc-info", "bc-success", "bc-warning", "bc-error"].includes(type),
		},
	},
	computed: {
		icon() {
			if (this.type === "bc-error") {
				return "warning";
			}
			return this.type.substring(3);
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
.info-message.bc-error {
	color: var(--color-danger);
}
.info-message.bc-success {
	color: var(--color-success);
}
.info-message.bc-warning {
	color: var(--color-warning);
}
.info-message.bc-info {
	color: var(--color-info);
}
.info-message .icon {
	flex: 0 0 20px;
	width: 20px;
	height: 20px;
	margin-right: var(--space-xs-2);
}
</style>
