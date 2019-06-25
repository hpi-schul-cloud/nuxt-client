<template>
	<div class="topbar">
		<div class="top-sidebar">
			<img class="logo" :src="$theme.logo.transparent" alt="Website Logo" />
			<h1 class="page-title">Schul-Cloud</h1>
		</div>

		<!-- ACTIONS -->
		<div class="top-main">
			<template v-for="action in actions">
				<base-icon-button v-if="action.icon" :key="action.title" source="fa" :icon="action.icon"/>

				<div v-else :key="action.title">{{ action.title }}</div>

				<base-button
					v-if="action.event === 'logout'"
					:key="action.title"
					v-ripple
					class="action"
					@click="sendEvent(action.event)"
					>{{ action.title }}</base-button
				>

			</template>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		// title: {
		// 	type: String,
		// 	default: "HPI Schul-Cloud",
		// },
		actions: {
			type: Array,
			default: () => [],
			validator: function(value) {
				return value.every((action) => {
					return (
						(action.icon || action.title) &&
						(action.event || action.to || action.href)
					);
				});
			},
		},
	},
	methods: {
		sendEvent(eventName) {
			this.$emit("action", eventName);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.topbar {
	display: flex;
	align-items: center;
	// background: green;
	// padding: var(--space-sm) var(--space-md);
	// box-shadow: var(--shadow-sm);

	.top-sidebar {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 240px;
		height: 100%;
		padding: var(--space-sm) var(--space-md);
		background-color: var(--color-primary);

		.logo {
			height: var(--heading-3);
			margin-right: var(--space-sm);

		}
		.page-title {
			flex: 1;
			margin: 0;
			font-family: var(--font-accent);
			font-size: var(--heading-4);
			color: var(--color-white);
			text-transform: capitalize;
		}
	}

	.top-main {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		align-items: center;
		justify-content: flex-end;

	}
}
.action {
	padding: var(--space-sm) var(--space-md);
}
</style>
