<template>
	<div v-if="active" class="wrapper">
		<div class="content">
			<h4>
				<slot name="header" />
			</h4>
			<p class="body">
				<slot name="body" />
			</p>
			<div class="actions">
				<slot name="actions" />
				<base-button design="info" @click.self="close">{{
					$t("common.labels.close")
				}}</base-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		active: {
			type: Boolean,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	methods: {
		close() {
			this.$emit("update:active", false);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.wrapper {
	color: var(--color-white);
	background-color: var(--color-info);
	border-radius: var(--radius-lg);

	h4 {
		color: var(--color-white);
		text-align: center;
	}
}

.content {
	padding: var(--space-md);
	text-align: left;
}

.actions {
	text-align: right;

	> label {
		margin-bottom: var(--space-md);
	}
}
</style>
