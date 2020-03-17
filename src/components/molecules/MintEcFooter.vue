<template>
	<div class="section">
		<div class="footer-container">
			<base-grid :column-width="colWidth" :style="{ justifyItems: `center` }">
				<div class="link-container">
					<h2 class="h4">
						{{ $t("components.molecules.MintEcFooter.chapters") }}
					</h2>
					<base-link
						v-for="route in chapters"
						:key="route.title"
						class="link-style"
						:to="route.to"
						:href="route.href"
						:no-styles="true"
					>
						{{ route.title }}
					</base-link>
				</div>

				<div class="social-container">
					<h2 class="h4">Social Links</h2>
					<base-link class="link-style" href="mailto:schul-cloud@mint-ec.de">
						schul-cloud@mint-ec.de
					</base-link>
					<base-link href="https://creativecommons.org/licenses/by-sa/4.0/">
						<img
							class="img-cc"
							src="@assets/img/mint-ec-ghost/by-sa.svg"
							alt="Creative Commons Lizenzvertrag"
						/>
					</base-link>
					<base-link href="https://twitter.com/mint_ec">
						<base-icon class="icon-style" source="fa" icon="fab fa-twitter" />
					</base-link>
					<base-link href="https://instagram.com/mint_ec_netzwerk">
						<base-icon class="icon-style" source="fa" icon="fab fa-instagram" />
					</base-link>
				</div>
			</base-grid>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		chapters: {
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
	padding: calc(var(--space-lg)) var(--space-lg) calc(var(--space-lg) * 2)
		var(--space-lg);
	margin-top: calc(var(--space-xl) * 3);

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		z-index: var(--layer-behind);
		width: 100%;
		height: 100%;
		content: "";
		background-color: var(--color-secondary);
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
	.link-container {
		display: flex;
		flex-direction: column;
		line-height: var(--line-height-xl);

		@include breakpoint(tablet) {
			min-height: auto;
			padding: var(--space-xl) var(--space-lg);
		}
	}

	.link-style {
		font-size: var(--text-md) !important;
		color: var(--color-white) !important;
		border-bottom: none !important;
		&:hover {
			text-decoration: underline;
		}
	}
	.social-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-xl) var(--space-lg);
		line-height: var(--line-height-xl);

		.icon-style {
			font-size: var(--heading-2) !important;
			color: var(--color-white) !important;
		}
		.img-cc {
			width: 140px;
			border-radius: var(--radius-sm);
		}
	}
}
</style>
