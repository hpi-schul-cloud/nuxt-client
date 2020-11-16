<template>
	<div class="container">
		<mint-ec-page-header
			v-if="page.feature_image"
			:image="page.feature_image"
			:heading="page.title"
			:teaser="page.excerpt"
		/>

		<dropdown-menu-mint-ec
			v-if="downloadLinks.length > 0"
			class="mb--xl"
			:style="{ float: `right` }"
		>
			<template v-slot:header> Downloads </template>
			<menu-link
				v-for="link in downloadLinks"
				:key="link.name"
				class="item"
				:href="link.href"
				target="_blank"
			>
				{{ link.name }}
			</menu-link>
		</dropdown-menu-mint-ec>
		<base-content-container class="base-content">
			<render-html :html="`<div>${page.html}</div>`" />
		</base-content-container>
		<mint-ec-footer :chapters="chapters" />
		<legacy-footer :links="links" :contacts="contacts" />
	</div>
</template>

<script>
import DropdownMenuMintEc from "@components/organisms/DropdownMenuMintEc";
import LegacyFooter from "@components/legacy/LegacyFooter";
import MenuLink from "@components/atoms/MenuLink";
import MintEcFooter from "@components/molecules/MintEcFooter";
import MintEcPageHeader from "@components/molecules/MintEcPageHeader";
import RenderHtml from "@components/molecules/RenderHtmlMintEc";

export default {
	components: {
		DropdownMenuMintEc,
		LegacyFooter,
		MenuLink,
		MintEcFooter,
		MintEcPageHeader,
		RenderHtml,
	},
	async asyncData({ store, params, error, app: { i18n } }) {
		try {
			const page = await store.dispatch("ghost/getSinglePage", params.article);
			return { page: page };
		} catch (e) {
			error({
				statusCode: 404,
				message: i18n.t("error.404"),
			});
		}
	},
	data: function () {
		return {
			links: [
				{
					title: this.$t("pages.mint-ec.article.footer.impressum"),
					href: "/impressum",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.datenschutz"),
					href: "/datenschutz",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.datenschutzerklärung"),
					href:
						"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.nutzungsordnung"),
					href:
						"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Willkommensordner/Datenschutz/Nutzungsordnung-HPI-Schule-Schueler.pdf",
				},
				{
					title: "Team",
					href: "/team",
				},
				{
					title: "Partner",
					href: "/partner",
				},
				{
					title: "GitHub",
					href: "https://github.com/schul-cloud",
				},
			],
			contacts: [
				{
					title: this.$t("pages.mint-ec.article.footer.info-mail"),
					href: "mailto:info@hpi-schul-cloud.de",
				},
				{
					title: "Support: feedback@hpi-schul-cloud.de",
					href: "mailto:feedback@hpi-schul-cloud.de",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.anbieter"),
					href: "mailto:inhalte@hpi-schul-cloud.de",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.datenschutz-mail"),
					href: "mailto:datenschutz@hpi-schul-cloud.de",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.newsletter"),
					href:
						"https://hpi.de/open-campus/registrierung/hpi-schul-cloud-newsletter/",
				},
			],
			chapters: [
				{
					title: this.$t("pages.mint-ec.article.footer.schule-informieren"),
					href: "/mint-ec/01-schule-informieren",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.unterricht-gestalten"),
					href: "/mint-ec/02-unterricht-gestalten",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.kollegium-informieren"),
					href: "/mint-ec/03-kollegium-mitnehmen",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.engagieren"),
					href: "/mint-ec/04-im-projekt-engagieren",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.rechtlich"),
					href: "/mint-ec/05-technik-und-recht",
				},
				{
					title: this.$t("pages.mint-ec.article.footer.datasecurity"),
					href: "/mint-ec/06-datenschutz-und-urheberrecht",
				},
			],
		};
	},
	computed: {
		head() {
			return JSON.parse(this.page.codeinjection_head || "{}");
		},
		downloadLinks() {
			return this.head.downloads || [];
		},
	},

	layout: "loggedoutFullWidth",
	meta: {
		isPublic: true,
	},
	head() {
		return {
			title: this.page.title,
		};
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";
/deep/ {
	.base-content {
		padding: var(--space-sm);
		margin-top: var(--space-xs);
	}

	h2 {
		font-size: var(--heading-4);
		font-weight: var(--font-weight-normal);
		color: var(--color-secondary);
	}

	h3 {
		font-size: var(--heading-5);
		color: var(--color-secondary);
	}

	ul {
		margin-top: var(--space-md);
		line-height: var(--line-height-lg);
	}

	blockquote {
		padding-left: var(--space-md);
		border-left: 2px solid var(--color-secondary);
	}

	li {
		@extend .ml--xl;

		font-style: italic;
		color: var(--color-black);
	}

	a {
		@extend .default-link;

		&:hover {
			color: var(--color-primary-dark);
		}
	}
}
</style>
