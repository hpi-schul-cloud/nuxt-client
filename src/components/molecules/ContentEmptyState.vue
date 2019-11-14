<template>
	<div class="empty-state-container">
		<img
			class="empty-state-container__image"
			src="@assets/empty-state/lehrer1_lupe.svg"
		/>
		<h3 class="empty-state-container__title">Oops</h3>
		<p class="empty-state-container__message"
			>We couldn't find any search result, please try entering other keywords</p
		>
	</div>
</template>

<script>
export default {
	props: {
		img: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			emptyStateSVGs: [
				"@assets/empty-state/lehrer1_lupe.svg",
				"@assets/empty-state/lehrer1.1_lupe.svg",
				"@assets/empty-state/lehrer2_lupe.svg",
				"@assets/empty-state/lehrer2.1_lupe.svg",
			],
		};
	},
	computed: {
		getRandomSVG() {
			const rand = Math.floor(Math.random() * this.emptyStateSVGs.length);
			return require(this.emptyStateSVGs[rand]);
		},
	},
};
</script>

<style lang="scss" scoped>
.empty-state-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&__image {
		height: 50vh;
		margin-top: var(--space-md);
	}
	&__message {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--text-lg);
	}
}
</style>
