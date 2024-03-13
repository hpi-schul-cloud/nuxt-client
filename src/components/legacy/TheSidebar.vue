<template>
	<aside class="sidebar" :class="{ expanded: expandedMenu }">
		<div class="top-sidebar" @click="$emit('input')">
			<base-link to="/" href="/" :no-styles="true">
				<img
					class="logo logo-full"
					src="@/assets/img/logo/logo-image-mono.svg"
					alt="Schulcloud Logo"
				/>
				<img
					class="logo logo-small"
					src="@/assets/img/logo/logo-transparent-mono-48-48.svg"
					alt="Schulcloud Logo"
				/>
			</base-link>
		</div>
		<nav class="contents">
			<ul data-testid="routesListTest" class="list">
				<div
					v-for="route in routes"
					:key="JSON.stringify(getRouteLocation(route))"
				>
					<li
						class="list-item"
						:class="{
							active: isActive(route.title),
							'child-active': isChildActive(route.title),
						}"
						:data-testId="route.testId"
					>
						<base-link
							class="list-content"
							:to="!isExternalLink(route) ? route.to : undefined"
							:href="isExternalLink(route) ? route.href : undefined"
							:no-styles="true"
							:aria-label="$t(route.title)"
						>
							<v-icon
								v-if="route.icon"
								class="icon"
								:color="getIconColor(route)"
							>
								{{ route.icon }}
							</v-icon>
							<span class="side-bar-title">{{ $t(route.title) }}</span>
						</base-link>
					</li>
					<ul
						v-if="
							hasChildren(route) &&
							(isActive(route.title) || isChildActive(route.title))
						"
						class="px-0"
					>
						<li
							v-for="child in route.children"
							:key="JSON.stringify(getRouteLocation(child))"
							:class="{ active: isActive(child.title) }"
							class="list-item list-sub-item"
							:data-testId="child.testId"
						>
							<base-link
								class="list-content"
								:to="!isExternalLink(child) ? child.to : undefined"
								:href="isExternalLink(child) ? child.href : undefined"
								:no-styles="true"
								:aria-label="$t(child.title)"
							>
								<v-icon
									v-if="child.icon"
									class="icon"
									:color="
										isActive(child.title)
											? 'rgba(var(--v-theme-primary))'
											: 'rgba(var(--v-theme-secondary))'
									"
									>{{ child.icon }}
								</v-icon>
								<span class="side-bar-title">{{ $t(child.title) }}</span>
							</base-link>
						</li>
					</ul>
				</div>
			</ul>
		</nav>
	</aside>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, watch } from "vue";
import baseLink from "@/components/base/BaseLink.vue";
import {
	SidebarCategoryItem,
	SidebarItem,
	SidebarItemExternalLink,
	SidebarItemList,
	SidebarItemRouterLink,
} from "@/utils/sidebar-base-items";
import { useRoute } from "vue-router";

