<template>
	<div class="section">
		<div class="footer-container">
			<base-grid
				:column-width="windowWidth"
				:style="{ justifyItems: `center` }"
			>
				<div class="link-container hover">
					<h2 class="h3">Kapitelübersicht</h2>
					<base-link
						v-for="route in chapters"
						:key="route.title"
						:style="{
							color: `var(--color-white)`,
							borderBottom: `none`,
							fontSize: `var(--text-lg)`,
						}"
						:to="route.to"
						:href="route.href"
						:no-styles="true"
					>
						{{ route.title }}
					</base-link>
				</div>

				<div class="social-container hover">
					<h2 class="h3">Social Links</h2>
					<base-link href="http://creativecommons.org/licenses/by-sa/4.0/">
						<img
							class="cc"
							src="@assets/img/mint-ec-ghost/by-sa.svg"
							alt="Creative Commons Lizenzvertrag"
						/>
					</base-link>
					<base-link href="twitter.com/mint_ec">
						<base-icon
							source="fa"
							icon="fab fa-twitter"
							:style="{
								color: `var(--color-white)`,
								fontSize: `var(--heading-2)`,
							}"
						/>
					</base-link>
					<base-link href="twitter.com/mint_ec">
						<base-icon
							source="fa"
							icon="fab fa-instagram"
							:style="{
								color: `var(--color-white)`,
								fontSize: `var(--heading-2)`,
							}"
						/>
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
		windowWidth() {
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
}

.h3 {
	color: var(--color-white);
}

.footer-text {
	font-size: var(--text-lg);
	line-height: var(--line-height-lg);
	color: var(--color-white);
}

.link-container {
	display: flex;
	flex-direction: column;
	padding: var(--space-xl) var(--space-lg);
	line-height: var(--line-height-xl);
}

.social-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: var(--space-xl) var(--space-lg);
	line-height: var(--line-height-xl);
}

.cc {
	width: 163.5px;
	border-radius: var(--radius-sm);
}

.hover {
	> a:hover {
		text-decoration: underline;
	}
}
</style>
