<template>
	<div
		v-click-outside="removePopup"
		class="popup"
		data-testid="initials"
		@click="popup"
	>
		<div class="icon">{{ initials }}</div>
		<div class="popuptext" :class="{ visible }">
			<div class="username">
				<span> {{ firstname }} {{ lastname }} <user-role /> </span>
			</div>
			<slot />
		</div>
	</div>
</template>

<script>
import UserRole from "@components/legacy/UserRole";

export default {
	components: {
		UserRole,
	},
	props: {
		firstname: {
			type: String,
			default: "",
		},
		lastname: {
			type: String,
			default: "",
		},
		role: {
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
	width: 40px;
	height: 40px;
	padding: var(--space-xs-2);
	font-family: var(--font-accent);
	font-size: var(--text-lg);
	font-weight: var(--font-weight-bold);
	color: var(--color-white);
	cursor: pointer;
	-webkit-user-select: None;
	background-color: var(--color-tertiary-dark);
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
		width: 214px;
		padding: var(--space-xs) 0;
		margin-top: var(--space-xs-4);
		color: var(--color-tertiary-dark);
		white-space: nowrap;
		background-color: var(--color-white);
		border: 1px solid var(--color-disabled);
		border-radius: var(--radius-sm);

		&.visible {
			display: flex;
		}

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
