<template>
	<footer class="footer">
		<div class="content">
			<div class="">
				<img
					class="hpi-logo"
					src="/images/footer-logo.png"
					alt="Anbieterlogo"
				/>
				<span>© {{ currentYear }} {{ $theme.name }}</span>
			</div>

			<div>
				<template v-for="(link, index) in links">
					<span v-if="index !== 0" :key="index">-</span>
					<base-link :key="link.text" v-bind="link">{{ link.text }}</base-link>
				</template>
			</div>
			<p>
				Made with
				<span>❤</span> in Potsdam
			</p>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			links: [
				{ href: "https://schul-cloud.org/impressum", text: "Impressum" },
				{
					href: "https://schul-cloud.org/impressum#data_security",
					text: "Datenschutzerklärung",
				},
				{
					href: "mailto:hpi-info@hpi.de?subject=Schul_Cloud%20Anfrage",
					text: "Kontakt",
				},
				{ href: "https://schul-cloud.org/team", text: "Team" },
				{ href: "https://schul-cloud.org/about", text: "Über das Projekt" },
				{ href: "https://schul-cloud.org/community", text: "Mitmachen" },
				{ href: "https://schul-cloud.org/partner", text: "Partner" },
				{ href: "https://github.com/schul-cloud/", text: "GitHub" },
			],
		};
	},
	computed: {
		currentYear() {
			return new Date().getFullYear();
		},
	},
};
</script>

<style lang="scss" scoped>
.footer {
	width: 100%;
	margin-top: var(--space-lg);
}
.content {
	text-align: center;
}
.hpi-logo {
	display: block;
	height: var(--text-xl);
	margin: 0 auto;
}
</style>
