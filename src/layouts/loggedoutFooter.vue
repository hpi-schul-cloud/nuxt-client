<template>
	<div class="page">
		<navigation-bar
			:img="require('@assets/img/logo/logo-image-mono.svg')"
			class="topbar"
		/>
		<div :class="isMobile ? 'small-wrapper' : 'wrapper'">
			<Nuxt />
		</div>
		<the-footer v-if="!fullscreenMode" class="footer" />
	</div>
</template>

<script>
import NavigationBar from "@components/legacy/NavigationBar";
import TheFooter from "@components/legacy/TheFooter";

export default {
	components: {
		NavigationBar,
		TheFooter,
	},
	computed: {
		isMobile() {
			return this.$mq === "mobile";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.page {
	display: grid;
	grid-template-areas:
		"top"
		"content"
		"footer";
	grid-template-rows: auto 1fr auto;
	grid-template-columns: 1fr;
	max-width: 100%;
	min-height: 100vh;
}

.topbar {
	grid-area: top;
}

.footer {
	grid-area: footer;
}

.small-wrapper {
	grid-area: content;
	padding: var(--space-md);
}

.wrapper {
	grid-area: content;
	padding-right: calc(15 * var(--border-width));
	padding-left: calc(15 * var(--border-width));
	margin: var(--space-lg) auto;
}

@media (min-width: 576px) {
	.wrapper {
		width: 540px;
		max-width: 100%;
	}
}

@media (min-width: 768px) {
	.wrapper {
		width: 720px;
		max-width: 100%;
	}
}
</style>
