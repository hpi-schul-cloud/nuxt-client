<template>
	<aside class="sidebar">
		<nav class="contents">
			<ul class="list">
				<li
					v-for="route in routes"
					:key="JSON.stringify(route.to) || route.href"
					:class="{ 'list-item': true, active: route.active }"
				>
					<base-link class="list-content" :to="route.to" :href="route.href">
						<base-icon v-if="route.icon" :icon="route.icon" />
						{{ route.title }}
					</base-link>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
export default {
	name: "TheSidebar",
	props: {
		routes: {
			type: Array,
			default: () => [],
			validator: (value) => {
				return value.every(
					(route) => route.title /* && route.icon */ && (route.to || route.href)
				);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.sidebar {
	width: 100%;
	max-width: 300px;
	&.small {
		max-width: 56px;
	}
	&.full {
		min-width: 100%;
		max-width: 100%;
	}
}
.contents {
	display: contents;
}
.list,
.list-item {
	padding: 0;
	margin: 0;
}
.link.list-content {
	font-size: var(--text-md);
	display: block;
	padding: calc(var(--space-sm) * 0.5) var(--space-md);
	text-decoration: none;
	&.active {
		color: var(--color-link);
	}
}
</style>
