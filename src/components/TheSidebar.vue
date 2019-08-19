<template>
	<aside class="sidebar" :class="{ expanded: expandedMenu }">
		<nav class="contents">
			<ul class="list">
				<div
					v-for="route in routes"
					:key="JSON.stringify(route.to) || route.href"
				>
					<li class="list-item" :class="{ active: route.active }">
						<base-link
							class="list-content"
							:to="route.to"
							:href="route.href"
							:inactive="true"
						>
							<base-icon
								v-if="route.icon"
								:icon="route.icon"
								:source="route.source || 'fa'"
								:fill="route.active ? 'var(--color-primary)' : ''"
							/>
							<span class="title">{{ route.title }}</span>
						</base-link>
					</li>
					<ul v-if="route.active || route.childActive">
						<li
							v-for="child in route.children"
							:key="JSON.stringify(child.to) || child.href"
							:class="{ active: $route.path.includes(child.href) }"
							class="list-item list-sub-item">
							<base-link
								class="list-content"
								:to="child.to"
								:href="child.href"
								:inactive="true"
							>
								<base-icon
									v-if="child.icon"
									:icon="child.icon"
									:source="child.source || 'fa'"
									:fill="$route.path.includes(child.href) ? 'var(--color-primary)' : ''"
								/>
								<span class="title">{{ child.title }}</span>
							</base-link>
						</li>
					</ul>
				</div>
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

			.list-item {
				width: 100%;
				height: var(--sidebar-item-height);
				line-height: var(--sidebar-item-height);

				&.list-sub-item {
					height: var(--sidebar-sub-item-height);
					padding-left: var(--space-sm);
					line-height: var(--sidebar-sub-item-height);
				}

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

				&:hover,
				&.active {
					cursor: pointer;
					background-color: var(--color-gray-light);
				}

				&.active .list-content {
					color: var(--color-primary);
				}
			}
		}
	}
}
</style>
