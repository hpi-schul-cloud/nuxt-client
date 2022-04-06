<template>
	<div v-outside-click="removePopup" class="popup">
		<base-button
			type="button"
			class="icon-button"
			design="text icon"
			data-testid="initials"
			role="menu"
			:aria-label="`${$t(
				'global.topbar.initials.currentUser'
			)} ${firstName} ${lastName} ${userRole}`"
			@click="popup"
		>
			<div class="icon">{{ initials }}</div>
		</base-button>
		<div v-if="visible" class="popuptext" data-testid="initials-popup">
			<div class="username">
				<span> {{ firstName }} {{ lastName }} ({{ userRole }})</span>
			</div>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		firstName: {
			type: String,
			default: "Unknown",
		},
		lastName: {
			type: String,
			default: "Unknown",
		},
		userRole: {
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
			return this.firstName.slice(0, 1) + this.lastName.slice(0, 1);
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
	width: 40px;
	min-width: 40px;
	height: 40px;
	padding: var(--space-xs-2);
	font-family: var(--font-accent);
	font-size: var(--text-lg);
	font-weight: var(--font-weight-bold);
	color: var(--color-white);
	cursor: pointer;
	-webkit-user-select: none;
	background-color: var(--color-secondary);
	border: none;
	border-radius: var(--radius-round);

	&:hover {
		background-color: var(--color-secondary-dark);
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
		z-index: var(--layer-top-menu);
		display: flex;
		flex-direction: column;
		width: 214px;
		padding: var(--space-xs) 0;
		margin-top: var(--space-xs-4);
		color: var(--color-black);
		white-space: nowrap;
		background-color: var(--color-white);
		border: 1px solid var(--color-disabled);
		border-radius: var(--radius-sm);

		.username {
			min-height: 40px;
			/* stylelint-disable sh-waqar/declaration-use-variable */
			padding: 10px 15px;
			margin-bottom: 5px;
			/* stylelint-enable */
			white-space: normal;
			border-bottom: 1px solid var(--color-disabled);
		}
	}
}
</style>
