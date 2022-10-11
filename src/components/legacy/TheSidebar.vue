<template>
	<aside class="sidebar" :class="{ expanded: expandedMenu }">
		<div class="top-sidebar" @click="$emit('input')">
			<base-link to="/" href="/" :no-styles="true">
				<img
					class="logo logo-full"
					src="@assets/img/logo/logo-image-mono.svg"
					alt="Schulcloud Logo"
				/>
				<img
					class="logo logo-small"
					src="@assets/img/logo/logo-transparent-mono-48-48.svg"
					alt="Schulcloud Logo"
				/>
			</base-link>
		</div>
		<nav class="contents">
			<ul data-testid="routesListTest" class="list">
				<div
					v-for="route in routes"
					:key="JSON.stringify(route.to) || route.href"
				>
					<li
						class="list-item"
						:class="{ active: route.active, 'child-active': route.childActive }"
						:data-testId="route.testId"
					>
						<base-link
							class="list-content"
							:to="route.to"
							:href="route.href"
							:no-styles="true"
						>
							<base-icon
								v-if="route.icon"
								:icon="route.icon"
								:source="route.source || 'fa'"
								:fill="
									route.active || route.childActive
										? 'var(--v-primary-base)'
										: 'var(--v-secondary-base)'
								"
								class="icon"
							/>
							<span class="side-bar-title">{{ $t(route.title) }}</span>
						</base-link>
					</li>
					<ul v-if="route.active || route.childActive">
						<li
							v-for="child in route.children"
							:key="JSON.stringify(child.to) || child.href"
							:class="{ active: child.active }"
							class="list-item list-sub-item"
							:data-testId="child.testId"
						>
							<base-link
								class="list-content"
								:to="child.to"
								:href="child.href"
								:no-styles="true"
							>
								<base-icon
									v-if="child.icon"
									:icon="child.icon"
									:source="child.source || 'fa'"
									:fill="
										child.active
											? 'var(--v-primary-base)'
											: 'var(--v-secondary-base)'
									"
									class="icon"
								/>
								<span class="side-bar-title">{{ $t(child.title) }}</span>
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
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
/* stylelint-disable sh-waqar/declaration-use-variable */

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
	position: fixed;
	top: var(--topbar-height);
	right: 0;
	left: 0;
	z-index: var(--layer-dropdown);
	display: none;
	height: calc(100vh - 55px);
	overflow-y: auto;
	background-color: var(--v-white-base);
	box-shadow: 0 5px 5px var(--v-grey-lighten1);
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
		border-right: 1px solid var(--v-grey-lighten1);
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
			list-style-type: none;

			.list-item {
				width: 100%;
				height: var(--sidebar-item-height);
				line-height: var(--sidebar-item-height);

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
					padding: 0 20px;
					font-size: 16px;
					line-height: 100%;
					color: var(--v-secondary-base);
					border-bottom: none;

					.icon {
						width: 25px;
						margin-right: 6px;
						font-size: 20px;
						text-align: center;
					}

					.side-bar-title {
						text-transform: uppercase;

						@include breakpoint(tablet) {
							display: none;
						}

						@include breakpoint(desktop) {
							display: initial;
							margin-top: 4px;
						}
					}

					svg {
						margin-top: 2px;
					}
				}

				&:hover,
				&.active {
					color: var(--v-primary-base);
					cursor: pointer;
					background-color: var(--v-grey-lighten1);
				}

				&.active .list-content,
				&.child-active .list-content {
					color: var(--v-primary-base);
				}
			}
		}
	}
}
</style>
