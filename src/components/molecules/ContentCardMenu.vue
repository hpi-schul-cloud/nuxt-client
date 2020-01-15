<template>
	<div class="content-menu">
		<div
			v-for="action of actions"
			:key="action.text"
			class="content-menu__button"
		>
			<base-icon
				class="content-menu__button-icon"
				source="material"
				:icon="action.icon"
			/>
			<div class="content-menu__button-text">
				{{ action.text }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			actions: [
				{
					text: this.$t("components.molecules.ContentCardMenu.action.copy"),
					icon: "file_copy",
				},
				{
					text: this.$t("components.molecules.ContentCardMenu.action.share"),
					icon: "share",
				},
				{
					text: this.$t("components.molecules.ContentCardMenu.action.delete"),
					icon: "delete_outline",
				},
				{
					text: this.$t("components.molecules.ContentCardMenu.action.report"),
					icon: "report",
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.content-menu {
	position: absolute;
	right: -4%;
	bottom: -10%;
	z-index: var(--layer-modal);
	display: flex;
	flex-direction: column;
	width: 90%;
	height: 13rem;
	background-color: var(--color-white);
	box-shadow: var(--shadow-m);
	:hover {
		background-color: var(--color-gray-light);
	}
	&__button {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
		cursor: pointer;
		&-icon {
			margin: var(--space-xs) !important;
			color: var(--color-tertiary-light);
		}
		&-text {
			font-size: var(--text-xs);
		}
	}
}
</style>
