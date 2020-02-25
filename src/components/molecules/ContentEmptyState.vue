<template>
	<div class="empty-state-container">
		<!-- <img
			class="empty-state-container__image"
			:src="getRandomSVG"
			alt="empty-state-img"
		/> -->
		<!-- eslint-disable vue/no-v-html -->
		<span class="empty-state-container__title" v-html="titleHtmlTemplate" />
		<div class="empty-state-container__sub-title">{{
			$t("pages.content.empty_state.error.subtitle")
		}}</div>
		<span class="empty-state-container__message" v-html="messageHtmlTemplate" />
		<!-- eslint-enable vue/no-v-html -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			// emptyStateSVGs: [
			// 	"/empty-state/emptyStateSvg_teacher_male.svg",
			// 	"/empty-state/emptyStateSvg_teacher_male_hand_down.svg",
			// 	"/empty-state/emptyStateSvg_teacher_female_hand_raised.svg",
			// 	"/empty-state/emptyStateSvg_teacher_female.svg",
			// ],
			messageHtmlTemplate: this.$t("pages.content.empty_state.error.message"),
			titleHtmlTemplate: this.$t("pages.content.empty_state.error.title"),
		};
	},
	// computed: {
	// 	getRandomSVG() {
	// 		const rand = Math.floor(Math.random() * this.emptyStateSVGs.length);
	// 		return this.emptyStateSVGs[rand];
	// 	},
	// },
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
	&__title {
		margin-bottom: var(--space-md);
		font-size: var(--heading-3);
		text-align: center;
	}
	&__message {
		font-size: var(--text-sm);
		text-align: center;
	}
	&__sub-title {
		font-size: var(--text-md);
		font-weight: var(--font-weight-bold);
	}
}
</style>
