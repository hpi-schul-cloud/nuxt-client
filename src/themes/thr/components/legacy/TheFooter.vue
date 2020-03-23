<template>
	<footer class="footer">
		<div class="top-line">
			<img
				class="hpi-logo"
				src="@assets/img/footer-logo.png"
				alt="Anbieterlogo"
			/>
			<span>© {{ currentYear }} {{ $theme.name }}</span>
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
					<span :key="link.text">{{ link.text }}: </span>
					<template v-for="(innerlink, innerindex) in link.innerlinks">
						<span v-if="innerindex !== 0" :key="`${index}-${innerindex}`">
							/
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
			<span class="heart">❤</span> in Potsdam
			| Powered by <a href="https://lokalise.com" target="_"><img src="@assets/img/lokalise_logo.svg" alt="lokalise.com"></a>
		</p>
	</footer>
</template>

<script>
import { mapState } from "vuex";
import defaultDocuments from "@utils/documents.js";

export default {
	computed: {
		...mapState("auth", {
			school: "school",
		}),
		currentYear() {
			return new Date().getFullYear();
		},
		links() {
			return [
				{
					to: "/imprint",
					text: "Impressum",
				},
				{
					innerlinks: [
						{
							to: "/datenschutz",
							text: "HPI",
						},
						{
							href: defaultDocuments.specificFiles(this.school.documentBaseDir)
								.privacyExemplary,
							text: "Muster-Schulen",
							target: "_blank",
							rel: "noopener",
						},
					],
					text: "Datenschutzerklärung",
				},
				{
					href:
						"https://s3.hidrive.strato.com/schul-cloud-hpi/thr/Willkommensordner/Datenschutz/Nutzungsordnung-HPI-Schule-Schueler.pdf",
					text: "Nutzungsordnung",
				},
				{
					href: "mailto:hpi-info@hpi.de?subject=THR%20Schul_Cloud%20Anfrage",
					text: "Kontakt",
				},
				{
					to: "/about",
					text: "Über das Projekt",
				},
				{
					to: "/partner",
					text: "Partner",
				},
				{
					href: "https://github.com/schul-cloud/",
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
	color: var(--color-tertiary-dark);
	text-align: center;
}
.top-line {
	display: flex;
	align-items: center;
	justify-content: center;

	.hpi-logo {
		display: block;
		height: var(--heading-3);
		margin: 0;
	}
}
.bottom-line {
	margin-top: var(--space-xs);

	.heart {
		color: var(--color-secondary);
	}

	img {
		height: 1em;
		vertical-align: middle;
	}
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
