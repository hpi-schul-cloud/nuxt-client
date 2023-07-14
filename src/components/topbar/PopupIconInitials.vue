<template>
	<div v-outside-click="removePopup" class="popup">
		<v-btn
			icon
			class="icon-button"
			data-testid="initials"
			role="menu"
			:title="
				$t('global.topbar.userMenu.ariaLabel', {
					userName: `${firstName} ${lastName} (${userRole})`,
				})
			"
			:aria-label="
				$t('global.topbar.userMenu.ariaLabel', {
					userName: `${firstName} ${lastName} (${userRole})`,
				})
			"
			@click="popup"
		>
			<div class="icon">{{ initials }}</div>
		</v-btn>
		<div v-if="visible" class="popuptext" data-testid="initials-popup">
			<div class="username">
				<span> {{ firstName }} {{ lastName }} ({{ userRole }})</span>
			</div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
	name: "PopupIconInitials",
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
	setup(props) {
		const visible = ref(false);

		const initials = computed(() => {
			return props.firstName.slice(0, 1) + props.lastName.slice(0, 1);
		});

		const popup = () => {
			visible.value = !visible.value;
		};

		const removePopup = () => {
			visible.value = false;
		};

		return {
			visible,
			initials,
			popup,
			removePopup,
		};
	},
});
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
	color: var(--v-white-base);
	cursor: pointer;
	-webkit-user-select: none;
	background-color: var(--v-secondary-base);
	border: none;
	border-radius: var(--radius-round);

	&:hover {
		background-color: var(--v-secondary-darken1);
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
		color: var(--v-black-base);
		white-space: nowrap;
		background-color: var(--v-white-base);
		border: 1px solid map-get($grey, lighten-2);
		border-radius: var(--radius-sm);

		.username {
			min-height: 40px;
			/* stylelint-disable sh-waqar/declaration-use-variable */
			padding: 10px 15px;
			margin-bottom: 5px;
			/* stylelint-enable */
			white-space: normal;
			border-bottom: 1px solid map-get($grey, lighten-2);
		}
	}
}
</style>
