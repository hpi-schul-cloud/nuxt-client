<template>
	<aside class="sidebar">
		<nav class="contents">
			<ul class="list">
				<li
					v-for="route in routes"
					:key="JSON.stringify(route.to) || route.href"
					:class="{ 'list-item': true, active: route.active }"
				>
					<BaseLink class="list-content" :to="route.to" :href="route.href">
						<BaseIcon v-if="route.icon" :icon="route.icon" />
						{{ route.title }}
					</BaseLink>
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
@import "@variables";

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
.list-content {
	@extend %font-content;

	display: block;
	padding: $size-padding-y * 0.5 $size-padding-x;
	text-decoration: none;
	&.active {
		color: $color-text-link;
	}
}
</style>
