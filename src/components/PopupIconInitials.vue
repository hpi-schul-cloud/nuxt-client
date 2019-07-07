<template>
	<div v-click-outside="removePopup" class="popup" @click="popup">
		<div class="icon">{{ initials }}</div>
		<div
			:id="`dropdown-content-${$uid}`"
			class="popuptext"
			:class="{ visible }"
		>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		firstname: {
			type: String,
			default: "",
		},
		lastname: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	computed: {
		initials() {
			return this.firstname.slice(0, 1) + this.lastname.slice(0, 1);
		},
	},
	methods: {
		popup() {
			this.visible = !this.visible;
		},
		removePopup() {
			this.visible = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2em;
	height: 2em;
	padding: var(--space-xxs);
	color: var(--color-white);
	-webkit-user-select: None;
	background-color: var(--color-black);
	border: none;
	border-radius: var(--radius-round);

	&:hover {
		background-color: var(--color-gray-dark);
	}
}

.popup {
	position: relative;
	display: inline-block;
	user-select: none;

	.popuptext {
		position: absolute;
		top: 100%;
		right: 0%;
		z-index: var(--layer-dropdown);
		display: none;
		flex-direction: column;
		padding: var(--space-xxs);
		margin-top: var(--space-xxxxs);
		white-space: nowrap;
		background-color: var(--color-white);
		border: 1px solid var(--color-gray);
		border-radius: var(--radius-sm);

		&.visible {
			display: flex;
		}
	}
}
</style>
