<template>
	<div class="header elevation-2">
		<div class="nav-container">
			<div class="logo-container">
				<base-link :href="logoLink">
					<img class="logo logo-full" :src="img" alt="Schulcloud Logo" />
				</base-link>
			</div>
			<div v-if="linksToDisplay.length || hasButtons" class="link-container">
				<v-btn
					v-for="(route, idx) in linksToDisplay"
					:key="route.href"
					variant="text"
					class="font-weight-regular mx-0"
					:class="{ li: true, active: activeLink === route.href }"
					:to="route.to"
					:href="route.href"
					:target="route.target"
					@click="setActive(idx)"
				>
					{{ route.title }}
				</v-btn>
				<div v-if="hasButtons" class="buttons-container">
					<v-btn
						color="primary"
						variant="outlined"
						to="/loginRedirect"
						class="mx-2"
					>
						<v-icon size="20" class="mr-1">{{ mdiLogin }}</v-icon>
						{{ $t("common.labels.login") }}
					</v-btn>
					<v-btn color="primary" variant="flat" to="/community">
						{{ $t("common.labels.register") }}
					</v-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { SchulcloudTheme } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import { mdiLogin } from "@icons/material";
import { computed, ref } from "vue";

type Props = {
	logoLink?: string;
	img: string;
	links?: Array<{
		title: string;
		href: string;
		to?: string;
		target?: string;
	}>;
};

const props = withDefaults(defineProps<Props>(), {
	logoLink: "/",
	links: () => [],
});

const activeLink = ref(window.location.pathname);

const hasButtons = computed(() => {
	return envConfigModule.getEnv.SC_THEME === SchulcloudTheme.Default;
});

const linksToDisplay = computed(() => {
	return envConfigModule.getEnv.SC_THEME === SchulcloudTheme.Default
		? props.links
		: [];
});

const setActive = (idx: number) => {
	activeLink.value = props.links[idx].href;
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;
@use "@/styles/mixins" as *;

.header {
	position: sticky;
	position: -webkit-sticky;
	top: 0;
	left: 0;
	z-index: 100;
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
	@include breakpoint(tablet) {
		margin: 0 calc(3.5 * 16px);
	}

	@include breakpoint(desktop) {
		padding: 0 calc(5 * var(--border-width));
		margin: auto;
	}
}

.logo-container {
	@include breakpoint(tablet) {
		height: calc(45 * var(--border-width));

		> a > img {
			height: 40px;
		}
	}

	@include breakpoint(desktop) {
		height: var(--legacy-topbar-height);

		> a > img {
			height: var(--legacy-topbar-height);
		}
	}
}

.link-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding-bottom: 8px;

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
		padding: calc(9 * var(--border-width));
		margin-right: 0;
		margin-bottom: 8px;

		@include breakpoint(tablet) {
			margin-bottom: 0;
		}
	}
}

.icon {
	font-size: var(--radius-lg);
}

@media (min-width: 576px) {
	.nav-container {
		width: 540px;
		max-width: 100%;
	}

	.link-container > a,
	.buttons-container > button {
		margin-right: 8px;
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

.li {
	align-items: center;
	justify-content: center;
	padding: 8px 16px;
	font-family: var(--font-primary);
	font-size: var(--text-md);

	@include breakpoint(tablet) {
		display: flex;
	}

	@include breakpoint(desktop) {
		font-size: var(--text-md);
	}

	&:hover {
		background-color: map.get($grey, lighten-3);
		border-radius: var(--radius-sm);
	}
}

a.active {
	font-weight: var(--font-weight-bold);
	color: rgba(var(--v-theme-white));
	background-color: rgba(var(--v-theme-accent));
	border-radius: var(--radius-sm);

	&:hover {
		color: rgba(var(--v-theme-white));
		background-color: rgba(var(--v-theme-accent));
		border-radius: var(--radius-sm);
	}
}
</style>
