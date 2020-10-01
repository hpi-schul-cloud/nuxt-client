<template>
	<div class="error-message">
		<base-icon source="custom" icon="warning" class="error-icon"></base-icon>
		<div>{{ message }}</div>
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
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.error-message {
	display: flex;
	align-items: center;
	font-size: var(--text-xs);
	color: var(--color-danger);
}
.error-icon {
	width: 24px;
	height: 24px;
	margin-right: var(--space-xs-2);
}
</style>
