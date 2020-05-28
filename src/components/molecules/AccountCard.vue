<template>
	<div class="card">
		<div class="icon">
			<slot name="icon"></slot>
		</div>
		<div class="user-content">
			<slot name="card-heading">
				<p class="heading">{{ heading }}</p>
			</slot>
			<slot v-if="data" name="data">
				<p>{{ data }}</p>
			</slot>
			<p v-else>••••••••••</p>
			<slot name="notification" />
			<base-button design="outline">
				<base-icon source="material" icon="create" />
				<slot />
			</base-button>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		heading: {
			type: String,
			default: "",
		},
		data: {
			type: String,
			default: "",
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.card {
	display: flex;
	flex-direction: row;
	margin-bottom: var(--space-xl);

	.icon {
		margin-right: var(--space-xs);
	}

	.user-content {
		display: flex;
		flex-direction: column;

		.heading {
			margin: 0;
			font-weight: var(--font-weight-bold);
		}
	}
}
</style>
