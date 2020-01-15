<template>
	<div class="context-menu">
		<div
			v-for="action of actions"
			:key="action.text"
			class="context-menu__button"
		>
			<base-button
				design="none"
				class="context-menu__button-container"
				@click="actionTriggered(action.type)"
			>
				<base-icon
					source="material"
					:icon="action.icon"
					class="context-menu__button-icon"
				/>
				<div class="context-menu__button-text">
					{{ action.text }}
				</div>
			</base-button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		actions: {
			type: Array,
			required: true,
		},
	},
	methods: {
		actionTriggered(type) {
			this.$emit("context-btn-clicked", type);
		},
	},
};
</script>

<style lang="scss" scoped>
.context-menu {
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
		width: 100%;
		height: 100%;
		cursor: pointer;
		:focus {
			z-index: var(--layer-page);
		}
		&-container {
			display: flex !important;
			align-items: center !important;
			justify-content: flex-start !important;
			width: 100%;
		}
		&-icon {
			margin: var(--space-xs) !important;
			color: var(--color-tertiary-light);
		}
		&-text {
			font-size: var(--text-xs);
			color: var(--color-black);
		}
	}
}
</style>
