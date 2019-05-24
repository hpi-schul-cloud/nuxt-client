<template>
	<div class="topbar">
		<img class="logo" :src="$theme.logo.app" alt="Website Logo" />
		<h1 class="page-title">{{ title }}</h1>

		<!-- ACTIONS -->
		<template v-for="action in actions">
			<base-link
				v-if="action.to || action.href"
				:key="action.to + action.icon"
				v-ripple
				tag="button"
				:to="action.to"
				:href="action.href"
				class="action"
				>{{ action.title }}</base-link
			>

			<base-button
				v-if="action.event"
				:key="action.event + action.icon"
				v-ripple
				class="action"
				@click="sendEvent(action.event)"
				>{{ action.title }}</base-button
			>
		</template>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: "HPI Schul-Cloud",
		},
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
	padding: var(--space-sm) var(--space-md);
	box-shadow: var(--shadow-sm);
}
.logo {
	height: var(--heading-3);
	margin-right: var(--space-sm);
}
.page-title {
	flex: 1;
	margin: 0;
	font-family: var(--font-accent);
	font-size: var(--heading-4);
	text-transform: capitalize;
}
.action {
	padding: var(--space-sm) var(--space-md);
}
</style>
