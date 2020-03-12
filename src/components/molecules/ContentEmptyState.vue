<template>
	<div class="empty-state-container">
		<img
			class="empty-state-container__image"
			:src="getRandomSVG"
			alt="empty-state-img"
		/>
		<h3 class="empty-state-container__title">{{
			$t("pages.content.empty_state.error.oops")
		}}</h3>
		<p class="empty-state-container__message">{{
			$t("pages.content.empty_state.error.message")
		}}</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			emptyStateSVGs: [
				require("@assets/img/empty-state/emptyStateSvg_teacher_male.svg"),
				require("@assets/img/empty-state/emptyStateSvg_teacher_male_hand_down.svg"),
				require("@assets/img/empty-state/emptyStateSvg_teacher_female_hand_raised.svg"),
				require("@assets/img/empty-state/emptyStateSvg_teacher_female.svg"),
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
