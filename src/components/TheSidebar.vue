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
					<base-link class="list-content" :to="route.to" :href="route.href" :inactive="true">
						<base-icon v-if="route.icon"
							class="icon"
							:icon="route.icon"
							:source="route.source || 'fa'"
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
	 display: flex;
	flex-direction: column;
    width: 240px;
	background-color: var(--color-white);
	border-right: 1px solid rgba(0,0,0,.15);

	@include breakpoint(tablet) {
		background-color: green;
	}

	.contents {
		display: contents;
		display: flex;
        flex: 1;
        flex-direction: column;

		.list {
			flex: 1;
			width: 100%;
			padding: 0;
			margin: 0;
			list-style-type: none;

			:hover {
				cursor: pointer;
				background: var(--color-gray-light);
			}

			.list-item {
				display: flex;
				flex-direction: row;
				align-content: center;
				width: 100%;
				// @TODO: Variable ausdenken
				height: 60px;
				line-height: 60px;
				// border-bottom: 1px solid black;


				.list-content {
					padding: calc(var(--space-sm) * 0.5) var(--space-md);
					font-size: var(--text-md);
					border-bottom: none;

					.title {
						padding: calc(var(--space-sm) * 0.5) var(--space-md);
						text-transform: uppercase;
					}
				}

				// .list-content {
				// 	display: block;
				// 	padding: calc(var(--space-sm) * 0.5) var(--space-md);
				// 	font-size: var(--text-md);
				// 	text-decoration: none;
				// 	&.active {
				// 		color: var(--color-primary);
				// 	}
				// }
			}
		}
	}
}




</style>
