<template>
	<aside class="sidebar">
		<nav class="contents">
			<ul class="list">
				<li
					v-for="route in routes"
					:key="JSON.stringify(route.to) || route.href"
					:class="{ active: route.active }"
					class="list-item"
				>
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
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.sidebar {
	display: flex;
	flex-direction: column;
	width: var(--sidebar-width);
	background-color: var(--color-white);
	border-right: 1px solid var(--color-gray-light);

	@include breakpoint(tablet) {
		width: var(--sidebar-width-tablet);
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

						@include breakpoint(tablet) {
							display: none;
						}
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
