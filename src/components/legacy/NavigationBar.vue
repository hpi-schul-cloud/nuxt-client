<template>
	<div class="header">
		<div class="nav-container">
			<div class="logo-container">
				<base-link href="https://schul-cloud.org/">
					<img class="logo logo-full" :src="img" alt="Schulcloud Logo" />
				</base-link>
			</div>
			<div class="link-container">
				<base-link
						v-for="(route, idx) in links"
						:key="route.href"
						:class="{ li: true, active: activeLink === route.href }"
						:to="route.to"
						:href="route.href"
						:no-styles="true"
						@click="setActive(idx)"
				>
					{{ route.title }}
				</base-link>
				<slot name="actions"></slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			img: {
				type: String,
				required: true,
			},
			links: {
				type: Array,
				reqired: true,
				default: () => {},
			},
		},
		data() {
			return {
				activeLink: window.location.pathname,
			};
		},

		methods: {
			setActive(idx) {
				this.activeLink = idx;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@styles";

	.header {
		position: sticky;
		position: -webkit-sticky;
		top: 0;
		left: 0;
		z-index: var(--layer-fab);
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		width: 100%;
		color: var(--color-black);
		text-align: center;
		background-color: var(--color-overlay-light);
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		box-shadow: var(--shadow-sm);
	}

	.nav-container {
		padding-right: calc(15 * var(--border-width));
		padding-left: calc(15 * var(--border-width));
		margin: auto;
	}

	.link-container {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		padding-bottom: var(--space-xs);

		@include breakpoint(tablet) {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		@include breakpoint(desktop) {
			justify-content: right;
			padding-bottom: 0;
		}
		> a {
			margin-right: 0;
			margin-bottom: var(--space-xs);

			@include breakpoint(tablet) {
				margin-bottom: 0;
			}
		}
	}

	.logo-container,
	.logo {
		width: 229px;
		height: 40px;
	}

	@media (min-width: 576px) {
		.nav-container {
			width: 540px;
			max-width: 100%;
		}
		.link-container > a {
			margin-right: var(--space-sm) !important;
		}
	}

	@media (min-width: 768px) {
		.nav-container {
			display: flex;
			justify-content: space-between;
			width: 720px;
			max-width: 100%;
		}

	}

	@media (max-width: 992px) {
		.logo-container {
			margin: auto;
		}
	}

	@media (min-width: 992px) {
		.nav-container {
			width: 960px;
			max-width: 100%;
		}
	}

	@media (min-width: 1200px) {
		.nav-container {
			width: 1140px;
			max-width: 100%;
		}
	}

	.li {
		align-items: center;
		justify-content: center;
		padding: var(--space-xs) var(--space-md);
		font-family: var(--font-primary);
		font-size: var(--text-md);
		color: var(--color-black);

		@include breakpoint(tablet) {
			display: flex;
		}

		@include breakpoint(desktop) {
			font-size: var(--text-md);
		}

		&:hover {
			background-color: var(--color-gray-light);
			border-radius: var(--radius-sm);
		}
	}

	a.active {
		color: var(--color-white);
		background-color: var(--color-primary);
		border-radius: var(--radius-sm);

		&:hover {
			color: var(--color-white);
			background-color: var(--color-primary);
			border-radius: var(--radius-sm);
		}
	}
</style>
