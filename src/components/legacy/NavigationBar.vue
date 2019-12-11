<template>
	<div class="nav-container">
		<div class="logo-container">
			<base-link href="https://schul-cloud.org/">
				<img
					class="logo logo-full"
					src="@assets/img/logo/logo-image-color.svg"
					alt="Schulcloud Logo"
				/>
			</base-link>
		</div>
		<div class="link-container">
			<base-link
				v-for="(route, idx) in links"
				:key="route.title"
				:class="activeLink === idx ? 'li active' : 'li'"
				:to="route.to"
				:href="route.href"
				:no-styles="true"
				@click="setActive(idx)"
			>
				{{ route.title }}
			</base-link>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		links: {
			type: Array,
			reqired: true,
			default: () => {},
		},
	},
	data: function() {
		return {
			activeLink: null,
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

.nav-container {
	position: sticky;
	position: -webkit-sticky;
	top: 0;
	left: 0;
	z-index: var(--layer-fab);
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	padding: 0;
	color: var(--color-black);
	text-align: center;
	background-color: var(--color-white-transparent);
	-webkit-backdrop-filter: blur(5px);
	backdrop-filter: blur(5px);
	box-shadow: var(--shadow-sm);

	@include breakpoint(desktop) {
		flex-direction: row;
		justify-content: space-between;
		padding: 0 var(--space-xl);
		text-align: left;
	}
}

.logo {
	width: 229px;
	height: 40px;

	@include breakpoint(tablet) {
		width: 280px;
		height: 50px;
	}
}

.link-container {
	display: flex;
	flex-wrap: wrap;
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
	.active {
		color: var(--color-white);
		background-color: var(--color-primary);
	}
}
</style>
