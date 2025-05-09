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
				<v-btn variant="text" @click.self="close">
					{{ $t("common.labels.close") }}
				</v-btn>
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
	emits: ["update:active"],
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
.wrapper {
	color: rgba(var(--v-theme-white));
	background-color: rgba(var(--v-theme-info));
	border-radius: var(--radius-lg);

	h4 {
		color: rgba(var(--v-theme-white));
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
