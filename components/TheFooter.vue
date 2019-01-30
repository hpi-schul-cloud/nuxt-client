<template>
	<footer class="footer">
		<div class="content">
			<div class="is-flex align-items-center justify-content-center">
				<img
					class="hpi-logo"
					style="height: 35px"
					src="/images/footer-logo.png"
					alt="Anbieterlogo"
				/>
				<span>© {{ currentYear }} Schul-Cloud</span>
			</div>

			<div class="mt-2">
				<a href="/impressum" target="_blank">Impressum</a>
				<span>-</span>
				<a href="/impressum#data_security" target="_blank"
					>Datenschutzerklärung</a
				>
				<span>-</span>
				<a
					href="mailto:hpi-info@hpi.de?subject=Schul_Cloud%20Anfrage"
					target="_blank"
					>Kontakt</a
				>
				<span>-</span>
				<a href="/team" target="_blank">Team</a>
				<span>-</span>
				<a href="/about" target="_blank">Über das Projekt</a>
				<span>-</span>
				<a href="/community" target="_blank">Mitmachen</a>
				<span>-</span>
				<a href="/partner" target="_blank">Partner</a>
				<span>-</span>
				<a href="https://github.com/schul-cloud/" target="_blank">GitHub</a>
			</div>
			<div class="mt-2">
				<p class="made-with-love">
					Made with
					<span class="heart">❤</span> in Potsdam
				</p>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
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
}
.content {
	text-align: center;
}
.hpi-logo {
	display: block;
	margin: 0 auto;
}
</style>
