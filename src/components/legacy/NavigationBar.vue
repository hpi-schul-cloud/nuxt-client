<template>
	<div class="header elevation-2">
		<div class="nav-container">
			<div class="logo-container">
				<a :href="logoLink">
					<img class="logo logo-full" :src="img" alt="Schulcloud Logo" />
				</a>
			</div>
			<div v-if="linksToDisplay.length || hasButtons" class="link-container">
				<v-btn
					v-for="(route, idx) in linksToDisplay"
					:key="route.href"
					variant="text"
					class="nav-item font-weight-regular mx-0"
					:to="route.to"
					:href="route.href"
					:target="route.target"
				>
					{{ route.title }}
				</v-btn>
				<div v-if="hasButtons" class="buttons-container">
					<v-btn color="primary" variant="outlined" to="/loginRedirect" class="mx-2">
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
import { SchulcloudTheme } from "@api-server";
import { useEnvConfig } from "@data-env";
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
	hideButtons?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	logoLink: "/",
	links: () => [],
	hideButtons: false,
});


const isDefaultTheme = computed(() => useEnvConfig().value.SC_THEME === SchulcloudTheme.DEFAULT);

const hasButtons = computed(() => !props.hideButtons && isDefaultTheme.value);

const linksToDisplay = computed(() => (isDefaultTheme.value ? props.links : []));

</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

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

	@media (min-width: 750px) {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (min-width: 991px) {
		justify-content: right;
		padding-bottom: 0;
	}

	> a {
		padding: 9px;
		margin-right: 0;
		margin-bottom: 8px;

		@media (min-width: 750px) {
			margin-bottom: 0;
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
