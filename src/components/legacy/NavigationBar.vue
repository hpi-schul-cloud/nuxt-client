<template>
	<div class="header elevation-2">
		<div class="nav-container">
			<div class="logo-container">
				<a href="logoLink">
					<img class="logo logo-full" :src="img" alt="Schulcloud Logo" />
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
type Props = {
	img: string;
};

const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

.header {
	position: sticky;
	position: -webkit-sticky;
	top: 0;
	left: 0;
	z-index: var(--z-pinned);
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	width: 100%;
	line-height: var(--line-height-lg);
	text-align: center;
	background-color: rgba(var(--v-theme-white));
	-webkit-backdrop-filter: blur(5px);
	backdrop-filter: blur(5px);
}

.nav-container {
	@media (min-width: 750px) {
		margin: 0 calc(3.5 * 16px);
	}

	@media (min-width: 991px) {
		padding: 0 5px;
		margin: auto;
	}
}

.logo-container {
	@media (min-width: 750px) {
		height: 45px;

		> a > img {
			height: 40px;
		}
	}

	@media (min-width: 991px) {
		height: var(--topbar-height);

		> a > img {
			height: var(--topbar-height);
		}
	}
}

.icon {
	font-size: 16px;
}

@media (min-width: 576px) {
	.nav-container {
		width: 540px;
		max-width: 100%;
	}
}

@media (min-width: 768px) {
	.nav-container {
		display: block;
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
		display: flex;
		justify-content: space-between;
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

.nav-item {
	align-items: center;
	justify-content: center;
	padding: 8px 16px;
	font-family: var(--font-primary);
	font-size: var(--text-md);

	@media (min-width: 750px) {
		display: flex;
	}

	@media (min-width: 991px) {
		font-size: var(--text-md);
	}

	&:hover {
		background-color: map.get($grey, lighten-3);
		border-radius: 4px;
	}
}
</style>
