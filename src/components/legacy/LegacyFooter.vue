<template>
	<div class="section">
		<div class="footer-container">
			<base-grid :column-width="colWidth" :style="{ justifyItems: `center` }">
				<div class="link-container">
					<h2 class="h4">{{
						$t("components.organisms.LegacyFooter.contact")
					}}</h2>
					<base-link
						v-for="route in contacts"
						:key="route.title"
						class="link-style"
						:to="route.to"
						:href="route.href"
						:no-styles="true"
					>
						{{ route.title }}
					</base-link>
				</div>
				<div class="link-container">
					<h2 class="h4">Links</h2>
					<base-link
						v-for="route in links"
						:key="route.title"
						class="link-style"
						:to="route.to"
						:href="route.href"
						:no-styles="true"
					>
						{{ route.title }}
					</base-link>
				</div>
				<div class="link-container">
					<h2 class="h4">Mobile App</h2>
					<base-link href="https://testflight.apple.com/join/7i2xN7hH">
						<img
							class="img-apple-badge"
							src="https://s3.hidrive.strato.com/schul-cloud-hpi/images/google-play-badge.png"
							alt="Apple Badge"
						/>
					</base-link>
					<h2 class="h4">{{
						$t("components.organisms.LegacyFooter.job-offer")
					}}</h2>
					<p class="footer-text">
						Du möchtest gerne Mitglied in unserem HPI
						<br />Schul-Cloud Team werden? Wir suchen:
					</p>
					<base-link
						class="link-style"
						href="https://hpi.de/das-hpi/organisation/jobs/aktuelle-jobs/internettechnologien/web-developer-mwd-im-projekt-hpi-schul-cloud.html"
						>Web Developer</base-link
					>
					<base-link
						class="link-style"
						href="https://hpi.de/das-hpi/organisation/jobs/aktuelle-jobs/internettechnologien/system-engineer-dev-ops-mw.html"
						>DevOps</base-link
					>
				</div>
			</base-grid>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		links: {
			type: Array,
			reqired: true,
			default: () => {},
		},

		contacts: {
			type: Array,
			reqired: true,
			default: () => {},
		},
	},

	computed: {
		colWidth() {
			if (window.innerWidth <= 750) {
				return "20rem";
			}
			return "33rem";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.section {
	position: relative;
	padding: var(--space-xl) var(--space-lg);
	padding-top: var(--space-xl) !important;
	margin-top: var(--space-xs);
	background-color: var(--color-gray-dark);

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		z-index: var(--layer-behind);
		width: 100%;
		height: 100%;
		content: "";
		background-color: var(--color-gray-dark);
		transform: skewY(-3deg);
		transform-origin: bottom left;
	}
	.h4 {
		color: var(--color-white);
	}
	.footer-text {
		font-size: var(--text-md);
		line-height: var(--line-height-lg);
		color: var(--color-white);
	}
	.img-apple-badge {
		width: 163.5px;
		height: 70px;
	}
	.link-container {
		display: flex;
		flex-direction: column;
		line-height: var(--line-height-xl);
		.link-style {
			font-size: var(--text-md) !important;
			color: var(--color-white) !important;
			border-bottom: none !important;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
