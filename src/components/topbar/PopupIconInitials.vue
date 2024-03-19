<template>
	<div v-outside-click="removePopup" class="popup">
		<v-btn
			icon
			variant="text"
			density="comfortable"
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

<script setup lang="ts">
import { ref, computed } from "vue";
import { vOnClickOutside } from "@vueuse/components";

const vOutsideClick = vOnClickOutside;

const props = defineProps({
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
});

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
</script>

<style lang="scss" scoped>
@import "~vuetify/settings";

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
	color: rgba(var(--v-theme-white));
	cursor: pointer;
	-webkit-user-select: none;
	background-color: rgba(var(--v-theme-secondary));
	border: none;
	border-radius: var(--radius-round);

	&:hover {
		background-color: rgba(var(--v-theme-secondary-darken-1));
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
		white-space: nowrap;
		background-color: rgba(var(--v-theme-white));
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
