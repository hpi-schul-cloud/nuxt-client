<template>
	<aside class="sidebar" :class="{ expanded: expandedMenu }">
		<div class="top-sidebar" @click="$emit('input')">
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
		</div>
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
								:fill="route.active ? 'var(--color-secondary)' : ''"
								class="icon"
							/>
							<span class="title">{{ route.title }}</span>
						</base-link>
					</li>
					<ul v-if="route.active || route.childActive">
						<li
							v-for="child in route.children"
							:key="JSON.stringify(child.to) || child.href"
							:class="{ active: $route.path.includes(child.href) }"
							class="list-item list-sub-item"
						>
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
									:fill="
										$route.path.includes(child.href)
											? 'var(--color-secondary)'
											: ''
									"
									class="icon"
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
	background-color: var(--color-white);
	box-shadow: 0 5px 5px var(--color-gray-light);
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
		border-right: 1px solid var(--color-gray-light);
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
		background-color: var(--color-secondary);
	}

	.logo-full {
		@include breakpoint(desktop) {
			display: initial;
			padding: 10px 5px;
		}
	}

	.logo-small {
		display: none;

		@include breakpoint(tablet) {
			display: initial;
			padding: 6px;
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

				--sidebar-item-padding: 20px;
				--sidebar-font-size: 16px;

				.list-content {
					display: flex;
					align-items: center;
					height: 100%;
					padding: 0 var(--sidebar-item-padding) 5px;
					font-size: var(--sidebar-font-size);
					line-height: 100%;
					color: var(--color-tertiary-dark);
					border-bottom: none;

					.icon {
						width: 25px;
						font-size: 20px;
					}

					.title {
						padding: 0 var(--sidebar-item-padding);
						text-transform: uppercase;

						@include breakpoint(tablet) {
							display: none;
						}

						@include breakpoint(desktop) {
							display: initial;
						}
					}
				}

				&:hover,
				&.active {
					cursor: pointer;
					background-color: var(--color-gray-light);
				}

				&.active .list-content {
					color: var(--color-secondary);
				}
			}
		}
	}
}
</style>
