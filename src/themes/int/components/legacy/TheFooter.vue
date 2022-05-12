<template>
	<footer class="footer">
		<div class="top-line">
			<img
				class="hpi-logo"
				src="@assets/img/footer-logo.png"
				alt="Anbieterlogo"
			/>
			<span class="current-year">© {{ currentYear }} </span>
		</div>

		<div>
			<template v-for="(link, index) in links">
				<span v-if="index !== 0" :key="index"> - </span>
				<template v-if="!link.innerlinks">
					<base-link :key="link.text" class="footer-link" v-bind="link">{{
						link.text
					}}</base-link>
				</template>
				<template v-else>
					<span :key="link.text">{{ link.text }} </span>
					<template v-for="(innerlink, innerindex) in link.innerlinks">
						<span v-if="innerindex !== 0" :key="`${index}-${innerindex}`">
							-
						</span>
						<base-link
							:key="innerlink.text"
							v-bind="innerlink"
							class="footer-link"
							>{{ innerlink.text }}</base-link
						>
					</template>
				</template>
			</template>
		</div>
		<p class="bottom-line">
			Made with
			<span class="heart">❤</span> in Potsdam |
			{{ $t("components.legacy.footer.powered_by") }}
			<base-link href="https://lokalise.com" target="_blank" :no-styles="true"
				><img
					class="poweredby-logo"
					src="@assets/img/lokalise_logo.svg"
					:alt="$t('components.legacy.footer.lokalise_logo_alt')"
			/></base-link>
		</p>
	</footer>
</template>

<script>
import { authModule, filePathsModule } from "@/store";

export default {
	computed: {
		school() {
			return authModule.getSchool;
		},
		currentYear() {
			return new Date().getFullYear();
		},
		links() {
			return [
				{
					to: "/imprint",
					text: this.$t("components.legacy.footer.imprint"),
				},
				{
					href: filePathsModule.getSpecificFiles.termsOfUseSchool,
					text: this.$t("components.legacy.footer.terms"),
					target: "_blank",
					rel: "noopener",
				},
				{
					href: "/datenschutz",
					text: this.$t("components.legacy.footer.privacy_policy"),
					target: "_blank",
					rel: "noopener",
				},
				{
					href: "https://github.com/hpi-schul-cloud/",
					text: "GitHub",
				},
			];
		},
	},
};
</script>

<style lang="scss" scoped>
.footer {
	width: 100%;
	padding: 0 var(--space-md);
	margin: var(--space-lg) 0 var(--space-md);
	color: var(--color-secondary-dark);
	text-align: center;
}
.top-line {
	display: flex;
	align-items: center;
	justify-content: center;
}
.bottom-line {
	margin-top: var(--space-xs);

	.heart {
		color: var(--color-primary);
	}

	.poweredby-logo {
		height: 1em;
		vertical-align: middle;
	}
}
.footer-link {
	color: var(--color-primary);
	border: none;
	&:focus,
	&:hover {
		color: var(--color-primary-dark);
		text-decoration: underline;
	}
	&:visited {
		color: var(--color-primary);
	}
}
</style>
