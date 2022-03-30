<template>
	<footer class="footer">
		<div class="top-line">
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
				</template>
			</template>
		</div>
	</footer>
</template>

<script>
import AuthModule from "@/store/auth";
import FilePathsModule from "@/store/filePaths";
import EnvConfigModule from "@/store/env-config";

export default {
	computed: {
		school() {
			return AuthModule.getSchool;
		},
		currentYear() {
			return new Date().getFullYear();
		},
		links() {
			const links = [
				{
					to: "/imprint",
					text: "Impressum",
				},
				{
					href: FilePathsModule.getSpecificFiles.termsOfUseSchool,
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
					href: "mailto:nbc-support@netz-21.de",
					text: this.$t("components.legacy.footer.contact"),
				},
			];
			if (EnvConfigModule.getEnv.ALERT_STATUS_URL) {
				links.push({
					href: EnvConfigModule.getEnv.ALERT_STATUS_URL,
					text: this.$t("components.legacy.footer.status"),
					target: "_blank",
					rel: "noopener",
				});
			}
			return links;
		},
	},
};
</script>

<style lang="scss" scoped>
.current-year {
	margin-bottom: var(--space-xs);
	font-size: var(--text-lg);
}
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
