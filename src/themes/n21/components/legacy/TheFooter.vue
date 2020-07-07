<template>
	<footer class="footer">
		<div class="top-line">
			<span class="current-year">© {{ currentYear }} </span>
		</div>

		<div>
			<template v-for="(link, index) in links">
				<span v-if="index !== 0" :key="index"> - </span>
				<template v-if="!link.innerlinks">
						<a v-if="link.name === 'privacy'"
						   :key="link.text"
						   href="#documents-header"
						   @click="$_downloadContent_download"
						>{{ link.text }}</a>
					<base-link v-else :key="link.text" class="footer-link" v-bind="link">{{
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
import { mapState } from "vuex";
import defaultDocuments from "@utils/documents";
import downloadMixin from "@mixins/downloadPrivacyStatement";

export default {
	mixins: [downloadMixin],
	computed: {
		...mapState("auth", {
			school: "school",
		}),
		currentYear() {
			return new Date().getFullYear();
		},
		consentVersion() {
			return this.$store.state["terms-and-conditions"].consentVersion;
		},
		themeName() {
			return process.env.SC_THEME || "default";
		},
		links() {
			return [
				{
					to: "/imprint",
					text: "Impressum",
				},
				this.privacyLink(),
				{
					href: "mailto:hpi-info@hpi.de?subject=Schul_Cloud%20Anfrage",
					text: this.$t("components.legacy.footer.contact"),
				},
				{
					to: "/team",
					text: this.$t("components.legacy.footer.team"),
				},
				{
					to: "/about",
					text: this.$t("components.legacy.footer.about"),
				},
				{
					to: "/community",
					text: this.$t("components.legacy.footer.contribute"),
				},
				{
					to: "/partner",
					text: this.$t("components.legacy.footer.partner"),
				},
				{
					href: "https://github.com/schul-cloud/",
					text: "GitHub",
				},
			];
		},
	},
	methods: {
		privacyLink() {
			if (this.themeName !== "n21") {
				return {
					href: defaultDocuments.specificFiles().termsOfUseSchool,
					text: this.$t("components.legacy.footer.privacy_policy_HPI"),
					target: "_blank",
					rel: "noopener",
				};
			}
			if (this.themeName === "n21" && !this.consentVersion) {
				return {
					href: defaultDocuments.specificFiles().termsOfUseExemplary,
					text: this.$t("components.legacy.footer.privacy_policy_template"),
					target: "_blank",
					rel: "noopener",
				};
			}
			if (this.themeName === "n21" && this.consentVersion) {
				return {
					href: "#documents-header",
					text: this.$t(
							"components.legacy.footer.privacy_policy_school_specific"
					),
					target: "_blank",
					rel: "noopener",
					name: "privacy"
				};
			}
		},
	}
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
	color: var(--color-tertiary-dark);
	text-align: center;
}
.top-line {
	display: flex;
	align-items: center;
	justify-content: center;
}
.footer-link {
	color: var(--color-secondary);
	border: none;
	&:focus,
	&:hover {
		color: var(--color-secondary-dark);
		text-decoration: underline;
	}
	&:visited {
		color: var(--color-secondary);
	}
}
</style>
