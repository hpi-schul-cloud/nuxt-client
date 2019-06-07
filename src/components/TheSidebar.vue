<template>
	<aside class="sidebar">
		<nav class="contents">
			<ul class="list">
				<li
					v-for="route in routes"
					:key="JSON.stringify(route.to) || route.href"
					:class="{ 'list-item': true, active: route.active }"
				>
					<base-link :href="route.href" class="list-content" :to="route.to">
						<base-icon
							v-if="route.icon"
							:icon="route.icon"
							:source="route.source || 'material'"
						/>
						{{ route.title }}
					</base-link>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
export default {
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
	display: block;
	padding: calc(var(--space-sm) * 0.5) var(--space-md);
	font-size: var(--text-md);
	text-decoration: none;
	&.active {
		color: var(--color-primary);
	}
}
</style>
