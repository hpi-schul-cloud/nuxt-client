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
				<BaseLink to="/impressum" target="_blank">Impressum</BaseLink>
				<span>-</span>
				<BaseLink to="/impressum#data_security" target="_blank"
					>Datenschutzerklärung</BaseLink
				>
				<span>-</span>
				<BaseLink
					href="mailto:hpi-info@hpi.de?subject=Schul_Cloud%20Anfrage"
					target="_blank"
					>Kontakt</BaseLink
				>
				<span>-</span>
				<BaseLink to="/team" target="_blank">Team</BaseLink>
				<span>-</span>
				<BaseLink to="/about" target="_blank">Über das Projekt</BaseLink>
				<span>-</span>
				<BaseLink to="/community" target="_blank">Mitmachen</BaseLink>
				<span>-</span>
				<BaseLink to="/partner" target="_blank">Partner</BaseLink>
				<span>-</span>
				<BaseLink href="https://github.com/schul-cloud/" target="_blank"
					>GitHub</BaseLink
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
}
.content {
	text-align: center;
}
.hpi-logo {
	display: block;
	margin: 0 auto;
}
</style>
