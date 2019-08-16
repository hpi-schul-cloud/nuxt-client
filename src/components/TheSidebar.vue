<template>
	<aside class="sidebar" :class="{ expanded: expandedMenu }">
		<nav class="contents">
			<ul class="list">
				<li
					v-for="route in routes"
					:key="JSON.stringify(route.to) || route.href"
					:class="{ active: route.active }"
					class="list-item"
				>
					<base-link class="list-content" :to="route.to" :href="route.href" :inactive="true">
						<base-icon
							v-if="route.icon"
							:icon="route.icon"
							:source="route.source || 'fa'"
							:fill="route.active ? 'var(--color-primary)' : ''"
						/>
						<span class="title">{{ route.title }}</span>
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
					(route) => route.title && route.icon && (route.to || route.href)
				);
			},
		},
		expandedMenu: {
			type: Boolean,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

@keyframes menu-expand {
	from {
		transform: translateY(-100%);
	}

	to {
		transform: translateY(0);
	}
}

.sidebar {
	z-index: var(--layer-dropdown);
	display: flex;
	flex-direction: column;
	background-color: var(--color-white);
	border-right: 1px solid var(--color-gray-light);

	@include breakpoint(tablet) {
		position: absolute;
		top: var(--topbar-height);
		right: 0;
		left: 0;
		display: none;
		min-height: calc(100vh - 55px);

		&.expanded {
			display: flex;
			animation-name: menu-expand;
			animation-duration: var(--duration-transition-medium);
			animation-iteration-count: 1;
		}
	}

	.contents {
		display: flex;
		flex: 1;
		flex-direction: column;

		.list {
			flex: 1;
			width: 100%;
			padding: 0;
			margin: 0;
			list-style-type: none;

			:hover,
			.active {
				cursor: pointer;
				background: var(--color-gray-light);
			}

			.list-item {
				width: 100%;
				height: var(--sidebar-item-height);
				line-height: var(--sidebar-item-height);

				--sidebar-item-padding: 20px;
				--sidebar-font-size: 14px;

				.list-content {
					display: flex;
					padding: 0 var(--sidebar-item-padding);
					font-size: var(--sidebar-font-size);
					color: var(--color-tertiary-dark);
					border-bottom: none;

					.title {
						padding: 0 var(--sidebar-item-padding);
						text-transform: uppercase;
					}
				}
			}
			.active .list-content {
				color: var(--color-primary);
			}
		}
	}
}
</style>
