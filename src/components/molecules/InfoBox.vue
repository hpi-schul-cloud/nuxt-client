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
				<base-button design="info" @click.self="close">Schließen</base-button>
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
	position: relative;
	max-width: 460px;
	color: var(--color-white);
	background-color: var(--color-info);
	border-radius: var(--radius-lg);

	h4 {
		color: var(--color-white);
	}
}
.content {
	padding: var(--space-md);
}
.actions {
	text-align: right;

	> label {
		margin-bottom: var(--space-md);
	}
}
</style>