export default defineComponent({
	name: "TheSidebar",
	components: { baseLink },
	props: {
		routes: {
			type: Array as PropType<SidebarItemList>,
			default: () => [],
		},
		expandedMenu: {
			type: Boolean,
		},
	},
	setup(props) {
		const activeItem = ref("");
		const activeParent = ref("");

		const route = useRoute();

		const isItemActiveForRoute = (item: SidebarItem) =>
			item.activeForUrls.some((activeFor) =>
				new RegExp(activeFor).test(route.path)
			);

		const updateActiveItems = () => {
			props.routes.forEach((item: SidebarItem | SidebarCategoryItem) => {
				if (isItemActiveForRoute(item)) {
					activeItem.value = item.title;
					activeParent.value = "";
				}
				if ((item as SidebarCategoryItem).children) {
					(item as SidebarCategoryItem).children.forEach(
						(childItem: SidebarItem) => {
							if (isItemActiveForRoute(childItem)) {
								activeItem.value = childItem.title;
								activeParent.value = item.title;
							}
						}
					);
				}
			});
		};
		updateActiveItems();
		watch(route, updateActiveItems);

		const isActive = (title: string): boolean => {
			return title === activeItem.value;
		};

		const isChildActive = (title: string): boolean => {
			return title === activeParent.value;
		};

		const getIconColor = (route: SidebarItem | SidebarCategoryItem) => {
			return isActive(route.title) || isChildActive(route.title)
				? "rgba(var(--v-theme-primary))"
				: "rgba(var(--v-theme-secondary))";
		};

		const hasChildren = (
			route: SidebarItem | SidebarCategoryItem
		): route is SidebarCategoryItem => {
			return (route as SidebarItemExternalLink).href !== undefined;
		};

		const isExternalLink = (
			route: SidebarItemExternalLink | SidebarItemRouterLink
		): route is SidebarItemExternalLink => {
			return (route as SidebarItemExternalLink).href !== undefined;
		};

		const getRouteLocation = (
			route: SidebarItemExternalLink | SidebarItemRouterLink
		) => {
			if (isExternalLink(route)) {
				return route.href;
			}

			return route.to;
		};

		return {
			isActive,
			isChildActive,
			getIconColor,
			isExternalLink,
			getRouteLocation,
			hasChildren,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/settings";
@import "@/styles/mixins";

@keyframes menu-expand {
	from {
		transform: translateY(-100%);
	}

	to {
		transform: translateY(0);
	}
}

.sidebar {
	position: fixed;
	top: var(--topbar-height);
	right: 0;
	left: 0;
	z-index: var(--layer-dropdown);
	display: none;
	height: calc(100vh - 55px);
	overflow-y: auto;
	background-color: rgba(var(--v-theme-white));
	box-shadow: 0 5px 5px map-get($grey, lighten-3);
	transition: display 2s;

	&.expanded {
		display: flex;
		animation-name: menu-expand;
		animation-duration: var(--duration-transition-medium);
		animation-iteration-count: 1;
	}

	@include breakpoint(tablet) {
		position: fixed;
		top: 0;
		display: flex;
		flex-direction: column;
		width: var(--sidebar-width-tablet);
		height: 100vh;
		overflow: auto;
		border-right: 1px solid map-get($grey, lighten-3);
		border-bottom: none;
	}

	@include breakpoint(desktop) {
		width: var(--sidebar-width);
	}

	.top-sidebar {
		line-height: 0;
	}

	.logo {
		display: none;
		width: 100%;
		height: var(--sidebar-item-height);
	}

	.logo-full {
		@include breakpoint(desktop) {
			display: initial;
		}
	}

	.logo-small {
		display: none;

		@include breakpoint(tablet) {
			display: initial;
		}

		@include breakpoint(desktop) {
			display: none;
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

			.list-item {
				width: 100%;
				height: var(--sidebar-item-height);
				line-height: var(--sidebar-item-height);
				list-style: none;

				&.list-sub-item {
					height: var(--sidebar-sub-item-height);
					padding-left: var(--space-sm);
					line-height: var(--sidebar-sub-item-height);

					@include breakpoint(tablet) {
						height: var(--sidebar-item-height);
						padding-left: 0;
						line-height: var(--sidebar-item-height);
					}

					@include breakpoint(desktop) {
						height: var(--sidebar-sub-item-height);
						padding-left: var(--space-sm);
						line-height: var(--sidebar-sub-item-height);
					}
				}

				.list-content {
					display: flex;
					align-items: center;
					min-width: 80px;
					height: 100%;
					padding: 0 16px;
					font-size: 16px;
					line-height: 100%;
					color: rgba(var(--v-theme-secondary));
					border-bottom: none;

					.icon {
						text-align: center;
					}

					.icon svg {
						font-size: 20px;
					}

					.side-bar-title {
						text-transform: uppercase;

						@include breakpoint(tablet) {
							display: none;
						}

						@include breakpoint(desktop) {
							display: initial;
							margin-top: 2px;
						}
					}

					svg {
						margin-top: 2px;
					}
				}

				&:hover,
				&.active {
					color: rgba(var(--v-theme-primary));
					cursor: pointer;
					background-color: map-get($grey, lighten-3);
				}

				&.active .list-content,
				&.child-active .list-content {
					color: rgba(var(--v-theme-primary));
				}
			}
		}
	}
}
</style>
<style lang="scss">
.sidebar .contents .list .list-item .list-content .icon {
	width: 24px;
	height: 24px;
	margin-right: 8px;
	vertical-align: middle;
	fill: currentColor;

	.v-icon {
		width: 24px;
		height: 24px;
	}
}
</style>
