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
				<span>© {{ currentYear }} {{ $theme.name }}</span>
			</div>

			<div class="mt-2">
				<base-link to="/impressum" target="_blank">Impressum</base-link>
				<span>-</span>
				<base-link to="/impressum#data_security" target="_blank"
					>Datenschutzerklärung</base-link
				>
				<span>-</span>
				<base-link
					href="mailto:hpi-info@hpi.de?subject=Schul_Cloud%20Anfrage"
					target="_blank"
					>Kontakt</base-link
				>
				<span>-</span>
				<base-link to="/team" target="_blank">Team</base-link>
				<span>-</span>
				<base-link to="/about" target="_blank">Über das Projekt</base-link>
				<span>-</span>
				<base-link to="/community" target="_blank">Mitmachen</base-link>
				<span>-</span>
				<base-link to="/partner" target="_blank">Partner</base-link>
				<span>-</span>
				<base-link href="https://github.com/schul-cloud/" target="_blank"
					>GitHub</base-link
				>
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
	margin-top: 30px;
}
.content {
	text-align: center;
}
.hpi-logo {
	display: block;
	margin: 0 auto;
}
</style>
