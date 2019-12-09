<template>
	<div class="container">
		<mint-ec-page-header
			v-if="page.feature_image"
			:image="page.feature_image"
			:heading="page.title"
			:teaser="page.excerpt"
		/>

		<dropdown-menu v-if="downloadLinks.length > 0" :style="{ float: `right` }">
			<template v-slot:header
				>Downloads</template
			>
			<menu-link
				v-for="link in downloadLinks"
				:key="link.name"
				class="item"
				:href="link.href"
				>{{ link.name }}</menu-link
			>
		</dropdown-menu>
		<base-content-container
			:style="{ marginTop: `var(--space-xs)`, padding: `var(--space-sm)` }"
		>
			<render-html :html="`<div>${page.html}</div>`" />
		</base-content-container>
		<mint-ec-footer :chapters="chapters" />
		<legacy-footer :links="links" :contacts="contacts" />
	</div>
</template>

<script>
import MintEcPageHeader from "@components/molecules/MintEcPageHeader";
import RenderHtml from "@components/molecules/RenderHtmlMintEc";
import MenuLink from "@components/atoms/MenuLink";
import DropdownMenu from "@components/organisms/DropdownMenu";
import LegacyFooter from "@components/legacy/LegacyFooter";
import MintEcFooter from "@components/molecules/MintEcFooter";

export default {
	components: {
		MintEcPageHeader,
		RenderHtml,
		DropdownMenu,
		MenuLink,
		LegacyFooter,
		MintEcFooter,
	},
	async asyncData({ store, params }) {
		const page = await store.dispatch("ghost/getSinglePage", params.article);
		return { page: page };
	},
	data: function() {
		return {
			color: "var(--color-primary)",

			links: [
				{
					title: "Impressum",
					href: "https://schul-cloud.org/impressum",
				},
				{
					title: "Datenschutzerklärung HPI",
					href: "https://schul-cloud.org/datenschutz",
				},
				{
					title: "Datenschutzerklärung Muster Schulen",
					href:
						"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
				},
				{
					title: "Nutzungsordnung",
					href:
						"https://schul-cloud.org/datenschutzhttps://s3.hidrive.strato.com/schul-cloud-hpi/default/Willkommensordner/Datenschutz/Nutzungsordnung-HPI-Schule-Schueler.pdf",
				},
				{
					title: "Team",
					href: "https://schul-cloud.org/team",
				},
				{
					title: "Partner",
					href: "https://schul-cloud.org/partner",
				},
				{
					title: "GitHub",
					href: "https://github.com/schul-cloud/",
				},
			],
			contacts: [
				{
					title: "Allgemein: info@schulcloud.org",
					href: "mailto:info@schulcloud.org",
				},
				{
					title: "Support: feedback@schulcloud.org",
					href: "mailto:feedback@schulcloud.org",
				},
				{
					title: "Inhalteanbieter: inhalte@schulcloud.org",
					href: "mailto:inhalte@schulcloud.org",
				},
				{
					title: "Datenschutz: datenschutz@schulcloud.org",
					href: "mailto:datenschutz@schulcloud.org",
				},
				{
					title: "Newsletter abonieren",
					href:
						"https://hpi.de/open-campus/registrierung/hpi-schul-cloud-newsletter/",
				},
			],

			chapters: [
				{
					title: "Meine Schule informieren",
					href: "/mint-ec/schule-informieren",
				},
				{
					title: "Meinen Unterricht gestalten ",
					href: "/mint-ec/unterricht-gestalten",
				},
				{
					title: "Meine Kollegium informieren",
					href: "/mint-ec/kollegium-mitnehmen",
				},
				{
					title: "Mich im Projekt engagieren",
					href: "/mint-ec/im-projekt-engagieren",
				},
				{
					title: "Technische und rechtliche Grundlagen",
					href: "/mint-ec/technik-und-recht",
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
	}

	.item {
		color: var(--color-black) !important;

		&:hover {
			color: var(--color-secondary) !important;
		}
	}
}
</style>
