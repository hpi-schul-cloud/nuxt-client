<template>
	<div class="empty-state-container">
		<img
			class="empty-state-container__image"
			:src="getRandomSVG"
			alt="empty-state-img"
		/>
		<h3 class="empty-state-container__title">Oops</h3>
		<p class="empty-state-container__message"
			>We couldn't find any search result, please try entering other keywords</p
		>
	</div>
</template>

<script>
export default {
	data() {
		return {
			emptyStateSVGs: [
				"/empty-state/emptyStateSvg_lehrer1.svg",
				"/empty-state/emptyStateSvg_lehrer2.svg",
				"/empty-state/emptyStateSvg_lehrer3.svg",
				"/empty-state/emptyStateSvg_lehrer4.svg",
			],
		};
	},
	computed: {
		getRandomSVG() {
			const rand = Math.floor(Math.random() * this.emptyStateSVGs.length);
			return this.emptyStateSVGs[rand];
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
